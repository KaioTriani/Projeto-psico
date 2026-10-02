(() => {
  'use strict';
  const settings = window.SITE_CONFIG || {};
  const core = window.BookingCore;
  const form = document.querySelector('#booking-form');
  const date = document.querySelector('#booking-date');
  const time = document.querySelector('#booking-time');
  const name = document.querySelector('#patient-name');
  const email = document.querySelector('#patient-email');
  const phone = document.querySelector('#patient-phone');
  const place = document.querySelector('#booking-place');
  const review = document.querySelector('#booking-review');
  const submit = document.querySelector('#whatsapp-submit');
  const status = document.querySelector('#form-status');
  let pending = null;
  date.min = core.today();
  function updatePlace() {
    const online = form.elements.modality.value === 'online';
    place.replaceChildren(new Option(online ? 'Online · videochamada' : settings.address || 'Consultório em João Pessoa · endereço a confirmar', online ? 'online' : 'consultorio'));
    document.querySelector('#place-help').textContent = online ? 'O link da videochamada será combinado com a profissional após a confirmação.' : settings.address ? 'Confirme o local com a profissional antes de se deslocar.' : 'O endereço exato será informado pela profissional. Não se desloque antes da confirmação.';
  }
  form.querySelectorAll('input[name=modality]').forEach(input => input.addEventListener('change', updatePlace));
  updatePlace();
  function validate() {
    date.min = core.today();
    name.setCustomValidity(name.value.trim().length >= 3 ? '' : 'Informe seu nome com pelo menos três caracteres.');
    const digits = phone.value.replace(/\D/g, '');
    phone.setCustomValidity(/^\+?[\d\s().-]+$/.test(phone.value.trim()) && /^\d{10,15}$/.test(digits) && !/^(\d)\1+$/.test(digits) ? '' : 'Informe um telefone válido com DDD ou código do país (10 a 15 dígitos).');
    time.setCustomValidity(date.value && time.value && !core.future(date.value, time.value) ? 'Escolha uma data e um horário futuros, considerando o horário de João Pessoa (UTC−3).' : '');
  }
  form.addEventListener('input', () => {name.setCustomValidity(''); phone.setCustomValidity(''); time.setCustomValidity(''); status.textContent = '';});
  function render(data, demo) {
    pending = demo ? null : data;
    review.classList.toggle('booking-review-demo', demo);
    document.querySelector('#review-eyebrow').textContent = demo ? 'DEMONSTRAÇÃO · DADOS FICTÍCIOS' : 'SOLICITAÇÃO DE ATENDIMENTO';
    document.querySelector('#review-title').textContent = demo ? 'Um exemplo do primeiro passo.' : 'Confira os detalhes.';
    document.querySelector('#review-notice').textContent = demo ? 'Este exemplo mostra a revisão de uma solicitação e um modelo de confirmação por e-mail. Não corresponde a uma vaga disponível e não envia mensagens.' : 'Ao continuar, seus dados serão compartilhados com o WhatsApp. Revise-os e envie a mensagem no aplicativo. A profissional ainda precisa confirmar o atendimento.';
    const entries = [['Nome',data.name],['E-mail',data.email],['WhatsApp',data.phone],['Modalidade',data.modality === 'online' ? 'Online' : 'Presencial'],['Dia',core.displayDate(data.date)],['Horário',`${data.time} · João Pessoa / Brasília (UTC−3)`],['Local',data.place]];
    const summary = document.querySelector('#booking-summary');
    summary.replaceChildren();
    entries.forEach(([label,value]) => {const dt = document.createElement('dt');const dd = document.createElement('dd');dt.textContent=label;dd.textContent=value;summary.append(dt,dd);});
    submit.hidden = demo;
    submit.removeAttribute('href');
    if (!demo) submit.href = core.whatsappUrl(settings.whatsapp, data);
    document.querySelector('#whatsapp-disclaimer').hidden = demo;
    document.querySelector('#demo-email').hidden = !demo;
    document.querySelector('#review-edit').textContent = demo ? 'Fechar demonstração' : 'Voltar e editar';
    if (demo) document.querySelector('#demo-email-content').textContent = `DEMONSTRAÇÃO — NÃO ENVIADO\nPara: ${data.email}\nAssunto: Exemplo de confirmação de atendimento\n\nOlá, ${data.name}!\n\nEste é um modelo de e-mail que poderia ser enviado após a confirmação da profissional.\n\nData ilustrativa: ${core.displayDate(data.date)}\nHorário ilustrativo: ${data.time} (UTC−3)\nModalidade: presencial\nLocal ilustrativo: consultório em João Pessoa; endereço a definir.\n\nAs orientações e o endereço completo devem ser confirmados pela profissional antes do atendimento. Se precisar alterar sua solicitação, entre em contato pelo WhatsApp.\n\nStefane Cristina de Menezes\nPsicóloga Clínica · CRP 06/198216\n\nEste exemplo não confirma uma sessão real.`;
    review.showModal();
  }
  form.addEventListener('submit', event => {
    event.preventDefault(); validate(); if (!form.reportValidity()) return;
    try {render({name:name.value.trim(),email:email.value.trim(),phone:phone.value.trim(),modality:form.elements.modality.value,date:date.value,time:time.value,place:place.options[place.selectedIndex].text},false);}
    catch {status.textContent = 'Não foi possível preparar a solicitação. Use o contato direto pelo WhatsApp abaixo.';}
  });
  submit.addEventListener('click', event => {
    if (!pending || !core.future(pending.date, pending.time)) {event.preventDefault();review.close();status.textContent='O horário escolhido já passou. Escolha uma nova data e horário.';time.focus();return;}
    document.querySelector('#whatsapp-disclaimer').textContent = 'Continue no WhatsApp e toque em enviar. Este site não recebe confirmação de envio ou de reserva. Se o aplicativo não abrir, use este mesmo botão novamente.';
  });
  review.addEventListener('close', () => {pending = null;submit.removeAttribute('href');document.querySelector('#booking-summary').replaceChildren();});
  document.querySelector('#review-edit').addEventListener('click', () => review.close());
  document.querySelector('#booking-demo').addEventListener('click', () => {
    const nextWeek = new Date(Date.now() + 7 * 86400000);
    render({name:'Pessoa de demonstração',email:'demonstracao@example.com',phone:'Não utilizado nesta demonstração',modality:'presencial',date:core.today(nextWeek),time:'14:00',place:'Consultório em João Pessoa · local ilustrativo, endereço a definir'},true);
  });
})();
