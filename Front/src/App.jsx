import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Autoajuda from './pages/Autoajuda/Autoajuda';
import Autoavaliacao from './pages/Autoavalicao/Atuavaliacao';
import Relatorios from './pages/Relatorio/Relatorios';
import Metas from './pages/Metas/Metas';
import Suporte from './pages/Suporte/Suporte';
import Principal from './pages/Principal/Principal';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import Perfil from './pages/Perfil/perfil';

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

  return (
    <div style={{ paddingTop: '3px', flex: '1' }}>
     
      {location.pathname !== '/Auth' && location.pathname !== '/Register' && <Navbar />}
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/Autoavaliacao" element={<Autoavaliacao />} />
        <Route path="/Relatorios" element={<Relatorios />} />
        <Route path="/Autoajuda" element={<Autoajuda />} />
        <Route path="/Metas" element={<Metas />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/Suporte" element={<Suporte />} />
        <Route path="/Auth" element={<Login />} />
        <Route path="/Register" element={<Registro />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;