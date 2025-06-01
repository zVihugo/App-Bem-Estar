import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Autoajuda from './pages/Autoajuda/Autoajuda';
import Autoavaliacao from './pages/Autoavalicao/Autoavaliacao';
import Relatorios from './pages/Relatorio/Relatorios';
import Metas from './pages/Metas/Metas';
import Suporte from './pages/Suporte/Suporte';
import Principal from './pages/Principal/Principal';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import Perfil from './pages/Perfil/Perfil';
import ProtegerRotas from './components/ProtegerRotas/protegerRotas'; 

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
}

function Content() {
  const location = useLocation();

  const hideNavbarPaths = ['/Auth', '/Register'];

  const shouldShowNavbar = !hideNavbarPaths.some(path => location.pathname.startsWith(path));

  return (
    <div style={{ paddingTop: '3px', flex: '1' }}>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/Auth" />} />
        <Route
          path="/Inicial"
          element={
            <ProtegerRotas>
              <Principal />
            </ProtegerRotas>
          }
        />
        <Route
          path="/Autoavaliacao"
          element={
            <ProtegerRotas>
              <Autoavaliacao />
            </ProtegerRotas>
          }
        />
        <Route
          path="/Relatorios"
          element={
            <ProtegerRotas>
              <Relatorios />
            </ProtegerRotas>
          }
        />
        <Route
          path="/Autoajuda"
          element={
            <ProtegerRotas>
              <Autoajuda />
            </ProtegerRotas>
          }
        />
        <Route
          path="/Metas"
          element={
            <ProtegerRotas>
              <Metas />
            </ProtegerRotas>
          }
        />
        <Route
          path="/Suporte"
          element={
            <ProtegerRotas>
              <Suporte />
            </ProtegerRotas>
          }
        />
        <Route
          path="/Perfil"
          element={
            <ProtegerRotas>
              <Perfil />
            </ProtegerRotas>
          }
        />
        <Route path="/Auth" element={<Login />} />
        <Route path="/Register" element={<Registro />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;