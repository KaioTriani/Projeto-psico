'use strict';
const config = window.SITE_CONFIG || {};
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
function closeMenu() { menu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menu'); }
menuButton.addEventListener('click', () => { const open = menu.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { if(menu.classList.contains('open')) {closeMenu(); menuButton.focus();} } });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();
const contact = document.querySelector('#booking-contact');
const phone = String(config.whatsapp || '').replace(/\D/g, '');
function updateContact() {
  if (!/^\d{10,15}$/.test(phone)) return;
  const modality = document.querySelector('input[name="modality"]:checked').value;
  contact.href = `https://wa.me/${phone}?text=${encodeURIComponent(`Olá, Stefane! Gostaria de saber mais sobre a terapia ${modality} e consultar os horários para uma primeira sessão.`)}`;
  contact.textContent = 'Conversar pelo WhatsApp';
  document.querySelector('#booking-hint').textContent = 'Prefere tirar suas dúvidas primeiro?';
}
document.querySelectorAll('input[name="modality"]').forEach(input => input.addEventListener('change', updateContact));
updateContact();
function httpsUrl(value) { try { const url = new URL(value); return url.protocol === 'https:' ? url : null; } catch { return null; } }
if (config.address) document.querySelector('#address').textContent = config.address;
const mapsUrl = httpsUrl(config.mapsUrl);
if (mapsUrl) { const link = document.querySelector('#map-link'); link.href = mapsUrl.href; link.hidden = false; }
if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email || '')) { const link = document.querySelector('#email-link'); link.href = `mailto:${config.email}`; link.textContent = config.email; link.hidden = false; }
const privacy = document.querySelector('#privacy-dialog');
document.querySelector('#privacy-open').addEventListener('click', () => privacy.showModal());
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) {const rect = dialog.getBoundingClientRect(); if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();} });
});
const calendar = httpsUrl(config.calendlyUrl);
if (calendar && (calendar.hostname === 'calendly.com' || calendar.hostname.endsWith('.calendly.com'))) {
  const open = document.querySelector('#calendar-open'); open.hidden = false;
  const external = document.querySelector('#calendar-external'); external.href = calendar.href;
  open.addEventListener('click', () => {const frame = document.querySelector('#calendar-frame'); if (!frame.hasAttribute('src')) frame.src = calendar.href; document.querySelector('#calendar-dialog').showModal();});
}
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) {entry.target.classList.remove('is-pending'); observer.unobserve(entry.target);} }), {threshold: 0.08});
  document.querySelectorAll('.reveal').forEach(section => { section.classList.add('is-pending'); observer.observe(section); });
}
