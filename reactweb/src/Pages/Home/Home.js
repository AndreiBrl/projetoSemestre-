import BtnCustom from '../../Components/Buttons/BtnCustom';
import '../Home/home.style.css';

const Home = () => {
    return (
        <div className='container-home'>
            <div className="wrapper-home">
                <div className='header-home'>
                    <h1>Home</h1>
                    <BtnCustom
                                
                                label={"LOGOUT"}/>

                </div>
                <div className='sub-container'>
                    <div className='info-user'>
                        <h1>Bem vindo</h1>
                        <h2>Astolfo</h2>
                    </div>
                    <hr className='linha'></hr>
                    <div className='container-estabelecimentos-user'>
                        <h1> Seus estabelecimentos</h1>
                        {/* implementar MAP */}
                        <div className='estabelecimento'>
                            <div className='nome-endereco'>
                                <h1>Chimarrom</h1>
                                <h2>Rua Rio Branco nº 1500</h2>
                            </div>
                            <div className='btn-editar'>
                                <BtnCustom
                                
                                label={"EDITAR"}/>
                            </div>
                            
                        </div>
                        



                    </div>
                </div>


            </div>
        </div>
    );
}

export default Home;