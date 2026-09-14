export const formspreeEndpoint = "https://formspree.io/f/xbgjqyyz";

type FormspreeValue = string | number | boolean | readonly string[] | undefined;

export class FormspreeSubmissionError extends Error {
  constructor(message = "We couldn’t send that just yet. Please try again.") {
    super(message);
    this.name = "FormspreeSubmissionError";
  }
}

export async function submitToFormspree(values: Record<string, FormspreeValue>, signal?: AbortSignal) {
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  signal?.addEventListener("abort", abort, { once: true });
  const timeout = setTimeout(abort, 20_000);
  try {
    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(values),
      signal: controller.signal,
    });
    if (!response.ok) throw new FormspreeSubmissionError();
    return response;
  } catch (error) {
    if (signal?.aborted) throw error;
    // A stalled connection is retryable, not an indefinitely disabled form.
    if (controller.signal.aborted) throw new FormspreeSubmissionError();
    throw error;
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", abort);
  }
}
