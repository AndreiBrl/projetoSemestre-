import './loginUsuario.style.css';
import { useAuth } from '../../Components/Auth/Auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginUsuario = () => {

    const navigation = useNavigate();
    const [nomeUser, setNomeUser] = useState("");
    const [senha, setsenha] = useState("");
    const [error, setError] = useState(null);
    const { login, userCompleto } = useAuth();

    const loga = async (e) => {
        e.preventDefault()

            await login(nomeUser, senha)
            .then(()=>{
                navigation('/home')
            }).catch((error)=>{
                setError(error)
            }).finally(()=>{
                setNomeUser('')
                setsenha('')
                setTimeout(() => {
                    setError(null);
                },2000);
            })
            
          

        /* await login(nomeUser, senha)
        .then(response=>{
            if (response) {
                navigation("/home");
               
            }else{
                console.log("Erro no login");
                navigation("/");
            }
        }) */
    }
   


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
                    {error && <div className='errorMessage'>{error.message}</div>}
                    <button type="submit" className="btn" disabled={!nomeUser || senha.length<3 }>Login</button>
                    <div className="register-link">
                        <p>Não possui uma conta? <a href="/cadastro">Registre-se</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginUsuario;
