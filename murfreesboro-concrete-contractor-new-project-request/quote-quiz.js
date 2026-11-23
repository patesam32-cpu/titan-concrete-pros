(() => {
  "use strict";

  const form = document.getElementById("lead");
  const estimate = document.getElementById("estimate");
  const panel = document.getElementById("quiz-step");
  const status = document.getElementById("quiz-status");
  const progress = document.getElementById("quiz-progress");
  const back = document.getElementById("quiz-back");
  const selection = document.getElementById("quiz-selection");
  const formHandler = window.TitanLeadForm;
  if (!formHandler) {
    form.hidden = true;
    document.getElementById("quiz-unavailable").hidden = false;
    return;
  }

  const projects = [
    ["driveways", "Driveways", "road"], ["walkways", "Sidewalks / Walkways", "walk"],
    ["slabs", "Slabs / Flatwork", "slab"], ["commercial", "Commercial Concrete", "commercial"],
    ["patios", "Patios / Pools", "pool"], ["foundation", "Foundation", "foundation"],
    ["walls", "Retaining Walls", "wall"], ["other", "Other", "dots"]
  ];
  const timelines = [
    ["As Soon As Possible", "As Soon As Possible", "bolt"],
    ["Within 1 Month", "Within 1 Month", "checkCalendar"],
    ["1–3 Months", "1–3 Months", "calendar"],
    ["Just Getting Prices", "Just Getting Prices", "search"]
  ];
  const steps = [
    { key: "project", name: "Project type", question: "What do you need done?", choices: projects },
    { key: "timeline", name: "Timeline", question: "When would you like it done?", choices: timelines },
    { key: "address", name: "Project address", question: "What’s the project address?", type: "text", autocomplete: "street-address", placeholder: "Street address, city, state and ZIP", maxLength: 220 },
    { key: "name", name: "Full name", question: "What’s your full name?", type: "text", autocomplete: "name", maxLength: 100 },
    { key: "phone", name: "Phone number", question: "What’s the best phone number to reach you?", type: "tel", autocomplete: "tel", maxLength: 35 },
    { key: "email", name: "Email address", question: "What’s your email address?", type: "email", autocomplete: "email", maxLength: 254 }
  ];
  const icons = {
    road: "M5 22 9 2m10 20L15 2m-3 2v3m0 3v4m0 3v4M2 22h20",
    walk: "M3 20h18M5 15h14M7 10h10m-7-6h4M9 4 3 20m12-16 6 16",
    slab: "m2 10 10-6 10 6-10 6-10-6Zm0 0v4l10 6 10-6v-4m-10 6v4",
    commercial: "M3 21h18M4 21V4h11v17m0-13h5v13M7 8h1m3 0h1m-5 4h1m3 0h1m-5 9v-5h5v5m5-9h1m-1 4h1",
    pool: "M3 16h18v5H3zm3 0V5a2 2 0 0 1 4 0m3 11V5a2 2 0 0 1 4 0M6 9h7m-7 4h7",
    foundation: "M3 18h18v4H3zM6 18V8h12v10M4 8l8-6 8 6M10 18v-5h4v5",
    wall: "M2 9h20v12H2zM2 15h20M9 9v6m6 0v6m-9-18h12",
    dots: "M5 12h.01M12 12h.01M19 12h.01",
    bolt: "m13 2-8 12h7l-1 8 8-12h-7z",
    checkCalendar: "M3 5h18v16H3zM7 2v6m10-6v6M3 10h18m-13 5 3 3 5-5",
    calendar: "M3 5h18v16H3zM7 2v6m10-6v6M3 10h18M7 14h.01m5 0h.01m5 0h.01M7 18h.01m5 0h.01m5 0h.01",
    search: "M15.5 15.5 21 21M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
  };
  const serviceProjects = new Map([
    ["Commercial concrete", "commercial"], ["Driveway", "driveways"], ["Slab or foundation", "slabs"],
    ["Retaining wall", "walls"], ["Repair or replacement", "other"], ["Patio or sidewalk", "patios"]
  ]);
  const variantProjects = new Map([
    ["driveway", "driveways"], ["stamped", "patios"], ["slab", "slabs"], ["rv", "slabs"], ["commercial", "commercial"]
  ]);
  const hashProjects = new Map([
    ["#commercial-services", "commercial"], ["#driveways", "driveways"],
    ["#foundations", "foundation"], ["#slabs-flatwork", "slabs"]
  ]);
  const variant = document.documentElement.dataset.v || "core";
  const ads = window.MurfreesboroAds || {};
  const answers = { project: variantProjects.get(variant) || hashProjects.get(location.hash.toLowerCase()) || "", notes: "" };
  let requestedService = variant === "rv" ? "RV pad or extra parking" : "";
  let stepIndex = 0;
  let sending = false;
  let completed = false;
  let started = false;

  window.dataLayer = window.dataLayer || [];

  function node(tag, text, className) {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    if (className) el.className = className;
    return el;
  }

  function icon(name) {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    const path = document.createElementNS(ns, "path");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    path.setAttribute("d", icons[name]);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.append(path);
    return svg;
  }

  function trackStart() {
    if (started) return;
    started = true;
    window.dataLayer.push({ event: "form_start" });
  }

  function renderStep(focus = false) {
    const step = steps[stepIndex];
    const heading = node("h3", step.question, "quiz-question");
    heading.id = "quiz-question";
    heading.tabIndex = -1;
    panel.replaceChildren(heading);
    status.textContent = "";
    back.hidden = stepIndex === 0;
    const project = projects.find(([id]) => id === answers.project);
    selection.hidden = !project || stepIndex === 0;
    selection.textContent = project ? "Selected · " + (requestedService || project[1]) : "";
    progress.value = stepIndex + 1;
    document.getElementById("quiz-step-count").textContent = `Step ${stepIndex + 1} of ${steps.length} · ${step.name}`;

    if (step.choices) {
      const grid = node("div", "", step.key === "project" ? "quiz-choices quiz-projects" : "quiz-choices");
      for (const [value, label, symbol] of step.choices) {
        const button = node("button", "", "quiz-choice");
        button.type = "button";
        button.dataset.choice = value;
        button.setAttribute("aria-pressed", String(answers[step.key] === value));
        button.append(icon(symbol), node("span", label));
        button.addEventListener("click", () => {
          if (step.key === "project" && answers.project !== value) requestedService = "";
          answers[step.key] = value;
          stepIndex++;
          renderStep(true);
        });
        grid.append(button);
      }
      panel.append(grid);
    } else {
      const field = node("input");
      field.name = step.key;
      field.type = step.type;
      field.autocomplete = step.autocomplete;
      field.value = answers[step.key] || "";
      field.placeholder = step.placeholder || "";
      field.required = true;
      field.maxLength = step.maxLength;
      field.setAttribute("aria-labelledby", heading.id);
      field.addEventListener("input", () => { field.setCustomValidity(""); answers[step.key] = field.value.trim(); });
      const group = node("div", "", "fld");
      group.append(field);
      panel.append(group);

      const finalStep = stepIndex === steps.length - 1;
      if (finalStep) {
        const notesGroup = node("div", "", "fld");
        const label = node("label", "Additional notes (optional)");
        const notes = node("textarea");
        notes.id = "quiz-notes";
        notes.name = "notes";
        notes.maxLength = 1500;
        notes.placeholder = "For example, a 24 × 40 driveway or any access details";
        notes.value = answers.notes;
        notes.addEventListener("input", () => { answers.notes = notes.value; });
        label.htmlFor = notes.id;
        notesGroup.append(label, notes);
        panel.append(notesGroup);
      }

      const submit = node("button", finalStep ? "Get my free estimate" : "Next step →", "btn btn-o submit");
      submit.type = "submit";
      panel.append(submit);
    }
    if (focus) heading.focus({ preventScroll: true });
  }

  const campaign = new Map();
  const query = new URLSearchParams(location.search);
  for (const key of ["gclid", "utm_source", "utm_campaign", "utm_term"]) {
    let value = query.get(key);
    try {
      if (value) localStorage.setItem("lp_" + key, JSON.stringify({ v: value, t: Date.now() }));
      else {
        const stored = JSON.parse(localStorage.getItem("lp_" + key) || "null");
        if (stored && Date.now() - stored.t < 7776e6) value = stored.v;
      }
    } catch { /* A storage restriction must not block the quiz. */ }
    if (value) campaign.set(key, value.slice(0, 250));
  }

  function leadTier(notes, projectType) {
    const text = notes.toLowerCase().replace(/,/g, "");
    const dimensions = text.match(/(\d{1,3})\s*(?:x|by|\*|×)\s*(\d{1,4})/);
    const area = text.match(/(\d{3,6})\s*(?:sq|square|sf\b)/);
    const sqft = dimensions ? Number(dimensions[1]) * Number(dimensions[2]) : Number(area?.[1] || 0);
    if (["commercial", "slabs", "foundation"].includes(projectType) || sqft >= 1200) return "A";
    if (sqft >= 600) return "B";
    if (sqft > 0) return "C";
    return ["driveways", "patios", "walls"].includes(projectType) ? "B" : "U";
  }

  form.addEventListener("focusin", trackStart);
  back.addEventListener("click", () => {
    if (sending || stepIndex === 0) return;
    stepIndex--;
    renderStep(true);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending || completed || steps[stepIndex].choices) return;
    const step = steps[stepIndex];
    const field = form.elements[step.key];
    const value = field.value.trim();
    const phoneDigits = value.replace(/[^0-9]/g, "");
    if (!value || (step.key === "phone" && (phoneDigits.length < 10 || phoneDigits.length > 15))) {
      field.setCustomValidity(value ? "Enter a phone number with 10 to 15 digits." : "Please complete this field.");
      field.reportValidity();
      return;
    }
    answers[step.key] = value;
    if (stepIndex < steps.length - 1) {
      stepIndex++;
      renderStep(true);
      return;
    }

    const projectId = answers.project;
    const project = projects.find(([id]) => id === projectId);
    const service = requestedService || (projectId === "commercial" ? "Commercial Concrete Services" : "");
    const notes = answers.notes;
    const phone = answers.phone.replace(/[^0-9]/g, "");
    const payload = formHandler.buildPayload({
      ...answers, phone, notes, project: projectId === "commercial" ? "other" : projectId
    }, service, form.elements.website.value);
    for (const [key, value] of campaign) if (!payload.has(key)) payload.set(key, value);
    if (variantProjects.has(variant)) payload.set("sourcePage", location.origin + location.pathname + "?v=" + variant);

    const button = panel.querySelector('[type="submit"]');
    sending = button.disabled = back.disabled = field.disabled = form.elements.notes.disabled = true;
    status.textContent = "Sending your request…";
    const result = await formHandler.send(payload);
    sending = button.disabled = back.disabled = field.disabled = form.elements.notes.disabled = false;
    if (!result.ok) {
      if (result.message === "Please enter a valid phone number.") {
        stepIndex = steps.findIndex(({ key }) => key === "phone");
        renderStep(true);
      }
      status.textContent = result.message || "We couldn’t confirm delivery. Please try again or call 629-306-9560.";
      return;
    }

    completed = true;
    form.hidden = true;
    const done = document.getElementById("done");
    done.hidden = false;
    done.focus({ preventScroll: true });
    const tier = leadTier(answers.notes, projectId);
    window.dataLayer.push({ event: "lead_submit", lead_tier: tier, project_type: service || project[1] });
    window.dataLayer.push({ event: "generate_lead", project_type: project[1] });
    // Lead is confirmed saved: open the thank-you page in the same tab (keeps ?gclid/utm query).
    let redirected = false;
    const goToThankYou = () => {
      if (redirected) return;
      redirected = true;
      window.location.href = "/murfreesboro-thank-you" + location.search;
    };
    if (ads.googleAdsId && ads.leadLabel && typeof window.gtag === "function") {
      window.gtag("set", "user_data", { phone_number: phone.length === 10 ? "+1" + phone : "+" + phone });
      window.gtag("event", "conversion", { send_to: ads.googleAdsId + "/" + ads.leadLabel, value: { A: 300, B: 100, C: 15, U: 60 }[tier], currency: "USD", event_callback: goToThankYou });
      setTimeout(goToThankYou, 1000); // don't wait on Google longer than 1 second
    } else {
      goToThankYou();
    }
  });

  function showQuote() {
    estimate.scrollIntoView({ block: "start" });
    (completed ? document.getElementById("done") : panel.querySelector("h3")).focus({ preventScroll: true });
  }

  document.querySelectorAll(".js-pick").forEach((button) => button.addEventListener("click", () => {
    if (!sending && !completed) {
      const service = button.dataset.type;
      answers.project = serviceProjects.get(service) || "other";
      requestedService = service;
      stepIndex = 1;
      trackStart();
      renderStep();
    }
    showQuote();
  }));
  document.querySelectorAll(".js-to-form").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    showQuote();
  }));

  form.hidden = false;
  renderStep();
})();
