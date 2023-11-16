import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BtnCustom from '../../Components/Buttons/BtnCustom';
import './CadastroEndereco.css'
import { useAuth } from '../../Components/Auth/Auth';
import axios from 'axios'
import { useEffect, useState } from 'react';

const CadastroEndereco = () => {
    const navigation = useNavigate();
    const location = useLocation();
   
    const {userCompleto, index} = useAuth();
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [numero, setNumero] = useState("");
    const [referencia, setReferencia] = useState("");
    const [estabelecimentoId, setEstabelecimentoId] = useState("");


    const redirectPagina = (index) =>{
        navigation(index);
    }


    useEffect(()=>{

        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response)=>{
            const data = response.data
            
            setRua(data.logradouro)
            setBairro(data.bairro)
            setCidade(data.localidade)
            setUf(data.uf)
        })
        .catch((error)=>{
            console.log(error);
        })

        if(cep === ""){
            setRua("")
            setBairro("")
            setCidade("")
            setUf("")
            setNumero("")
            setReferencia("")
        }
    },[cep])


    useEffect(()=>{
        axios.get(`https://localhost:7179/estabelecimentos/${userCompleto.id}`)
        .then((response)=>{
            const data = response.data[index]
            setEstabelecimentoId(data.id)
            
        })
        .catch((error)=>{

            console.log(error);
        })
},[])


    const enderecoCadastrado = {
        rua: rua,
        bairro: bairro,
        numero: numero,
        cep: cep,
        cidade: cidade,
        uf: uf,
        referencia: referencia,
        estabelecimentoId: estabelecimentoId
    }


    const cadastraEndereco = (e) => {
        e.preventDefault();
        axios.post(`https://localhost:7179/enderecos`,enderecoCadastrado)
        .then((response)=>{
            console.log("Endereço cadastrado ",response);
        })
        .catch((error)=>{
            console.log(error);
        })

    }
    

    return (
        <div className='container-cadastro-endereco'>
            <div className="wrapper-cadastro-endereco">
                <div className='header-editar'>
                        <BtnCustom
                            onClick={()=>redirectPagina("/editar")}
                            customStyle={{ width: "13%", backgroundColor: "rgb(52, 52, 201)", fontSize: "1rem" }}
                            label={"VOLTAR"}
                        />
                    <h1>Cadastro de Endereço</h1>
                </div>
                <form action="">
                    <div className='sub-container-cadastro-endereco'>

                        <div className="input-box-cadastro-endereco">
                            <div className='cep'>

                                <input type="text" placeholder="CEP" required
                                onChange={(e)=> setCep(e.target.value)}
                                value={cep} />

                            </div>
                        </div>

                    </div>
                    
                    <div className='sub-container-cadastro-endereco'>
                        <div className="input-box-cadastro-endereco">
                            <div className='rua'>


                                <input type="text" placeholder="Rua" required
                                onChange={(e)=> setRua(e.target.value)}
                                value={rua} />
                            </div>
                        </div>
                        <div className="input-box-cadastro-endereco">
                            <div className='numero'>


                                <input type="text" placeholder="Número" required
                                onChange={(e)=> setNumero(e.target.value)}
                                value={numero} />
                            </div>
                        </div>
                    </div>
                    <div className='sub-container-cadastro-endereco'>

                        <div className="input-box-cadastro-endereco">
                            <div className='bairro'>


                                <input type="text" placeholder="Bairro" required
                                onChange={(e)=> setBairro(e.target.value)}
                                value={bairro} />
                            </div>
                        </div>
                        <div className="input-box-cadastro-endereco">
                            <div className='cidade'>


                                <input type="text" placeholder="Cidade" required
                                onChange={(e)=> setCidade(e.target.value)}
                                value={cidade} />
                            </div>
                        </div>
                        <div className="input-box-cadastro-endereco">
                            <div className='uf'>


                                <input type="text" placeholder="UF" required
                                onChange={(e)=> setUf(e.target.value)}
                                value={uf} />
                            </div>
                        </div>
                    </div>
                    <div className='sub-container-cadastro-endereco'>
                        <div className="input-box-cadastro-endereco">

                            <div className='referencia'>


                                <input type="text" placeholder="Referência" required
                                onChange={(e)=> setReferencia(e.target.value)}
                                value={referencia} />
                            </div>
                        </div>

                    </div>
                    <div className='btnCriar'>

                        <BtnCustom
                            onClick={cadastraEndereco}
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