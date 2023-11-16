import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/LoginUsuario/LoginUsuario'
import Home from './Pages/Home/Home';
import Cadastro from './Pages/CadastroUsuario/CadastroUsuario';
import Editar from './Pages/Editar/Editar';
import CadastroEstabelecimento from './Pages/CadastroEstabelecimento/CadastroEstabelecimento';
import CadastroEndereco from './Pages/CadastroEndereco/CadastroEndereco';
import EditarEndereco  from './Pages/EditarEndereco/EditarEndereco';
import EditarAdm  from './Pages/PagesAdm/EditarEstabelecimentoAdm/EditarEstabelecimentoAdm';
import CadastroAdmin from'./Pages/PagesAdm/CadastroAdmin/CadastroAdmin'

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
        <Route path="editar" element={<Editar />} />
        <Route path="cadastroestabelecimento" element={<CadastroEstabelecimento />} />
        <Route path="cadastroendereco" element={<CadastroEndereco />} />
        <Route path="editarendereco" element={<EditarEndereco />} />
        <Route path="editarestabelecimentoadm" element={<EditarAdm />} />
        <Route path="cadastroadmin" element={<CadastroAdmin />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
