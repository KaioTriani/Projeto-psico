(function (root) {
  'use strict';
  const zone = 'America/Fortaleza';
  function today(now = new Date()) {
    const parts = new Intl.DateTimeFormat('en-CA', {timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit'}).formatToParts(now);
    const value = type => parts.find(part => part.type === type).value;
    return `${value('year')}-${value('month')}-${value('day')}`;
  }
  function future(date, time, now = new Date()) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return false;
    const instant = new Date(`${date}T${time}:00-03:00`);
    return Number.isFinite(instant.getTime()) && today(instant) === date && Number(time.slice(0,2)) < 24 && Number(time.slice(3)) < 60 && instant > now;
  }
  function displayDate(date) { return date.split('-').reverse().join('/'); }
  function message(data) {
    return ['Olá, Stefane! Gostaria de solicitar uma primeira sessão.', '', `Nome: ${data.name}`, `E-mail: ${data.email}`, `WhatsApp: ${data.phone}`, `Modalidade: ${data.modality === 'online' ? 'Online' : 'Presencial'}`, `Dia desejado: ${displayDate(data.date)}`, `Horário desejado: ${data.time} (João Pessoa / Brasília, UTC−3)`, `Local: ${data.place}`, '', 'Aguardo a confirmação de disponibilidade, local e orientações. Entendo que esta solicitação não reserva o horário.'].join('\n');
  }
  function whatsappUrl(phone, data) {
    const digits = String(phone).replace(/\D/g, '');
    if (!/^\d{10,15}$/.test(digits)) throw new Error('Número de contato não configurado.');
    return `https://wa.me/${digits}?text=${encodeURIComponent(message(data))}`;
  }
  const api = {today, future, displayDate, message, whatsappUrl};
  root.BookingCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(globalThis);
