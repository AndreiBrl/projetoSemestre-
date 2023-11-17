import BtnCustom from '../../Components/Buttons/BtnCustom';
import { useState, useEffect } from 'react';
import './CadastroEstabelecimento.css'
import { useAuth } from '../../Components/Auth/Auth';
import axios, { HttpStatusCode } from 'axios';
import { useNavigate } from 'react-router-dom';

const CadastroEstabelecimento = () => {

    const navigate = useNavigate();
    const { userCompleto, autenticado, token } = useAuth();
    const [nome, setNome] = useState('');
    const [funcionamento , setFuncionamento] = useState('');
    const [contato, setContato] = useState('');
    const [instagram, setInstagram] = useState('');
  

    
    const dadosEstabelecimento = {
        nome:nome,
        funcionamento: funcionamento,
        contato: contato,
        instagram: instagram,
        usuarioId: userCompleto? userCompleto.id : null

    };
    
    const criaEstabelecimento =(e)=>{
        e.preventDefault();
         axios.post(`https://localhost:7179/estabelecimentos`,dadosEstabelecimento,{
            headers:{
                "Authorization" : "Bearer " + token
            }
         })
        .then((response)=>{
            console.log(response.data);
        })
        .catch((error)=>{
            if (error.response && error.response.status === 401) {
                throw new Error("Não autorizado");
            }
        })
        
    };

    const redirecionaHome = () =>{
        navigate('/home')
    }

    
    return (
        <div className='container-cadastro-estabelecimento'>
            <div className="wrapper-cadastro-estabelecimento">
                <div className='header-editar'>
                    <BtnCustom
                            onClick={redirecionaHome}
                            customStyle={{ width: "13%", backgroundColor: "rgb(52, 52, 201)", fontSize: "1rem" }}
                            label={"VOLTAR"}
                        />
                    
                    <h1>Cadastro de Estabelecimento</h1>
                </div>
                <form action="">
                    <div className='sub-container-cadastro-estabelecimento'>

                        <div className="input-box-cadastro-estabelecimento">
                            <i className='bx bx-home'></i>
                            <input type="text" placeholder="Nome do Estabelecimento" required
                                onChange={(e)=> setNome(e.target.value)}
                                value={nome} />
                        </div>
                        <div className="input-box-cadastro-estabelecimento">
                            <i className='bx bx-envelope'></i>
                            <input type="text" placeholder="Contato" required
                            onChange={(e)=> setContato(e.target.value)}
                            value={contato} />
                        </div>
                    </div>
                    <div className='sub-container-cadastro-estabelecimento'>
                        <div className="input-box-cadastro-estabelecimento">
                        <i className='bx bxl-instagram'></i>
                            <input type="text" placeholder="Instagram" required
                            onChange={(e)=> setInstagram(e.target.value)}
                            value={instagram} />
                        </div>
                        <div className="input-box-cadastro-estabelecimento">
                        <i className='bx bx-time-five'></i>
                            <input type="text" placeholder="Funcionamento" required
                            onChange={(e)=> setFuncionamento(e.target.value)}
                            value={funcionamento} />
                        </div>
                    </div>
                    <div className='btnCriar'>

                        <BtnCustom
                            onClick={criaEstabelecimento}
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