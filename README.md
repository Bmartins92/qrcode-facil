# QRCode Fácil ⚡

Gerador de QR Code gratuito, rápido e privado — diretamente no navegador.

🔗 **Demo:** https://SEU-USUARIO.github.io/qrcode-facil/

---

## ✨ Funcionalidades

- 🔗 QR Code para URLs e links
- 💬 QR Code para textos livres
- ⚡ QR Code Pix (padrão EMV do Banco Central do Brasil)
- 📥 Download em PNG
- 📱 100% responsivo (mobile e desktop)
- 🔒 Processamento local — nenhum dado enviado ao servidor

---

## 🚀 Rodando localmente

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/qrcode-facil.git
cd qrcode-facil

# 2. Instale as dependências
npm install

# 3. Instale a biblioteca de QR Code
npm install qrcode

# 4. Rode o servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:5173

---

## 📦 Build de produção

```bash
npm run build
```

A pasta `dist/` será gerada com os arquivos otimizados para produção.

---

## 🌐 Deploy no GitHub Pages

### Passo 1 — Configure o repositório

1. Crie um repositório no GitHub com o nome `qrcode-facil`
2. No arquivo `vite.config.js`, confirme que `base` está correto:
   ```js
   base: "/qrcode-facil/",
   ```

### Passo 2 — Ative o GitHub Pages

1. Vá em **Settings** → **Pages** no seu repositório
2. Em **Source**, selecione **GitHub Actions**
3. Salve

### Passo 3 — Faça o push

```bash
git init
git add .
git commit -m "feat: projeto inicial QRCode Fácil"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/qrcode-facil.git
git push -u origin main
```

O GitHub Actions vai fazer o build e o deploy automaticamente!
Aguarde ~2 minutos e acesse: `https://SEU-USUARIO.github.io/qrcode-facil/`

### Usando domínio próprio (qrcodefacil.com.br)

1. Crie um arquivo `CNAME` na raiz do projeto com o conteúdo:
   ```
   qrcodefacil.com.br
   ```
2. Mude o `base` no `vite.config.js` para `"/"`
3. No seu registrador de domínio, configure os DNS:
   ```
   CNAME  www   SEU-USUARIO.github.io
   A      @     185.199.108.153
   A      @     185.199.109.153
   A      @     185.199.110.153
   A      @     185.199.111.153
   ```

---

## 💰 Monetização

### 1. Google AdSense (principal)

1. Crie conta em [google.com/adsense](https://google.com/adsense)
2. Adicione o domínio e aguarde aprovação (5-14 dias)
3. Adicione o script no `index.html`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
4. Em `Home.jsx`, substitua o `<div className="ad-banner">` pelo código `<ins>` gerado pelo AdSense

**Posicionamentos recomendados:**
- Abaixo do formulário (Rectangle 336×280) — maior CTR
- Rodapé (Leaderboard 728×90)

### 2. Google Analytics (métricas)

1. Crie conta em [analytics.google.com](https://analytics.google.com)
2. Adicione no `index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### 3. Afiliados (complementar)

- **Hotmart / Eduzz:** banners para cursos de finanças, marketing digital
- **Amazon Afiliados:** livros sobre QR Code, marketing, empreendedorismo

### 4. Versão Premium (futuro)

Recursos pagos planejados:
- Personalização de cores do QR Code
- Logo no centro do QR
- QR Pix com valor automático
- Histórico de gerações
- API própria

---

## 📁 Estrutura do projeto

```
qrcode-facil/
├── .github/
│   └── workflows/
│       └── deploy.yml        ← Deploy automático no GitHub Pages
│
├── src/
│   ├── pages/
│   │   ├── Home.jsx              ← Página principal
│   │   ├── TermosDeUso.jsx       ← Modal de termos (LGPD)
│   │   └── PoliticaDePrivacidade.jsx ← Modal de privacidade (LGPD)
│   │
│   ├── utils/
│   │   ├── pixUtils.js           ← Geração do payload Pix EMV
│   │   └── validators.js         ← Validação de formulário
│   │
│   ├── styles/
│   │   ├── global.css            ← Reset, variáveis, estilos base
│   │   ├── Home.css              ← Estilos da página principal
│   │   └── LegalPage.css         ← Estilos dos modais legais
│   │
│   ├── App.jsx                   ← Componente raiz
│   └── main.jsx                  ← Ponto de entrada (monta o React)
│
├── vite.config.js                ← Configuração do Vite + GitHub Pages
├── package.json
└── README.md
```

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| React 19 + Vite | Framework e bundler |
| qrcode | Geração de QR Code client-side |
| CSS puro (custom properties) | Estilização sem dependências extras |
| GitHub Actions | CI/CD e deploy automático |
| GitHub Pages | Hospedagem gratuita |

---

## 📜 Licença

MIT — use, modifique e distribua livremente.

---

Feito com ⚡ para aprendizado e rentabilidade.
