const {test} = require('node:test');
const assert = require('node:assert/strict');
const {existsSync} = require('node:fs');
const {join} = require('node:path');
const core = require(existsSync(join(__dirname,'../dist/booking-core.js')) ? '../dist/booking-core.js' : '../booking-core.js');
test('usa a data de João Pessoa após meia-noite UTC', () => {
  assert.equal(core.today(new Date('2026-10-03T01:00:00Z')), '2026-10-02');
});
test('recusa passado e datas impossíveis; aceita horário futuro', () => {
  const now = new Date('2026-10-02T18:00:00Z');
  assert.equal(core.future('2026-10-01','16:00',now),false);
  assert.equal(core.future('2026-10-02','14:59',now),false);
  assert.equal(core.future('2026-10-02','15:00',now),false);
  assert.equal(core.future('2026-10-02','15:01',now),true);
  assert.equal(core.future('2027-02-30','14:00',now),false);
  assert.equal(core.future('2026-10-03','24:00',now),false);
  assert.equal(core.future('2026-10-03','12:60',now),false);
});
test('mensagem preserva caracteres e dados sem confirmar reserva', () => {
  const data = {name:'Exemplo & Teste',email:'teste+agenda@example.com',phone:'Contato fictício',modality:'presencial',date:'2026-10-09',time:'14:00',place:'João Pessoa · endereço a confirmar'};
  const url = new URL(core.whatsappUrl('5519984370008',data));
  assert.equal(url.origin,'https://wa.me');
  assert.equal(url.pathname,'/5519984370008');
  const message = url.searchParams.get('text');
  for (const value of ['Exemplo & Teste','teste+agenda@example.com','09/10/2026','14:00','Presencial','João Pessoa','não reserva']) assert.ok(message.includes(value),value);
});
test('impede link para número ausente ou inválido', () => {
  assert.throws(()=>core.whatsappUrl('',{}));
  assert.throws(()=>core.whatsappUrl('123',{}));
});
