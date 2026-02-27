// ================================================================
// pixUtils.js — Geração do payload Pix no padrão EMV/BC
// Banco Central do Brasil (Resolução BCB nº 1/2020)
// Exportado e usado em: pages/Home.jsx
// ================================================================

/**
 * Formata um campo no padrão TLV (Tag-Length-Value) do EMV.
 * Cada campo é: ID (2 chars) + tamanho em 2 dígitos + valor.
 * Exemplo: emvField("59", "JOAO") → "5904JOAO"
 */
export function emvField(id, valor) {
  const tamanho = String(valor.length).padStart(2, "0");
  return `${id}${tamanho}${valor}`;
}

/**
 * Remove acentos e caracteres inválidos para o padrão EMV.
 * O padrão Pix aceita apenas: letras sem acento, números e @._-+
 *
 * normalize("NFD") separa letras de seus acentos (ex: "ã" → "a" + til).
 * O primeiro replace remove os diacríticos separados.
 * O segundo remove qualquer outro caractere não permitido.
 */
export function limparTextoEmv(texto) {
  return (texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")       // Remove acentos
    .replace(/[^a-zA-Z0-9 @._\-+]/g, "")  // Remove caracteres inválidos
    .trim();
}

/**
 * Calcula o CRC-16/CCITT-FALSE — checksum obrigatório no payload Pix.
 * Sem um CRC válido, os aplicativos bancários rejeitam o QR Code.
 *
 * Algoritmo: XOR bit a bit com o polinômio 0x1021, valor inicial 0xFFFF.
 * Retorna 4 caracteres hexadecimais em maiúsculo (ex: "A5F3").
 */
export function calcularCRC16(texto) {
  let crc = 0xffff; // Valor inicial do CRC

  for (let i = 0; i < texto.length; i++) {
    crc ^= texto.charCodeAt(i) << 8; // XOR com o byte atual deslocado 8 bits

    for (let j = 0; j < 8; j++) {
      // Se o MSB (bit mais significativo) for 1, aplica o polinômio
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }

  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
}

/**
 * Gera o payload Pix completo no padrão EMV — pronto para codificar em QR.
 *
 * @param {string} chave   - Chave Pix (CPF, CNPJ, e-mail, telefone ou aleatória)
 * @param {string} nome    - Nome do recebedor (obrigatório, máx 25 chars)
 * @param {string} cidade  - Cidade do recebedor (opcional, máx 15 chars)
 * @param {string} valor   - Valor em reais (opcional, ex: "10.50")
 * @param {string} txid    - ID da transação (opcional, padrão "***")
 */
export function gerarPayloadPix({ chave, nome, cidade, valor, txid }) {
  // Sanitiza todos os campos de texto
  const chaveLimpa  = chave.trim();
  const nomeLimpo   = limparTextoEmv(nome   || "NAO INFORMADO").slice(0, 25);
  const cidadeLimpa = limparTextoEmv(cidade || "BRASIL").slice(0, 15);
  const txidLimpo   = (txid || "***").replace(/[^a-zA-Z0-9*]/g, "").slice(0, 25) || "***";

  // Campo 26 — Merchant Account Info: agrupa o identificador do Pix e a chave
  const gui        = emvField("00", "BR.GOV.BCB.PIX"); // Identificador oficial do ecossistema Pix
  const campoChave = emvField("01", chaveLimpa);         // Chave Pix do recebedor
  const mai        = emvField("26", gui + campoChave);   // Campo 26 completo

  // Campo 54 — Valor: omitido se não informado (QR sem valor fixo)
  const campoValor = valor && parseFloat(valor) > 0
    ? emvField("54", parseFloat(valor).toFixed(2)) // Ex: "10.50"
    : "";

  // Campo 62 — Additional Data: contém o txid (identificador da transação)
  const adf = emvField("62", emvField("05", txidLimpo));

  // Monta o payload sem o CRC (o "6304" ao final é o prefixo do campo CRC)
  const payloadSemCRC =
    emvField("00", "01")        + // Versão do payload (sempre "01")
    emvField("01", "12")        + // Tipo "12" = reutilizável (sem expiração)
    mai                         + // Dados da conta Pix
    emvField("52", "0000")      + // MCC: categoria do comércio
    emvField("53", "986")       + // Moeda: "986" = BRL (Real Brasileiro)
    campoValor                  + // Valor (pode ser vazio)
    emvField("58", "BR")        + // País: BR
    emvField("59", nomeLimpo)   + // Nome do recebedor
    emvField("60", cidadeLimpa) + // Cidade do recebedor
    adf                         + // Dados adicionais
    "6304";                        // Prefixo do campo CRC

  // Calcula o CRC e retorna o payload completo
  return payloadSemCRC + calcularCRC16(payloadSemCRC);
}
