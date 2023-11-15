import '../CadastroUsuario/cadastroUsuario.style.css'
import { useAuth } from '../../Components/Auth/Auth'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const CadastroUsuario = () => {
    
    const [nomeUser, setNomeUser] = useState("");
    const [email, setemail] = useState("");
    const [senha, setsenha] = useState("");

    const navigation = useNavigate();

    const {cadastrar} = useAuth()

    const cadastraUsuario = (e) => {
        e.preventDefault()
        cadastrar(nomeUser,email,senha)
        navigation("/")
    }
    return (
        <div className='container-cadastro-user'>
            <div className="wrapper">
                <form action=""
                    onSubmit={cadastraUsuario}

                >
                    <h1>Cadastro</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Nome do usuário" required
                            onChange={(e) => setNomeUser(e.target.value)}
                            value={nomeUser}
                        />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder="email" required
                            onChange={(e) => setemail(e.target.value)}
                            value={email}

                        />
                        <i className='bx bx-envelope'></i>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="senha" required
                        onChange={(e) => setsenha(e.target.value)}
                            value={senha}
                        />
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <button type="submit" className="btn" onClick={cadastraUsuario}>Cadastrar</button>

                </form>
            </div>
        </div>
    );
};


export default CadastroUsuario;