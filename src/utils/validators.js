// ================================================================
// validators.js — Funções de validação do formulário
// Exportado e usado em: pages/Home.jsx
// ================================================================

/**
 * Valida o campo de input principal conforme o tipo de aba ativa.
 *
 * @param {string} valor - Texto digitado pelo usuário
 * @param {string} tipo  - "url" | "texto" | "pix"
 * @returns {string|null} - Mensagem de erro ou null se válido
 */
export function validarInput(valor, tipo) {
  // Campo vazio: trim() remove espaços e quebras de linha
  if (!valor.trim()) {
    return "Preencha o campo antes de gerar o QR Code.";
  }

  // Para URLs: usa o construtor URL() nativo para validar
  // Se for inválida (ex: "google.com" sem protocolo), lança exceção
  if (tipo === "url") {
    try {
      new URL(valor);
    } catch {
      return "Insira uma URL válida (ex: https://exemplo.com).";
    }
  }

  return null; // Sem erros — pode prosseguir
}
