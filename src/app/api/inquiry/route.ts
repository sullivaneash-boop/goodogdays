import { siteConfig } from "@/data/site";

const requiredFields = [
  "ownerName",
  "contact",
  "zipCode",
  "dogName",
  "service",
  "startTiming",
] as const;

function clean(value: FormDataEntryValue | null, maxLength = 1000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  const formData = await request.formData();

  if (clean(formData.get("company"))) {
    return Response.json({ ok: true });
  }

  const submission = Object.fromEntries(
    [...formData.entries()].map(([key, value]) => [key, clean(value)]),
  );

  const missing = requiredFields.filter((field) => !submission[field]);
  const zipIsValid = /^\d{5}$/.test(submission.zipCode ?? "");

  if (missing.length > 0 || !zipIsValid) {
    return Response.json(
      { error: "Please complete each required field." },
      { status: 400 },
    );
  }

  const endpoint =
    process.env.FORMSPREE_ENDPOINT ??
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  if (!endpoint) {
    console.error(`Inquiry received without a configured form endpoint for ${siteConfig.name}.`);
    return Response.json({ error: "Inquiry service is not configured." }, { status: 503 });
  }

  try {
    const contact = submission.contact ?? "";
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
      ? contact
      : undefined;
    const phone = contact.replace(/\D/g, "").length >= 10
      ? contact
      : undefined;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...submission,
        name: submission.ownerName,
        ...(email ? { email } : {}),
        ...(phone ? { phone } : {}),
        message: submission.notes || "No additional notes provided.",
        subject: `New Good Dog Days request from ${submission.ownerName}`,
      }),
    });

    if (!response.ok) {
      return Response.json({ error: "Inquiry service rejected the request." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Inquiry service is unavailable." }, { status: 502 });
  }
}
