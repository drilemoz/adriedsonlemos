import { setupShell } from './src/ui.mjs';
setupShell(document);

async function copyText(value, feedback, success, failure) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Área de transferência indisponível');
    await navigator.clipboard.writeText(value);
    feedback.textContent = success;
    feedback.classList.add('is-success');
  } catch {
    feedback.textContent = failure;
    feedback.classList.remove('is-success');
  }
}

document.querySelector('#copy-pix').addEventListener('click', () => copyText(
  'drilemoz@gmail.com', document.querySelector('#pix-feedback'),
  '✓ Chave Pix copiada. Confira o destinatário no seu banco antes de confirmar.',
  'Não foi possível copiar automaticamente. Selecione a chave acima para copiar.'
));
document.querySelector('#copy-whatsapp').addEventListener('click', () => copyText(
  '37998747642', document.querySelector('#whatsapp-feedback'),
  '✓ Número copiado com DDD. Abra o WhatsApp para iniciar a conversa.',
  'Não foi possível copiar automaticamente. Selecione o número acima para copiar.'
));
