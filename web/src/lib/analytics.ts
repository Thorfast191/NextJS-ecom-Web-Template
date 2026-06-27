// src/lib/analytics.ts

export function getAnalyticsSession() {
  let sessionId = localStorage.getItem("analytics_session");

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    localStorage.setItem("analytics_session", sessionId);
  }

  return sessionId;
}
