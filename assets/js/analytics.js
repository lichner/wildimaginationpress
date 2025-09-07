document.addEventListener('DOMContentLoaded', function() {
  var meta = document.querySelector('meta[name="ga-id"]');
  if (!meta) return;
  var gaId = meta.getAttribute('content');
  if (!gaId || typeof gtag === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  function gtagWrapper(){ dataLayer.push(arguments); }
  window.gtag = window.gtag || gtagWrapper;
  gtag('js', new Date());
  gtag('config', gaId, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });
});


