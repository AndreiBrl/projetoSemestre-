import './loginUsuario.style.css';

const LoginUsuario = () => {
    return (
        <div className='container-login-user'>
            <div className="wrapper">
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Nome do usuário" required />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="senha" required />
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
