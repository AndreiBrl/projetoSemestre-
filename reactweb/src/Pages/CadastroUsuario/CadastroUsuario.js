import '../CadastroUsuario/cadastroUsuario.style.css'

const CadastroUsuario = () => {
    return (
        <div className='container-cadastro-user'>
        <div className="wrapper">
            <form action="">
                <h1>Cadastro</h1>
                <div className="input-box">
                    <input type="text" placeholder="Nome do usuário" required />
                    <i className='bx bxs-user'></i>
                </div>
                <div className="input-box">
                    <input type="email" placeholder="email" required />
                    <i className='bx bx-envelope'></i>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="senha" required />
                    <i className='bx bxs-lock-alt'></i>
                </div>
                <button type="submit" className="btn">Cadastrar</button>
               
            </form>
        </div>
    </div>
    );
};


export default CadastroUsuario;