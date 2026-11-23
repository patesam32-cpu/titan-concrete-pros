"use strict";

const company = window.COMPANY;
const byId = (id) => document.getElementById(id);

function node(tag, text, className) {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.className = className;
  return element;
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => { element.textContent = value; });
}

function setLinks(selector, value, href) {
  document.querySelectorAll(selector).forEach((element) => {
    element.hidden = !value;
    if (!value) return;
    element.href = href;
    const label = element.querySelector("[data-contact-value]");
    if (label) label.textContent = value;
    else if (!element.textContent) element.textContent = value;
  });
}

const phoneDigits = company.phone.replace(/\D/g, "");
const phoneNumber = phoneDigits.length === 10 ? "+1" + phoneDigits : company.phone.replace(/[^\d+]/g, "");
setText("[data-company]", company.name);
setText("[data-market]", company.market);
setText("[data-market-line]", company.marketLine);
const intro = document.querySelector("[data-intro]");
const introParts = company.intro.split(/\*\*(.+?)\*\*/);
intro.replaceChildren(...introParts.map((part, index) =>
  index % 2 ? node("strong", part) : document.createTextNode(part)
));
setText("#area-title", company.areaHeading);
setText("#area-copy", company.areaCopy);
setText("#footer-location", company.footerLocation);
setLinks("[data-phone]", company.phone, "tel:" + phoneNumber);
setText("[data-email]", company.email);
document.querySelector("[data-email]").hidden = !company.email;
setText("[data-hours]", company.hours);
byId("footer-hours").hidden = !company.hours;
byId("headline").replaceChildren(document.createTextNode(company.headline + " "), node("em", company.headlineAccent));
document.title = "Concrete Contractor in " + company.market + " | " + company.name;
document.querySelector('meta[name="description"]').content =
  "Request a free concrete estimate in " + company.market + " from " + company.name + ". " +
  "Get a quote for " + company.services.map(({ title }) => title.toLowerCase()).join(", ") + ".";

const logo = document.querySelector(".brand img");
if (company.logo && logo.getAttribute("src") !== company.logo) logo.src = company.logo;

const hero = document.querySelector('[data-photo="hero"]');
if (company.photos.hero) {
  const [mobileSource, tabletSource] = hero.querySelectorAll("source");
  const heroImage = hero.querySelector("img");
  if (mobileSource.getAttribute("srcset") !== company.photos.hero.mobile) mobileSource.srcset = company.photos.hero.mobile;
  if (tabletSource.getAttribute("srcset") !== company.photos.hero.tablet) tabletSource.srcset = company.photos.hero.tablet;
  if (heroImage.getAttribute("src") !== company.photos.hero.src) heroImage.src = company.photos.hero.src;
}

const sectionPhotoSizes = "(max-width: 470px) calc(100vw - 32px), (max-width: 670px) calc(50vw - 20px), (max-width: 1268px) calc(50vw - 32px), 602px";
const servicePhotoSizes = "(max-width: 470px) calc(100vw - 32px), (max-width: 900px) calc(50vw - 32px), (max-width: 1268px) calc(33.33vw - 28px), 396px";

function fillPhoto(container, photo, sizes) {
  if (!photo.src) return;
  const image = node("img");
  const placeholder = container.firstElementChild;
  image.alt = photo.alt;
  image.loading = "lazy";
  image.decoding = "async";
  image.width = 960;
  image.height = 600;
  image.addEventListener("load", () => { placeholder.hidden = true; }, { once: true });
  image.addEventListener("error", () => {
    if (image.hasAttribute("srcset")) image.removeAttribute("srcset");
    else image.remove();
  });
  if (photo.src.endsWith(".webp")) {
    image.sizes = sizes;
    image.srcset = photo.src.replace(/\.webp$/, "-480.webp") + " 480w, " + photo.src + " 960w";
  }
  image.src = photo.src;
  container.append(image);
}

function photoBox(photo, label, sizes) {
  const container = node("div", "", "media");
  container.append(node("span", label));
  fillPhoto(container, photo, sizes);
  return container;
}

if (company.photos.crew) {
  fillPhoto(document.querySelector('[data-photo="crew"]'), company.photos.crew, "(max-width: 670px) calc(100vw - 32px), " + sectionPhotoSizes);
}

for (const service of company.services) {
  const card = node("article", "", "service-card");
  card.id = service.anchor || service.id;
  const body = node("div", "", "card-body");
  const cta = node("a", service.estimate + " ↗");
  cta.href = "#quote";
  cta.dataset.quote = service.id;
  body.append(node("h3", service.title), node("p", service.description), cta);
  card.append(photoBox(service, service.title + " photo", servicePhotoSizes), body);
  byId("service-grid").append(card);
}

