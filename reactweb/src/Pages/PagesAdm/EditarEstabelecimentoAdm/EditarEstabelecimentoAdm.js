import { useEffect, useState } from 'react';
import BtnCustom from '../../../Components/Buttons/BtnCustom'
import BtnCustomStatic from '../../../Components/Buttons/BtnCustomStatic';
import './EditarEstabelecimentoAdm.css';
import { useAuth } from '../../../Components/Auth/Auth';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const EditarAdm = () => {
    const navigation = useNavigate()
    const [telefoneEstabelecimento, setTelefoneEstabelecimento] = useState("3222-5555");
    const [instagramEstabelecimento, setInstagramstabelecimento] = useState("@Instagram");
    const [horarioEstabelecimento, setHorarioEstabelecimento] = useState("taltaltal");
    const [nomeEstabelecimento, setNomeEstabelecimento] = useState("");
    const [estabelecimento, setEstabelecimento] = useState({});
    const [enderecos, setEnderecos] = useState([]);

    const { index, setIndexEndereco, setIdUserMembro, idUserMembro, token } = useAuth();
    const [renderiza, setRenderiza] = useState("");


    const infoEstabelecimento = {
        id: estabelecimento.id,
        nome: nomeEstabelecimento,
        funcionamento: horarioEstabelecimento,
        contato: telefoneEstabelecimento,
        instagram: instagramEstabelecimento,
        usuarioId: idUserMembro
    }

    console.log(infoEstabelecimento)
    const redirectPage = (rota) => {
        navigation(rota)
    }
    useEffect(() => {

        axios.get(`https://localhost:7179/estabelecimentos/${index}`).then(response => {

            const data = response.data
            setEstabelecimento(data)
            setTelefoneEstabelecimento(data.contato)
            setInstagramstabelecimento(data.instagram)
            setHorarioEstabelecimento(data.funcionamento)
            setNomeEstabelecimento(data.nome)
            setEnderecos(data.enderecos)
        })
    }, [])

    const deletaEstabelecimento = (e) => {
        e.preventDefault()
        axios.delete(`https://localhost:7179/estabelecimentos/${index}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        navigation('/home')
    }

    // esta funcao serve para pegar Id do usuario dono do estabelecimento que é necessário para fazer o PUT na api
    // Neste momento foi necessário por no userCompleto.id está o id do ADMIN e não usuario dono do estabelecimento
    // avaliar este metodo, parece estar lento
    useEffect(() => {

        try {
             axios.get(`https://localhost:7179/estabelecimentos/`).then(response => {

                const data = response.data;

                const filteredEstabelecimento = data.find((estabelecimento) => estabelecimento.Nome.toLowerCase() === nomeEstabelecimento.toLowerCase());

                if (filteredEstabelecimento) {
                    setIdUserMembro(filteredEstabelecimento.UsuarioId);
                }
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        

        
    }, []);
    
    console.log("ID",idUserMembro);
    const editarestabelecimento = (e) => {
        e.preventDefault()
        axios.put(`https://localhost:7179/estabelecimentos/${estabelecimento.id}`, infoEstabelecimento, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }
    useEffect(() => {

        setRenderiza("teça")

    }, [idUserMembro])



    const editaEndereco = (rota, index) => {
        console.log(index);
        setIndexEndereco(index)
        navigation(rota);
    }
    return (
        <div className='container-editar'>
            <div className="wrapper-editar">
                <div className='header-editar'>


                    <BtnCustomStatic
                        label={"VOLTAR"}
                        customStyle={{ width: "13%", backgroundColor: "rgb(52, 52, 201)", marginBottom: "8%" }}
                        onClick={() => redirectPage('/home')}
                    />


                    <h1>{nomeEstabelecimento}</h1>


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
                                    label={"DELETAR"}
                                    customStyle={{ width: "100%", backgroundColor: "red", marginBottom: "8%" }}
                                    onClick={deletaEstabelecimento}
                                />
                                <BtnCustomStatic
                                    label={"EDITAR"}
                                    customStyle={{ width: "100%", backgroundColor: "green", marginBottom: "8%" }}
                                    onClick={editarestabelecimento}
                                />


                            </div>

                        </div>
                    </form>
                    <hr className='linha'></hr>
                    <div className='container-enderecos'>
                        <h1> ENDEREÇOS</h1>
                        <BtnCustomStatic
                            label={"CRIAR NOVO ENDEREÇO"}
                            customStyle={{ width: "100%", backgroundColor: "green", marginBottom: "8%" }}
                            onClick={() => redirectPage('/cadastroendereco')}
                        />


                        {/* implementar MAP */}
                        {
                            enderecos.map((item, index) => (
                                <div className='endereco' key={item.id}>
                                    <h1>{item.rua}</h1>

                                    <BtnCustom
                                        onClick={() => editaEndereco("/editarendereco", index)}
                                        label={"EDITAR"} />
                                </div>


                            ))
                        }




                    </div>
                </div>


            </div>
        </div >
    );
}

export default EditarAdm;