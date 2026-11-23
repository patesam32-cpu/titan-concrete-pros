/* Microsoft Clarity (heatmaps + session recordings) — loaded on every page.
   Put your Clarity project ID below (clarity.microsoft.com → Settings → Overview → Project ID). */
(function (c, l, a, r, i, t, y) {
  if (!i || i === "YOUR_CLARITY_ID") return; // not configured yet: do nothing
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
  t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "zi6rxvknij");
