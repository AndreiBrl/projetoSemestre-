import { useState } from 'react';
import BtnCustom from '../../Components/Buttons/BtnCustom';
import BtnCustomStatic from '../../Components/Buttons/BtnCustomStatic';
import '../Editar/Editar.css';

const Editar = () => {

    const [telefoneEstabelecimento, setTelefoneEstabelecimento] = useState("3222-5555");
    const [instagramEstabelecimento, setInstagramstabelecimento] = useState("@Instagram");
    const [horarioEstabelecimento, setHorarioEstabelecimento] = useState("taltaltal");
    const trocaNome = () => {

    }

    return (
        <div className='container-editar'>
            <div className="wrapper-editar">
                <div className='header-editar'>
                    <a href='/home'>

                        <BtnCustomStatic
                            label={"VOLTAR"}
                            customStyle={{ width: "100%", backgroundColor: "rgb(52, 52, 201)", marginBottom: "8%" }}

                        />
                    </a>

                    <h1>Nome estabelecimento</h1>


                </div>
                <div className='sub-container-editar'>
                    <form>


                        <div className='info-estabelecimento'>
                            <div className='sub-info-estabelecimento'>
                                <i class='bx bxl-whatsapp'></i>
                                <input
                                    type='text'
                                    onChange={(e) => setTelefoneEstabelecimento(e.target.value)}
                                    value={telefoneEstabelecimento}
                                ></input>
                            </div>
                            <div className='sub-info-estabelecimento'>
                                <i class='bx bxl-instagram'></i>

                                <input
                                    type='text'
                                    onChange={(e) => setInstagramstabelecimento(e.target.value)}
                                    value={instagramEstabelecimento}
                                ></input>

                            </div>
                            <div className='sub-info-estabelecimento'>

                                <i class='bx bx-time-five'></i>

                                <input
                                    type='text'
                                    onChange={(e) => setHorarioEstabelecimento(e.target.value)}
                                    value={horarioEstabelecimento}
                                ></input>
                            </div>
                            <div className='btnEditar'>

                                <BtnCustomStatic
                                    label={"EDITAR"}
                                    customStyle={{ width: "100%", backgroundColor: "green", marginBottom: "8%" }}
                                />

                            </div>

                        </div>
                    </form>
                    <hr className='linha'></hr>
                    <div className='container-enderecos'>
                        <h1> ENDEREÇOS</h1>
                        <a href='#'>

                            <BtnCustomStatic
                                label={"CRIAR NOVO ENDEREÇO"}
                                customStyle={{ width: "100%", backgroundColor: "green", marginBottom: "8%" }}
                            />

                        </a>
                        {/* implementar MAP */}
                        <div className='endereco'>

                            <h1>Rua Rio Branco</h1>


                            <BtnCustom

                                label={"EDITAR"} />


                        </div>




                    </div>
                </div>


            </div>
        </div >
    );
}

export default Editar;