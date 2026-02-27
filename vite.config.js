// ================================================================
// vite.config.js — Configuração do Vite
//
// IMPORTANTE para GitHub Pages:
// A propriedade "base" define o caminho base da aplicação.
// No GitHub Pages, o site fica em:
//   https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/
//
// Então o "base" deve ser "/NOME-DO-REPOSITORIO/"
//
// Exemplo:
//   Repositório: github.com/joao/qrcode-facil
//   base: "/qrcode-facil/"
//
// Se você usar um domínio próprio (ex: qrcodefacil.com.br)
// aponte o domínio pelo CNAME e mude base para "/"
// ================================================================

import { defineConfig } from "vite";
import react            from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // ── BASE PATH ──────────────────────────────────────────────────
  // Mude "/qrcode-facil/" para o nome do seu repositório no GitHub.
  // Se usar domínio próprio, mude para "/".
  base: "/qrcode-facil/",

  build: {
    // Pasta de saída do build (padrão do Vite é "dist")
    // O GitHub Pages vai servir os arquivos desta pasta
    outDir: "dist",

    // Gera sourcemaps apenas em desenvolvimento (false = build mais rápido)
    sourcemap: false,
  },

  server: {
    // Porta local para desenvolvimento: http://localhost:5173
    port: 5173,
    open: true, // Abre o navegador automaticamente ao rodar "npm run dev"
  },
});
