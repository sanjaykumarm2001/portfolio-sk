const API_URL = import.meta.env.VITE_FUNCTION_URL || 'https://api.xublix.com';

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
}

export async function submitInquiry(data: ContactFormData) {
  const baseUrl = API_URL.replace(/\/$/, '');
  const endpoint = `${baseUrl}/api/submitInquiry`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || 'Failed to submit inquiry');
  }

  return response.json();
}
