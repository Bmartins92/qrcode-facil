// ================================================================
// PoliticaDePrivacidade.jsx — Modal com a Política de Privacidade
// Baseado na LGPD (Lei 13.709/2018)
// Props: onFechar → função para fechar o modal
// ================================================================

import { useEffect } from "react";
import "../styles/LegalPage.css";

export default function PoliticaDePrivacidade({ onFechar }) {

  // Bloqueia scroll da página de fundo enquanto o modal está aberto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Fecha ao clicar no overlay, não no modal
  const fecharAoClicarFora = (e) => {
    if (e.target === e.currentTarget) onFechar();
  };

  return (
    <div className="legal-overlay" onClick={fecharAoClicarFora}>
      <div className="legal-modal" role="dialog" aria-modal="true" aria-labelledby="privacidade-titulo">

        <div className="legal-header">
          <div className="legal-header-text">
            <div className="legal-badge">Privacidade • LGPD</div>
            <h2 className="legal-title" id="privacidade-titulo">Política de Privacidade</h2>
            <p className="legal-subtitle">Última atualização: Janeiro de 2025</p>
          </div>
          <button className="legal-close" onClick={onFechar} aria-label="Fechar">✕</button>
        </div>

        <div className="legal-body">

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">01</span>Compromisso com a Privacidade</h3>
            <p>O <strong>QRCode Fácil</strong> tem como princípio fundamental o respeito à privacidade dos usuários. Esta Política descreve como tratamos seus dados pessoais, em conformidade com a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD)</strong>.</p>
            <p>Nossa arquitetura foi projetada para minimizar a coleta de dados: todo o processamento de QR Codes ocorre localmente no seu navegador, sem transmissão de dados aos nossos servidores.</p>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">02</span>Controlador dos Dados (LGPD, Art. 5º, VI)</h3>
            <div className="legal-highlight">
              <p><strong>Responsável:</strong> QRCode Fácil<br /><strong>Site:</strong> qrcodefacil.com.br<br /><strong>E-mail:</strong> <a href="mailto:privacidade@qrcodefacil.com.br">privacidade@qrcodefacil.com.br</a></p>
            </div>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">03</span>Dados Coletados (LGPD, Art. 7º)</h3>
            <p><strong>Dados NÃO coletados:</strong></p>
            <ul>
              <li>Conteúdo dos campos de geração (URLs, textos, chaves Pix)</li>
              <li>Dados de cadastro (não há contas de usuário)</li>
              <li>Histórico de QR Codes gerados</li>
              <li>Dados financeiros ou bancários</li>
            </ul>
            <p><strong>Dados técnicos coletados automaticamente:</strong></p>
            <ul>
              <li>Endereço IP (anonimizado, para fins de segurança)</li>
              <li>Tipo e versão do navegador (User-Agent)</li>
              <li>Data e hora de acesso</li>
              <li>Páginas visitadas e tempo de permanência</li>
            </ul>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">04</span>Finalidade do Tratamento (LGPD, Art. 6º, I)</h3>
            <p>Os dados técnicos coletados são usados exclusivamente para:</p>
            <ul>
              <li>Garantir funcionamento, segurança e disponibilidade do Serviço</li>
              <li>Análise de tráfego e melhoria da experiência do usuário</li>
              <li>Detecção e prevenção de abusos e ataques</li>
              <li>Cumprimento de obrigações legais</li>
            </ul>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">05</span>Cookies e Publicidade</h3>
            <p>Utilizamos <strong>cookies técnicos</strong> estritamente necessários para o funcionamento do Serviço e cookies de análise (Google Analytics) para compreender o uso da plataforma.</p>
            <p>O Serviço utiliza <strong>Google AdSense</strong> para exibição de anúncios. O Google poderá usar cookies para personalizar anúncios com base em visitas anteriores. Você pode gerenciar suas preferências em <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{color: "var(--accent)"}}>adssettings.google.com</a>.</p>
            <p>Você pode desativar cookies nas configurações do seu navegador, porém isso pode afetar algumas funcionalidades.</p>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">06</span>Compartilhamento de Dados</h3>
            <p>O QRCode Fácil <strong>não vende ou comercializa</strong> dados pessoais. Dados técnicos podem ser compartilhados com:</p>
            <ul>
              <li><strong>Provedores de hospedagem</strong> (Vercel / GitHub Pages): para viabilizar o Serviço</li>
              <li><strong>Google Analytics</strong>: para análise de tráfego</li>
              <li><strong>Google AdSense</strong>: para exibição de anúncios relevantes</li>
              <li><strong>Autoridades competentes</strong>: quando exigido por lei ou ordem judicial</li>
            </ul>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">07</span>Retenção de Dados (LGPD, Art. 16)</h3>
            <p>Logs técnicos são mantidos pelo período mínimo de <strong>6 meses</strong>, conforme exigido pelo <strong>Marco Civil da Internet (Art. 15)</strong>. Após o prazo legal, os dados são eliminados de forma segura.</p>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">08</span>Seus Direitos (LGPD, Art. 18)</h3>
            <ul>
              <li><strong>Confirmação e acesso:</strong> saber se tratamos seus dados</li>
              <li><strong>Correção:</strong> solicitar atualização de dados incorretos</li>
              <li><strong>Eliminação:</strong> remover dados desnecessários</li>
              <li><strong>Portabilidade:</strong> receber seus dados em formato interoperável</li>
              <li><strong>Revogação do consentimento:</strong> a qualquer momento</li>
              <li><strong>Oposição:</strong> contestar tratamento sem consentimento</li>
            </ul>
            <p>Para exercer estes direitos, responderemos em até <strong>15 dias úteis</strong> conforme a LGPD.</p>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">09</span>Segurança dos Dados (LGPD, Art. 46)</h3>
            <ul>
              <li>Transmissão criptografada via HTTPS/TLS</li>
              <li>Processamento local no navegador (dados não transitam por nossos servidores)</li>
              <li>Sem banco de dados de usuários ou histórico de gerações</li>
            </ul>
          </div>

          <div className="legal-divider" />

          <div className="legal-section">
            <h3 className="legal-section-title"><span className="legal-section-num">10</span>Contato — Encarregado de Dados (DPO)</h3>
            <div className="legal-highlight">
              <p>📧 <a href="mailto:privacidade@qrcodefacil.com.br">privacidade@qrcodefacil.com.br</a><br />🌐 qrcodefacil.com.br</p>
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
