// ================================================================
// TermosDeUso.jsx — Modal com os Termos de Uso
// Baseado na LGPD (Lei 13.709/2018) e Marco Civil da Internet
// Props: onFechar → função para fechar o modal
// ================================================================

import { useEffect } from "react";
import "../styles/LegalPage.css";

export default function TermosDeUso({ onFechar }) {

  // Bloqueia o scroll da página de fundo enquanto o modal está aberto.
  // A função de retorno (cleanup) restaura o scroll ao fechar.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []); // [] = executa apenas na montagem/desmontagem

  // Fecha ao clicar no overlay (fundo escuro), mas não no modal
  const fecharAoClicarFora = (e) => {
    if (e.target === e.currentTarget) onFechar();
  };

  return (
    <div className="legal-overlay" onClick={fecharAoClicarFora}>
      <div className="legal-modal" role="dialog" aria-modal="true" aria-labelledby="termos-titulo">

        {/* Cabeçalho sticky: fica fixo ao rolar o conteúdo do modal */}
        <div className="legal-header">
          <div className="legal-header-text">
            <div className="legal-badge">Termos de Uso • LGPD</div>
            <h2 className="legal-title" id="termos-titulo">Termos de Uso</h2>
            <p className="legal-subtitle">Última atualização: Janeiro de 2025</p>
          </div>
          <button className="legal-close" onClick={onFechar} aria-label="Fechar">✕</button>
        </div>

        <div className="legal-body">

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">01</span>Aceitação dos Termos</h3>
            <p>Ao acessar e utilizar o <strong>QRCode Fácil</strong>, disponível em <strong>qrcodefacil.com.br</strong>, você concorda com estes Termos de Uso e com nossa Política de Privacidade, em conformidade com a <strong>Lei nº 13.709/2018 (LGPD)</strong> e o <strong>Marco Civil da Internet (Lei nº 12.965/2014)</strong>.</p>
            <p>Se você não concordar com qualquer parte destes termos, interrompa o uso do Serviço imediatamente.</p>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">02</span>Descrição do Serviço</h3>
            <p>O QRCode Fácil é uma aplicação web gratuita que permite a geração de QR Codes diretamente no navegador (<em>client-side</em>), sem necessidade de cadastro, login ou envio de dados a servidores externos. O Serviço suporta:</p>
            <ul>
              <li>URLs e endereços web</li>
              <li>Textos livres e mensagens</li>
              <li>Chaves Pix no padrão EMV do Banco Central do Brasil (CPF, CNPJ, e-mail, telefone ou chave aleatória)</li>
            </ul>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">03</span>Uso Aceitável</h3>
            <p>Você concorda em utilizar o Serviço apenas para fins lícitos. É expressamente proibido:</p>
            <ul>
              <li>Gerar QR Codes com conteúdo ilegal, fraudulento ou que induza a erro</li>
              <li>Utilizar o Serviço para disseminar malware, phishing ou conteúdo malicioso</li>
              <li>Tentar comprometer a segurança ou disponibilidade da aplicação</li>
              <li>Usar meios automatizados para sobrecarregar os servidores de hospedagem</li>
              <li>Reproduzir ou revender o Serviço sem autorização expressa</li>
            </ul>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">04</span>Propriedade Intelectual</h3>
            <p>O código-fonte, design, marca e demais elementos do QRCode Fácil são protegidos por direitos autorais. O usuário mantém todos os direitos sobre o conteúdo inserido para geração dos QR Codes.</p>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">05</span>Isenção de Garantias</h3>
            <p>O Serviço é fornecido "no estado em que se encontra". O QRCode Fácil não se responsabiliza por danos decorrentes do uso, problemas de compatibilidade com leitores de QR Code, ou interrupções temporárias do Serviço.</p>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">06</span>Privacidade e LGPD</h3>
            <p>Em conformidade com a <strong>LGPD (Lei nº 13.709/2018)</strong>, adotamos o princípio da minimização de dados. Todo o processamento ocorre localmente no navegador. Nenhum dado inserido é transmitido ou armazenado em nossos servidores. Consulte nossa <strong>Política de Privacidade</strong> para mais detalhes.</p>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">07</span>Sistema Pix</h3>
            <p>A geração de QR Codes Pix segue o padrão EMV definido pelo <strong>Banco Central do Brasil</strong> (Resolução BCB nº 1/2020). O usuário é o único responsável pela veracidade dos dados inseridos. O QRCode Fácil não realiza, intermedia ou valida transações financeiras.</p>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">08</span>Alterações nos Termos</h3>
            <p>Reservamo-nos o direito de modificar estes Termos a qualquer momento. O uso continuado do Serviço após alterações constitui aceitação dos novos termos.</p>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">09</span>Lei Aplicável e Foro</h3>
            <p>Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de domicílio do usuário, nos termos do Código de Defesa do Consumidor (Lei nº 8.078/1990).</p>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">10</span>Contato</h3>
            <div className="legal-highlight">
              <p>Em caso de dúvidas sobre estes Termos, entre em contato: <a href="mailto:contato@qrcodefacil.com.br">contato@qrcodefacil.com.br</a></p>
            </div>
          </div>

        </div>

        <div className="legal-footer">
          <button className="btn-legal-close" onClick={onFechar}>Entendi e Fechar</button>
        </div>

      </div>
    </div>
  );
}
