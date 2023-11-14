import BtnCustom from '../../Components/Buttons/BtnCustom';
import './CadastroEstabelecimento.css'

const CadastroEstabelecimento = () => {
    return (
        <div className='container-cadastro-estabelecimento'>
            <div className="wrapper-cadastro-estabelecimento">
                <div className='header-editar'>
                    <a href='/home'>

                        <BtnCustom
                            customStyle={{ width: "100%", backgroundColor: "rgb(52, 52, 201)", fontSize: "1rem" }}
                            label={"VOLTAR"}
                        />
                    </a>
                    <h1>Cadastro de Estabelecimento</h1>
                </div>
                <form action="">
                    <div className='sub-container-cadastro-estabelecimento'>

                        <div className="input-box-cadastro-estabelecimento">
                            <i class='bx bx-home'></i>
                            <input type="text" placeholder="Nome do Estabelecimento" required />
                        </div>
                        <div className="input-box-cadastro-estabelecimento">
                            <i className='bx bx-envelope'></i>
                            <input type="text" placeholder="Contato" required />
                        </div>
                    </div>
                    <div className='sub-container-cadastro-estabelecimento'>
                        <div className="input-box-cadastro-estabelecimento">
                        <i class='bx bxl-instagram'></i>
                            <input type="text" placeholder="Instagram" required />
                        </div>
                        <div className="input-box-cadastro-estabelecimento">
                        <i class='bx bx-time-five'></i>
                            <input type="text" placeholder="Funcionamento" required />
                        </div>
                    </div>
                    <div className='btnCriar'>

                        <BtnCustom
                            customStyle={{ width: "50%", backgroundColor: "green", fontSize: "1.2rem" }}
                            label={"CRIAR"}
                        />
                    </div>

                </form>
            </div>
        </div>
    );
};


export default CadastroEstabelecimento;