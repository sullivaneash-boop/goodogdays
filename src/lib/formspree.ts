export const formspreeEndpoint = "https://formspree.io/f/xbgjqyyz";

type FormspreeValue = string | number | boolean | readonly string[] | undefined;

export class FormspreeSubmissionError extends Error {
  constructor(message = "We couldn’t send that just yet. Please try again.") {
    super(message);
    this.name = "FormspreeSubmissionError";
  }
}

export async function submitToFormspree(
  values: Record<string, FormspreeValue>,
  signal?: AbortSignal,
) {
  const response = await fetch(formspreeEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    signal,
  });

  if (!response.ok) {
    throw new FormspreeSubmissionError();
  }

  return response;
}
