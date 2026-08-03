const API_URL = import.meta.env.VITE_API_URL || 'https://api.www.xublix.com/api';

export async function submitInquiry(data: {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
}) {
  const response = await fetch(`${API_URL.replace(/\/$/, '')}/submitInquiry`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to submit inquiry');
  }

  return result;
}
