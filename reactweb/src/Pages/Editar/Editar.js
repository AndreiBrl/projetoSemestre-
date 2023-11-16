import { useEffect, useState } from 'react';
import BtnCustom from '../../Components/Buttons/BtnCustom';
import BtnCustomStatic from '../../Components/Buttons/BtnCustomStatic';
import '../Editar/Editar.css';
import axios from 'axios';
import { useAuth } from '../../Components/Auth/Auth';
import { useNavigate, useLocation } from 'react-router-dom';


const Editar = () => {

    //const location = useLocation()

    
    //const indexEscolhido = location.state.index;
    
    const navigation = useNavigate();
    const {userCompleto, setIndex, index, setIndexEndereco} = useAuth();
    const [telefoneEstabelecimento, setTelefoneEstabelecimento] = useState("");
    const [instagramEstabelecimento, setInstagramstabelecimento] = useState("");
    const [horarioEstabelecimento, setHorarioEstabelecimento] = useState("");
    const [nomeEstabelecimento, setNomeEstabelecimento] = useState("");
    const [estabelecimento, setEstabelecimento] = useState("");
    const [enderecos, setEnderecos] = useState([]);

    const infoEstabelecimento = {
        id:estabelecimento.id,
        nome: nomeEstabelecimento,
        funcionamento: horarioEstabelecimento,
        contato: telefoneEstabelecimento,
        instagram: instagramEstabelecimento,
        usuarioId: userCompleto.id
    }

    useEffect(()=>{
            axios.get(`https://localhost:7179/estabelecimentos/${userCompleto.id}`)
            .then((response)=>{
                const data = response.data[index]
                setEstabelecimento(data)
                setTelefoneEstabelecimento(data.contato)
                setInstagramstabelecimento(data.instagram)
                setHorarioEstabelecimento(data.funcionamento)
                setNomeEstabelecimento(data.nome)
                setEnderecos(data.enderecos)
                
                
                
                
            })
            .catch((error)=>{

                console.log(error);
            })
    },[])

    
    const voltaHome = () =>{
        navigation('/home')
        
    }

    const editarestabelecimento = (e) =>{
        e.preventDefault()
        axios.put(`https://localhost:7179/estabelecimentos/${estabelecimento.id}`,infoEstabelecimento)
    }
    

  const criaNovoEndereco=(e) =>{
    e.preventDefault()
    navigation(`/cadastroendereco`)
  }

  const editaEndereco = (rota,index) =>{
    setIndexEndereco(index)
    navigation(rota)
  }


    return (
        <div className='container-editar'>
            <div className="wrapper-editar">
                <div className='header-editar'>
                
                    <BtnCustomStatic
                        onClick={voltaHome}
                        label={"VOLTAR"}
                        customStyle={{ width: "13%", backgroundColor: "rgb(52, 52, 201)", marginBottom: "8%" }}

                    />
                

                    <h1>{infoEstabelecimento.nome}</h1>


                </div>
                <div className='sub-container-editar'>
                    <form>


                        <div className='info-estabelecimento'>
                            <div className='sub-info-estabelecimento'>
                                <i className='bx bxl-whatsapp'></i>
                                <input
                                    type='text'
                                    onChange={(e) => setTelefoneEstabelecimento(e.target.value)}
                                    value={telefoneEstabelecimento}
                                ></input>
                            </div>
                            <div className='sub-info-estabelecimento'>
                                <i className='bx bxl-instagram'></i>

                                <input
                                    type='text'
                                    onChange={(e) => setInstagramstabelecimento(e.target.value)}
                                    value={instagramEstabelecimento}
                                ></input>

                            </div>
                            <div className='sub-info-estabelecimento'>

                                <i className='bx bx-time-five'></i>

                                <input
                                    type='text'
                                    onChange={(e) => setHorarioEstabelecimento(e.target.value)}
                                    value={horarioEstabelecimento}
                                ></input>
                            </div>
                            <div className='btnEditar'>

                                <BtnCustomStatic
                                    onClick={editarestabelecimento}
                                    label={"EDITAR"}
                                    customStyle={{ width: "100%", backgroundColor: "green", marginBottom: "8%" }}
                                />

                            </div>

                        </div>
                    </form>
                    <hr className='linha'></hr>
                    <div className='container-enderecos'>
                        <h1> ENDEREÇOS</h1>
                            <BtnCustomStatic
                                onClick={criaNovoEndereco}
                                label={"CRIAR NOVO ENDEREÇO"}
                                customStyle={{ width: "100%", backgroundColor: "green", marginBottom: "8%" }}
                            />
                            {
                                enderecos.map((item, index)=>(
                                    <div className='endereco'key={item.id}>
                                        <h1>{item.rua}</h1>
                                        
                                        <BtnCustom
                                        onClick={()=>editaEndereco("/editarendereco", index)}
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

export default Editar;