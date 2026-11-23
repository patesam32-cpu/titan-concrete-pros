"use strict";

// Deployed Titan Concrete Pros Google Apps Script web app.
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyCYcQ9CqJ4cdQ2Nd6UBjlEq-nvsf-FYeXCwQ3O9g9uU2wHx-XOCxEv3ymFb76Vz6h9Iw/exec";

window.TitanLeadForm = (() => {
  const loadedAt = Date.now();
  const trackingKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "msclkid", "fbclid"];

  function buildPayload(answers, requestedService, website) {
    const payload = new URLSearchParams({
      project: answers.project,
      timeline: answers.timeline,
      address: answers.address,
      name: answers.name,
      phone: answers.phone,
      email: answers.email,
      notes: answers.notes.trim(),
      requestedService,
      website,
      formLoadedAt: String(loadedAt),
      pageTitle: document.title,
      sourcePage: location.origin + location.pathname
    });
    const search = new URLSearchParams(location.search);
    for (const key of trackingKeys) {
      if (search.has(key)) payload.set(key, search.get(key).slice(0, 250));
    }
    return payload;
  }

  async function send(payload) {
    if (!APPS_SCRIPT_URL) return { ok: false };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 22000);
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: payload,
        credentials: "omit",
        redirect: "follow",
        signal: controller.signal
      });
      const result = await response.json();
      if (response.ok && result.ok === true && result.status === "ok") return { ok: true };
      if (response.ok && result.code === "validation" && typeof result.message === "string") {
        return { ok: false, message: result.message };
      }
      return { ok: false };
    } catch {
      return { ok: false };
    } finally {
      clearTimeout(timeout);
    }
  }

  return { buildPayload, send };
})();
