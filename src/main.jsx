// ================================================================
// main.jsx — Ponto de entrada da aplicação React
// Este é o primeiro arquivo executado pelo Vite.
// ================================================================

import React    from "react";
import ReactDOM from "react-dom/client";
import App      from "./App";

// CSS global: reset, variáveis de cor, estilos base
// Importado aqui para ser aplicado em TODA a aplicação
import "./styles/global.css";

// createRoot é a API moderna do React 18+
// Monta o App dentro de <div id="root"> do index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode ativa avisos adicionais apenas em desenvolvimento
  // Em produção (build), não tem impacto na performance
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
