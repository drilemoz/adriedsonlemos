import { setupShell } from './src/ui.mjs';
setupShell(document);
const button = document.querySelector('#copy-pix');
const feedback = document.querySelector('#pix-feedback');
button.addEventListener('click', async () => {
  const pix = 'drilemoz@gmail.com';
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard indisponível');
    await navigator.clipboard.writeText(pix);
    feedback.textContent = 'Chave Pix copiada. Confira o destinatário no seu banco antes de confirmar.';
  } catch {
    feedback.textContent = 'Não foi possível copiar automaticamente. Selecione a chave acima para copiar.';
  }
});
