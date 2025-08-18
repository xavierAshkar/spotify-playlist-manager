// src/lib/api.js
export async function getJSON(url, opts = {}) {
  const res = await fetch(url, { credentials: "include", ...opts });
  if (res.status === 401) {
    window.location.href = "/auth/login";
    throw new Error("Unauthenticated");
  }
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}