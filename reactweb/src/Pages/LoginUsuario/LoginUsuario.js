import './loginUsuario.style.css';
import { useAuth } from '../../Components/Auth/Auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginUsuario = () => {

    const navigation = useNavigate();
    const [nomeUser, setNomeUser] = useState("");
    const [senha, setsenha] = useState("");
    const { login, autenticado } = useAuth();

    const loga = async (e) => {
        e.preventDefault()

        const response = await login(nomeUser, senha)


    }
    useEffect(() => {

        if (autenticado) {
            console.log("AUTENTICADO", autenticado);
            navigation("/home");
        } else {
            console.log("Erro no login");
            navigation("/");
        }
    }, [autenticado])


    return (
        <div className='container-login-user'>
            <div className="wrapper">
                <form action="" onSubmit={loga}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Nome do usuário" required

                            onChange={(e) => setNomeUser(e.target.value)}
                            value={nomeUser}
                        />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="senha" required

                            onChange={(e) => setsenha(e.target.value)}
                            value={senha}
                        />
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <button type="submit" className="btn">Login</button>
                    <div className="register-link">
                        <p>Não possui uma conta? <a href="/cadastro">Registre-se</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginUsuario;
