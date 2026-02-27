// ================================================================
// Home.jsx — Página principal do QRCode Fácil
// Estrutura: Header → Hero → Formulário → AdSense → Features → Footer
// ================================================================

import { useState } from "react";
import QRCode from "qrcode";

// Estilos CSS específicos desta página
import "../styles/Home.css";

// Utilitários: lógica Pix e validação separadas em arquivos próprios
// Isso segue o princípio de responsabilidade única (SRP)
import { gerarPayloadPix } from "../utils/pixUtils";
import { validarInput }    from "../utils/validators";

// Páginas legais: carregadas como modais ao clicar nos links do footer
import TermosDeUso           from "./TermosDeUso";
import PoliticaDePrivacidade from "./PoliticaDePrivacidade";

// ── CONFIGURAÇÃO DAS ABAS ─────────────────────────────────────
// Array de dados: centraliza a configuração de cada aba.
// Para adicionar uma aba, basta inserir um objeto aqui.
const ABAS = [
  { id: "url",   label: "URL / Link",  icon: "🔗", placeholder: "https://seusite.com.br" },
  { id: "texto", label: "Texto",       icon: "💬", placeholder: "Digite qualquer texto..."  },
  { id: "pix",   label: "Chave Pix",   icon: "⚡", placeholder: "CPF, CNPJ, e-mail, telefone ou chave aleatória" },
];

