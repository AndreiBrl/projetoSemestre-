import { useState } from 'react';
import BtnCustom from '../../Components/Buttons/BtnCustom';
import BtnCustomStatic from '../../Components/Buttons/BtnCustomStatic';
import '../Editar/Editar.css';

const Editar = () => {

    const [nomeEstabelecimento, setNomeEstabelecimento] = useState("CCCC");
    const trocaNome = () => {

    }

    return (
        <div className='container-editar'>
            <div className="wrapper-editar">
                <div className='header-editar'>
                    <h1>Nome estabelecimento</h1>


                </div>
                <div className='sub-container'>
                    <form>
                        <div className='info-estabelecimento'>
                            <div className='sub-info-estabelecimento'>
                                <i class='bx bxl-whatsapp'></i>
                                <input

                                ></input>
                            </div>
                            <div className='sub-info-estabelecimento'>
                                <i class='bx bxl-instagram'></i>

                                <input
                                    type='text'
                                    onChange={(e) => setNomeEstabelecimento(e.target.name)}



                                ></input>

                            </div>
                            <div className='sub-info-estabelecimento'>

                                <i class='bx bx-time-five'></i>

                                <input

                                ></input>
                            </div>
                            <div className='btnEditar'>

                            <BtnCustomStatic
                                label={"EDITAR"}
                                customStyle={{ width: "70%", backgroundColor: "green", marginBottom: "8%" }}
                                />
                                </div>

                        </div>
                    </form>
                    <hr className='linha'></hr>
                    <div className='container-enderecos'>
                        <h1> ENDEREÇOS</h1>
                        <BtnCustomStatic
                            label={"CRIAR NOVO ENDEREÇOS"}
                            customStyle={{ width: "100%", backgroundColor: "green", marginBottom: "8%" }}
                        />

                        {/* implementar MAP */}
                        <div className='endereco'>

                            <h1>Rua Rio Branco</h1>


                            <BtnCustom

                                label={"EDITAR"} />


                        </div>




                    </div>
                </div>


            </div>
        </div>
    );
}

export default Editar;