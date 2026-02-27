// ================================================================
// App.jsx — Componente raiz da aplicação
// Renderiza a página Home. Preparado para receber React Router
// quando o projeto crescer para múltiplas páginas/rotas.
// ================================================================

import Home from "./pages/Home";

export default function App() {
  // Por enquanto: SPA de página única
  // Futuro: adicionar <Routes> do React Router aqui
  return <Home />;
}