for (const [name, description] of company.finishes) {
  const finish = node("div");
  finish.append(node("dt", name), node("dd", description));
  byId("finish-list").append(finish);
}
byId("finishes").hidden = company.finishes.length === 0;

// Pages with the static "recent work" photo grid don't have these containers.
if (byId("project-grid")) {
  for (const [index, project] of company.projects.entries()) {
    const figure = node("figure");
    figure.append(photoBox(project, project.caption + " photo", sectionPhotoSizes), node("figcaption", project.caption));
    byId(index < 4 ? "project-grid" : "more-project-grid").append(figure);
  }
  byId("more-projects").hidden = company.projects.length <= 4;
  byId("project-grid").hidden = company.projects.length === 0;
}

for (const stat of company.stats) {
  const item = node("div");
  item.append(node("dt", stat.value), node("dd", stat.label));
  byId("stats").append(item);
}
byId("stats").hidden = company.stats.length === 0;

for (const review of company.reviews) {
  const card = node("figure");
  const attribution = [review.author, review.location].filter(Boolean).join(" · ");
  card.append(node("blockquote", review.quote), node("figcaption", attribution));
  byId("review-grid").append(card);
}
byId("reviews").hidden = !company.reviews.length;

for (const location of company.locations) byId("locations").append(node("li", location));
for (const [question, answer] of company.faqs) {
  const details = node("details");
  details.append(node("summary", question), node("p", answer));
  byId("faq").append(details);
}

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

