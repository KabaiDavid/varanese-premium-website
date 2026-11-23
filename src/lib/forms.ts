import { useState } from 'react';

/**
 * Netlify Forms submission. The forms are also rendered (prerendered) in static
 * HTML with data-netlify="true", which is how Netlify registers them at deploy.
 * If the site is hosted elsewhere, point FORM_ENDPOINT at any form backend
 * that accepts URL-encoded POSTs (e.g. Formspree) — no other change needed.
 */
const FORM_ENDPOINT = '/';

export type FormState = 'idle' | 'sending' | 'sent' | 'error';

export function useNetlifyForm(formName: string) {
  const [state, setState] = useState<FormState>('idle');
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setState('sending');
    const data = new FormData(form);
    data.set('form-name', formName);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('sent');
      form.reset();
    } catch {
      setState('error');
    }
  };
  return { state, onSubmit };
}