// ── COMPONENTE HOME ───────────────────────────────────────────
export default function Home() {

  // ── ESTADOS (useState) ─────────────────────────────────────
  // Cada estado é um par [valor, função de atualização].
  // Ao atualizar um estado, o React re-renderiza o componente.

  const [abaAtiva,   setAbaAtiva]   = useState("url");   // Aba selecionada
  const [inputValor, setInputValor] = useState("");       // Campo principal
  const [pixNome,    setPixNome]    = useState("");       // Nome do recebedor (Pix)
  const [pixCidade,  setPixCidade]  = useState("");       // Cidade do recebedor (Pix)
  const [pixValor,   setPixValor]   = useState("");       // Valor em reais (Pix)
  const [qrDataUrl,  setQrDataUrl]  = useState(null);    // Data URL da imagem PNG
  const [erro,       setErro]       = useState(null);    // Mensagem de erro
  const [tamanho,    setTamanho]    = useState(256);     // Tamanho do QR em px
  const [carregando, setCarregando] = useState(false);   // Estado de loading
  const [modalAberto, setModalAberto] = useState(null);  // "termos" | "privacidade" | null

  // ── TROCA DE ABA ─────────────────────────────────────────────
  // Reseta o formulário ao mudar de aba para evitar dados cruzados
  const trocarAba = (id) => {
    setAbaAtiva(id);
    setInputValor("");
    setQrDataUrl(null);
    setErro(null);
  };

  // ── GERAÇÃO DO QR CODE ───────────────────────────────────────
  // async/await porque QRCode.toDataURL retorna uma Promise
  const gerarQR = async () => {

    // Valida o campo principal (importado de validators.js)
    const erroValidacao = validarInput(inputValor, abaAtiva);
    if (erroValidacao) { setErro(erroValidacao); return; }

    // Validação extra: nome do recebedor é obrigatório no padrão EMV
    if (abaAtiva === "pix" && !pixNome.trim()) {
      setErro("Informe o nome do recebedor Pix.");
      return;
    }

    setErro(null);
    setCarregando(true);

    try {
      // Define o conteúdo a codificar no QR
      let conteudo = inputValor.trim();

      // Para Pix: gera o payload EMV completo (importado de pixUtils.js)
      if (abaAtiva === "pix") {
        conteudo = gerarPayloadPix({
          chave:  inputValor.trim(),
          nome:   pixNome,
          cidade: pixCidade || "BRASIL",
          valor:  pixValor,
          txid:   "***",
        });
      }

      // Gera a imagem do QR como Data URL (PNG em base64)
      const dataUrl = await QRCode.toDataURL(conteudo, {
        width: tamanho,
        margin: 2,                   // Margem branca (quiet zone, obrigatória)
        color: { dark: "#000000", light: "#ffffff" },
        errorCorrectionLevel: "M",   // Tolera até 15% de dano
      });

      setQrDataUrl(dataUrl);

    } catch (e) {
      setErro("Erro ao gerar QR Code. Tente novamente.");
    }

    setCarregando(false);
  };

  // ── DOWNLOAD DO QR CODE ──────────────────────────────────────
  // Cria um link <a> invisível, define o arquivo e simula clique
  const baixarQR = () => {
    const link = document.createElement("a");
    link.href     = qrDataUrl;
    link.download = `qrcode-facil-${Date.now()}.png`;
    link.click();
  };

  // Dados da aba selecionada (para o placeholder do input)
  const abaSelecionada = ABAS.find((a) => a.id === abaAtiva);

  // ── RENDERIZAÇÃO ─────────────────────────────────────────────
  return (
    <>
      {/* ═══════════════════════════════════════════
          HEADER — sticky, efeito glassmorphism
          ═══════════════════════════════════════════ */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">QRCode <span>Fácil</span></div>
          <div className="badge-free">100% Grátis</div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════
          PAGE WRAPPER — centraliza o conteúdo
          max-width: 620px evita esticamento em 4K
          ═══════════════════════════════════════════ */}
      <div className="page-wrapper">

        {/* ── HERO ─────────────────────────────── */}
        <section className="hero">
          {/* Tag decorativa acima do título */}
          <div className="hero-tag">✦ Gerador de QR Code Gratuito ✦</div>

          {/* Título em duas linhas com estilos independentes.
              hero-linha2 usa white-space: nowrap para nunca quebrar
              a palavra "instantaneamente", e clamp() para escalar. */}
          <h1>
            <span className="hero-linha1">Gere seu QR Code</span>
            <span className="hero-linha2">instantaneamente</span>
          </h1>

          <p>
            Links, textos e chaves Pix — gere, visualize e
            baixe em PNG. Sem cadastro, sem limites.
          </p>
        </section>

        {/* ── CARD DO FORMULÁRIO ───────────────── */}
        <div className="card">

          {/* Abas: ABAS.map() renderiza um botão por aba.
              key={aba.id} é obrigatório para o React
              identificar cada item da lista de forma única. */}
          <div className="tabs">
            {ABAS.map((aba) => (
              <button
                key={aba.id}
                className={`tab ${abaAtiva === aba.id ? "active" : ""}`}
                onClick={() => trocarAba(aba.id)}
              >
                <span>{aba.icon}</span>{aba.label}
              </button>
            ))}
          </div>

          {/* Label dinâmico: muda conforme a aba ativa */}
          <label className="input-label">
            {abaAtiva === "url" ? "Endereço web"
              : abaAtiva === "texto" ? "Seu texto"
              : "Chave Pix"}
          </label>

          {/* Campo principal: textarea para texto, input para os demais */}
          <div className="input-wrap">
            {abaAtiva === "texto" ? (
              <textarea
                className={`input-field ${erro ? "error" : ""}`}
                rows={3}
                placeholder={abaSelecionada.placeholder}
                value={inputValor}
                onChange={(e) => { setInputValor(e.target.value); setErro(null); }}
              />
            ) : (
              <input
                className={`input-field ${erro ? "error" : ""}`}
                type="text"
                placeholder={abaSelecionada.placeholder}
                value={inputValor}
                onChange={(e) => { setInputValor(e.target.value); setErro(null); }}
                onKeyDown={(e) => e.key === "Enter" && gerarQR()}
              />
            )}
          </div>

          {/* Campos extras do Pix — renderiza apenas na aba Pix */}
          {abaAtiva === "pix" && (
            <>
              <label className="input-label">
                Nome do recebedor <span style={{ color: "var(--danger)" }}>*</span>
              </label>
              <div className="input-wrap">
                <input
                  className="input-field"
                  type="text"
                  placeholder="Ex: João Silva"
                  maxLength={25}
                  value={pixNome}
                  onChange={(e) => { setPixNome(e.target.value); setErro(null); }}
                />
              </div>

              {/* Grid CSS: dois campos lado a lado */}
              <div className="pix-grid">
                <div>
                  <label className="input-label">Cidade</label>
                  <input className="input-field" type="text" placeholder="Ex: São Paulo"
                    maxLength={15} value={pixCidade}
                    onChange={(e) => setPixCidade(e.target.value)} />
                </div>
                <div>
                  <label className="input-label">Valor (opcional)</label>
                  <input className="input-field" type="number" placeholder="0,00"
                    min="0" step="0.01" value={pixValor}
                    onChange={(e) => setPixValor(e.target.value)} />
                </div>
              </div>

              <div className="pix-info">
                ⚡ QR Code no padrão EMV do Banco Central — compatível com
                qualquer aplicativo bancário.
              </div>
            </>
          )}

          {/* Mensagem de erro: aparece apenas quando "erro" !== null */}
          {erro && <div className="error-msg">⚠ {erro}</div>}

          {/* Slider de tamanho */}
          <div className="size-row">
            <span className="size-label">Tamanho</span>
            <input type="range" className="size-input"
              min={128} max={512} step={64} value={tamanho}
              onChange={(e) => setTamanho(Number(e.target.value))} />
            <span className="size-value">{tamanho}px</span>
          </div>

          {/* Botão principal */}
          <button className="btn-generate" onClick={gerarQR} disabled={carregando}>
            {carregando ? "Gerando..." : "⚡ Gerar QR Code"}
          </button>

          {/* Resultado: QR gerado — aparece após a geração */}
          {qrDataUrl && (
            <div className="qr-result">
              <div className="qr-wrapper">
                <div className="qr-tag">✓ QR Code gerado com sucesso</div>
                <div className="qr-frame">
                  {/* Math.min limita a exibição a 240px (arquivo é tamanho cheio) */}
                  <img src={qrDataUrl} alt="QR Code gerado"
                    width={Math.min(tamanho, 240)} height={Math.min(tamanho, 240)}
                    style={{ display: "block" }} />
                </div>
                <button className="btn-download" onClick={baixarQR}>
                  ↓ Baixar QR Code (PNG)
                </button>
              </div>
            </div>
          )}

        </div>{/* fim .card */}

        {/* ── ANÚNCIO (AdSense) ────────────────────────────────
            MONETIZAÇÃO: substitua o conteúdo abaixo pelo código
            do Google AdSense quando o site for aprovado.
            Formato recomendado: Leaderboard 728×90 ou
            Rectangle 336×280 para mobile.

            Como implementar:
            1. Crie conta em: google.com/adsense
            2. Adicione o domínio qrcodefacil.com.br
            3. Cole o <script> do AdSense no index.html (<head>)
            4. Substitua o conteúdo abaixo pelo <ins> do AdSense */}
        <div className="ad-banner">
          {/* Espaço para Google AdSense — inserir código aqui */}
        </div>

        {/* ── FEATURES ─────────────────────────────────────────
            Array.map() transforma dados em componentes visuais.
            Para alterar um card, edite apenas o objeto no array. */}
        <div className="features">
          {[
            { icon: "🚀", titulo: "Instantâneo",  desc: "Gerado no navegador"  },
            { icon: "🔒", titulo: "100% Privado",  desc: "Zero armazenamento"  },
            { icon: "📱", titulo: "Responsivo",    desc: "Mobile & desktop"    },
          ].map((f) => (
            <div className="feature-item" key={f.titulo}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.titulo}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>

      </div>{/* fim .page-wrapper */}

      {/* ═══════════════════════════════════════════
          FOOTER — copyright e links legais
          Os links abrem modais via setModalAberto
          e.preventDefault() evita navegação padrão
          ═══════════════════════════════════════════ */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-left">
            © 2025 <span>QRCode Fácil</span> — qrcodefacil.com.br
          </div>
          <div className="footer-right">
            <a href="#privacidade"
              onClick={(e) => { e.preventDefault(); setModalAberto("privacidade"); }}>
              Política de Privacidade
            </a>
            <a href="#termos"
              onClick={(e) => { e.preventDefault(); setModalAberto("termos"); }}>
              Termos de Uso
            </a>
          </div>
        </div>
      </footer>

      {/* Modais legais: renderizados condicionalmente.
          onFechar recebe uma arrow function que fecha o modal
          setando modalAberto de volta para null. */}
      {modalAberto === "termos"      && <TermosDeUso           onFechar={() => setModalAberto(null)} />}
      {modalAberto === "privacidade" && <PoliticaDePrivacidade onFechar={() => setModalAberto(null)} />}
    </>
  );
}
