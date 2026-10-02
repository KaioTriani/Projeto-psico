# Stefane Cristina · Psicologia Clínica

Site responsivo em HTML, CSS e JavaScript, com solicitação de agendamento pelo WhatsApp **+55 (19) 98437-0008**. Sem instalação de dependências, compilação ou backend obrigatório.

## Funcionalidades

- Apresentação, serviços, processo terapêutico, menu móvel e recursos de acessibilidade.
- Formulário com nome, e-mail, telefone, modalidade, dia, horário e local.
- Validação de campos e data/horário futuro no fuso de João Pessoa (UTC−3).
- Revisão antes de abrir os dados na mensagem do WhatsApp da profissional.
- Demonstração isolada com dados fictícios e modelo de e-mail. Não envia mensagens nem altera o formulário real.
- Contato direto pelo WhatsApp como alternativa ao formulário.

**Solicitação não é reserva.** O site não consulta vagas, bloqueia horários ou confirma sessões automaticamente. A profissional confirma horário, local e orientações pelo WhatsApp. O visitante precisa tocar em enviar dentro do aplicativo.

## Arquivos e prévia

No GitHub, index.html, CSS/JS e assets/ ficam na raiz, prontos para publicar em public_html. Na pasta de trabalho original, esses arquivos estão em dist/.

Execute `node server.mjs` na raiz e abra http://127.0.0.1:4173. O servidor reconhece a estrutura de trabalho com dist/ e a estrutura plana entregue no GitHub. Também é possível abrir index.html diretamente. Node é necessário apenas para prévia e testes; a hospedagem serve arquivos estáticos.

## Configurações públicas

Edite config.js (ou dist/config.js na pasta de trabalho):

- whatsapp: já configurado como 5519984370008.
- address: endereço confirmado do consultório. Atualiza formulário e seção presencial. Enquanto vazio, o endereço fica a confirmar.
- mapsUrl: link HTTPS da localização exata; ativa o link do mapa.
- email: e-mail profissional real; ativa o contato no rodapé.
- calendlyUrl: opcional, URL HTTPS real no Calendly. Ativa uma agenda em modal com link externo alternativo.

Nunca coloque credenciais em arquivos públicos. O e-mail do visitante é incluído na mensagem do WhatsApp, sem envio automático de e-mail.

## E-mail e agenda automática

O botão Ver demonstração de agendamento mostra uma revisão e um modelo de e-mail identificados como demonstrativos. demonstracao@example.com é fictício; nenhum e-mail é enviado.

Para envio real, configure notificações em uma agenda externa, como Calendly, ou implemente um backend com provedor de e-mail. Nesse segundo caso, serão necessários domínio/remetente verificados, credenciais no servidor, validação, proteção contra abuso e um evento de confirmação emitido pela profissional. Não envie confirmação antes de o horário ser aceito. Configurar o e-mail do rodapé não ativa automação.

Para evitar dupla reserva, uma agenda real deve controlar disponibilidade e confirmação. Este formulário coleta preferências e não representa uma agenda sincronizada.

## Publicar na Hostinger a partir do GitHub

Repositório: https://github.com/KaioTriani/Projeto-psico

1. Use a hospedagem de sites HTML/PHP, não o fluxo que exige framework Node.js.
2. No painel do site, abra Avançado → Git, conecte o GitHub e selecione KaioTriani/Projeto-psico, branch main.
3. Configure o destino como public_html (ou a raiz documental do domínio). O index.html do repositório já fica na raiz; não há build.
4. Se houver outro site no destino, faça backup e escolha um diretório de teste antes de substituí-lo.
5. Implante pelo painel. Verifique HTTPS e teste formulário, revisão, modal e links no domínio final.

Os rótulos e a disponibilidade variam conforme o plano. Referência oficial: [Como implantar um repositório Git na Hostinger](https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/).

Alternativa: extraia hostinger-public_html.zip e envie seu conteúdo diretamente para public_html. index.html deve ficar em public_html/index.html, junto de CSS, JS e assets/. Esse pacote contém apenas arquivos públicos.

O .htaccess usa regras Apache para desativar listagem de diretórios e bloquear arquivos de desenvolvimento. Em outros servidores, configure regras equivalentes. Não execute server.mjs em produção.

## Testes

Execute `node --test tests/booking.test.cjs`. Cobrem fuso horário, datas inválidas/passadas, mensagem e destino. Não há chamadas externas nem envio de dados.

## Privacidade e imagens

O site não salva o formulário em banco, cookies ou armazenamento local e não pede relatos clínicos. Os dados ficam na página até o compartilhamento pelo link do WhatsApp. O navegador e o serviço externo podem manter histórico. As fontes usam Google Fonts.

As fotos são enquadramentos CSS das capturas fornecidas. Para maior nitidez, substitua por arquivos profissionais originais autorizados. Não foram inventados endereço, preços, disponibilidade ou formação acadêmica. Confirme os dados com a profissional.
