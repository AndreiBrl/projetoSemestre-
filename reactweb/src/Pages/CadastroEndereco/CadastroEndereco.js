import BtnCustom from '../../Components/Buttons/BtnCustom';
import './CadastroEndereco.css'

const CadastroEndereco = () => {
    return (
        <div className='container-cadastro-endereco'>
            <div className="wrapper-cadastro-endereco">
                <div className='header-editar'>

                    <a href='/editar'>

                        <BtnCustom
                            customStyle={{ width: "120%", backgroundColor: "rgb(52, 52, 201)", fontSize: "1rem" }}
                            label={"VOLTAR"}
                        />
                    </a>
                    <h1>Cadastro de Endereço</h1>
                </div>
                <form action="">
                    <div className='sub-container-cadastro-endereco'>

                        <div className="input-box-cadastro-endereco">
                            <div className='cep'>

                                <input type="text" placeholder="CEP" required />
                            </div>
                        </div>

                    </div>
                    
                    <div className='sub-container-cadastro-endereco'>
                        <div className="input-box-cadastro-endereco">
                            <div className='rua'>


                                <input type="text" placeholder="Rua" required />
                            </div>
                        </div>
                        <div className="input-box-cadastro-endereco">
                            <div className='numero'>


                                <input type="text" placeholder="Número" required />
                            </div>
                        </div>
                    </div>
                    <div className='sub-container-cadastro-endereco'>

                        <div className="input-box-cadastro-endereco">
                            <div className='bairro'>


                                <input type="text" placeholder="Bairro" required />
                            </div>
                        </div>
                        <div className="input-box-cadastro-endereco">
                            <div className='cidade'>


                                <input type="text" placeholder="Cidade" required />
                            </div>
                        </div>
                        <div className="input-box-cadastro-endereco">
                            <div className='uf'>


                                <input type="text" placeholder="UF" required />
                            </div>
                        </div>
                    </div>
                    <div className='sub-container-cadastro-endereco'>
                        <div className="input-box-cadastro-endereco">

                            <div className='referencia'>


                                <input type="text" placeholder="Referência" required />
                            </div>
                        </div>

                    </div>
                    <div className='btnCriar'>

                        <BtnCustom
                            customStyle={{ width: "50%", backgroundColor: "green", fontSize: "1.2rem", marginTop: "5%" }}
                            label={"CRIAR"}
                        />
                    </div>

                </form>
            </div>
        </div>
    );
};


export default CadastroEndereco;