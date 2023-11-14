import BtnCustom from '../../Components/Buttons/BtnCustom';
import BtnCustomStatic from '../../Components/Buttons/BtnCustomStatic';
import '../Home/home.style.css';

const Home = () => {
    const trocadiv = true;

    return (
        <div className='container-home'>
            <div className="wrapper-home">
                <div className='header-home'>
                    <h1>Home</h1>
                    {/* Esta condição Precisa de manutenção 
                    
                    // Primeiro retorno tela admin
                        // Segundo retorno tela Usuário normal*/}
                    {
                        trocadiv ? <a href="/cadastro">

                            <BtnCustom

                                label={"CADASTRO NOVO USUÁRIO"} /> </a> : null

                    }
                    <BtnCustom

                        label={"LOGOUT"} />

                </div>
                <div className='sub-container'>
                    <div className='info-user'>
                        <h1>Bem vindo</h1>
                        <h2>Astolfo</h2>
                    </div>
                    {
                        // Primeiro retorno tela admin
                        // Segundo retorno tela Usuário normal

                        trocadiv ? <div className='container-estabelecimentos-user'>
                            <h1> Estabelecimentos</h1>
                            <div className="input-box-pesquisa">
                                <input type="text" placeholder="Pesquise um estabelecimento" required />

                            </div>

                            {/* implementar MAP */}

                            <div className='estabelecimento'>
                                <div className='nome-endereco'>
                                    <h1>Chimarrom</h1>
                                    <h2>Rua Rio Branco nº 1500</h2>
                                </div>
                                <div className='btn-editar'>
                                    <BtnCustom

                                        label={"ABRIR"} />
                                </div>

                            </div>




                        </div> : <div className='container-estabelecimentos-user'>
                            <h1> Seus estabelecimentos</h1>
                            <a href='/cadastroestabelecimento'>
                                <BtnCustomStatic
                                    label={"CRIAR NOVO ESTABELECIMENTO"}
                                    customStyle={{ width: "100%", backgroundColor: "green", marginBottom: "8%" }}
                                />
                            </a>

                            {/* implementar MAP */}

                            <div className='estabelecimento'>
                                <div className='nome-endereco'>
                                    <h1>Chimarrom</h1>
                                    <h2>Rua Rio Branco nº 1500</h2>
                                </div>
                                <div className='btn-editar'>
                                    <BtnCustom

                                        label={"EDITAR"} />
                                </div>

                            </div>




                        </div>
                    }



                </div>


            </div>
        </div>
    );
}

export default Home;