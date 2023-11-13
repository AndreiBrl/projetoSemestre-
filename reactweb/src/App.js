import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/LoginUsuario/LoginUsuario'
import Home from './Pages/Home/Home';
import Cadastro from './Pages/CadastroUsuario/CadastroUsuario';

import './App.css';

function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
