// Base URL for the backend API
const BASE_URL = "https://api.yungying.com/getthawha";

// Helper function to make API requests
async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include", // important: send cookies
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

// ---------- AUTH ----------
export async function authorizeWithLine(idToken: string) {
  return apiFetch("/line/authorization", {
    method: "POST",
    body: JSON.stringify({ idToken }),
  });
}

// ---------- PROFILE ----------
export async function getProfile() {
  return apiFetch("/userinfo/me");
}

// ---------- PACKAGE ----------
export async function getPackages() {
  return apiFetch("/package");
}

// ---------- VOUCHER ----------
export async function getVoucher(code: string) {
  return apiFetch(`/voucher/${code}`);
}

// ---------- BOOKINGS ----------
export async function getBookings() {
  return apiFetch("/booking");
}

export async function createBooking(data: any) {
  return apiFetch("/booking", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateBooking(id: string, data: any) {
  return apiFetch(`/booking/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteBooking(id: string) {
  return apiFetch(`/booking/${id}`, {
    method: "DELETE",
  });
}