function icon(name) {
  const namespace = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(namespace, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS(namespace, "path");
  path.setAttribute("d", icons[name] || icons.dots);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  svg.append(path);
  return svg;
}

const steps = [
  { key: "project", name: "Project type", question: "What do you need done?", choices: company.projectTypes },
  { key: "timeline", name: "Timeline", question: "When would you like it done?", choices: [
    { label: "As Soon As Possible", icon: "bolt" },
    { label: "Within 1 Month", icon: "checkCalendar" },
    { label: "1–3 Months", icon: "calendar" },
    { label: "Just Getting Prices", icon: "search" }
  ] },
  { key: "address", name: "Project address", question: "What’s the project address?", type: "text", autocomplete: "street-address", placeholder: "Street address, city, state and ZIP", maxLength: 220 },
  { key: "name", name: "Full name", question: "What’s your full name?", type: "text", autocomplete: "name", maxLength: 100 },
  { key: "phone", name: "Phone number", question: "What’s the best phone number to reach you?", type: "tel", autocomplete: "tel", maxLength: 35 },
  { key: "email", name: "Email address", question: "What’s your email address?", type: "email", autocomplete: "email", maxLength: 254 }
];

const quote = byId("quote");
const form = byId("estimate-form");
const back = byId("back");
const panel = byId("step");
const status = byId("form-status");
const answers = {};
let stepIndex = 0;
let requestedService = "";
let submitting = false;
let completed = false;
let highlightTimer;

function renderStep(focus = false) {
  const step = steps[stepIndex];
  const title = node("h3", step.question, "step-title");
  title.id = "step-title";
  title.tabIndex = -1;
  panel.replaceChildren(title);
  status.textContent = "";
  back.hidden = stepIndex === 0;
  const selection = byId("selection");
  const project = company.projectTypes.find(({ id }) => id === answers.project);
  selection.textContent = project ? "Selected · " + (requestedService || project.label) : "";
  selection.hidden = !project || stepIndex === 0;

  if (step.choices) {
    const projectStep = step.key === "project";
    const grid = node("div", "", projectStep ? "choices project-options" : "choices");
    for (const choice of step.choices) {
      const value = choice.id || choice.label;
      const card = node("button", "", "choice");
      card.type = "button";
      card.dataset.choice = value;
      card.classList.toggle("selected", answers[step.key] === value);
      card.setAttribute("aria-pressed", String(answers[step.key] === value));
      card.append(icon(choice.icon), node("span", choice.label));
      card.addEventListener("click", () => {
        if (projectStep && answers.project !== value) requestedService = "";
        answers[step.key] = value;
        stepIndex++;
        renderStep(true);
      });
      grid.append(card);
    }
    panel.append(grid, node("p", "Tap a card to continue", "hint"));
  } else {
    const field = node("input", "", "field");
    field.name = step.key;
    field.type = step.type;
    field.autocomplete = step.autocomplete;
    field.value = answers[step.key] || "";
    field.placeholder = step.placeholder || "";
    field.maxLength = step.maxLength;
    field.required = true;
    field.setAttribute("aria-labelledby", title.id);
    field.addEventListener("input", () => {
      field.setCustomValidity("");
      answers[step.key] = field.value.trim();
    });
    const finalStep = stepIndex === steps.length - 1;
    const button = node("button", finalStep ? "Get my free estimate" : "Next step →", "button");
    button.type = "submit";
    panel.append(field);
    if (finalStep) {
      const notesLabel = node("label", "Additional notes (optional)", "notes-label");
      const notes = node("textarea", "", "field notes-field");
      notes.id = notes.name = "notes";
      notesLabel.htmlFor = notes.id;
      notes.rows = 3;
      notes.maxLength = 1500;
      notes.placeholder = "Anything we should know about your project?";
      notes.value = answers.notes || "";
      notes.addEventListener("input", () => { answers.notes = notes.value; });
      panel.append(notesLabel, notes);
    }
    panel.append(button);
    if (finalStep) {
      panel.append(node("p", "We’ll use these details to follow up about your project.", "contact-note"));
    }
  }

  byId("progress").replaceChildren(...steps.map((_, index) => node("span", "", index <= stepIndex ? "filled" : "")));
  byId("step-count").textContent = "Step " + (stepIndex + 1) + " of " + steps.length + " · " + step.name;
  if (focus) title.focus({ preventScroll: true });
}

function goToQuote(event) {
  event.preventDefault();
  const service = company.services.find(({ id }) => id === event.currentTarget.dataset.quote);
  if (service && !submitting && !completed) {
    answers.project = service.project;
    requestedService = service.title;
    stepIndex = 1;
    renderStep(true);
  } else {
    const heading = quote.querySelector(".step-title");
    if (heading) heading.focus({ preventScroll: true });
  }
  quote.scrollIntoView({ block: "start" });
  quote.classList.remove("highlight");
  void quote.offsetWidth;
  quote.classList.add("highlight");
  clearTimeout(highlightTimer);
  highlightTimer = setTimeout(() => quote.classList.remove("highlight"), 1100);
}
document.querySelectorAll("[data-quote]").forEach((link) => link.addEventListener("click", goToQuote));
back.addEventListener("click", () => {
  if (submitting) return;
  stepIndex--;
  renderStep(true);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (submitting || completed) return;
  const step = steps[stepIndex];
  if (step.choices) return;
  const field = panel.querySelector("input");
  const value = field.value.trim();
  const invalidPhone = step.key === "phone" && (
    !/^[+\d\s().-]+$/.test(value) || !/^\d{10,15}$/.test(value.replace(/\D/g, ""))
  );
  if (!value || invalidPhone) {
    field.setCustomValidity(invalidPhone ? "Enter a valid phone number with 10 to 15 digits." : "Please complete this field.");
    field.reportValidity();
    return;
  }
  answers[step.key] = value;
  if (stepIndex < steps.length - 1) {
    stepIndex++;
    renderStep(true);
    return;
  }
  const project = company.projectTypes.find(({ id }) => id === answers.project);
  const notes = panel.querySelector("#notes");
  // The original Apps Script accepts Other and prints the selected service separately.
  const isCommercial = project.id === "commercial";
  const projectCategory = isCommercial ? "other" : project.id;
  const service = requestedService || (isCommercial ? "Commercial Concrete Services" : "");
  const payload = window.TitanLeadForm.buildPayload(
    { ...answers, project: projectCategory, notes: notes.value }, service, form.elements.website.value
  );

  submitting = true;
  const button = panel.querySelector('[type="submit"]');
  button.disabled = back.disabled = field.disabled = notes.disabled = true;
  status.textContent = "Sending your request…";
  const result = await window.TitanLeadForm.send(payload);
  submitting = false;
  button.disabled = back.disabled = field.disabled = notes.disabled = false;
  if (!result.ok) {
    status.textContent = result.message || "We couldn’t confirm delivery. Please try again" +
      (company.phone ? " or call " + company.phone + "." : ".");
    return;
  }
  completed = true;
  if (company.thankYouUrl) {
    // Lead is confirmed saved: record it, then open the thank-you page in the same tab.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "generate_lead", project_type: project.label });
    window.location.href = company.thankYouUrl + location.search;
    return;
  }
  form.hidden = true;
  byId("selection").hidden = true;
  const confirmation = node("h3", "Your estimate request is in.", "step-title");
  confirmation.tabIndex = -1;
  quote.append(confirmation, node("p", "Thanks for reaching out. We’ll call or email you back the same day about your project."));
  confirmation.focus({ preventScroll: true });
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "generate_lead", project_type: project.label });
});

renderStep();

// Service cards are generated in JavaScript, so resolve their initial deep links after rendering.
window.addEventListener("load", () => {
  const target = byId(location.hash.slice(1));
  if (target?.matches(".service-card, #residential-services, #commercial-services, #locally-owned-and-operated")) {
    target.scrollIntoView({ behavior: "instant", block: "start" });
  }
}, { once: true });
