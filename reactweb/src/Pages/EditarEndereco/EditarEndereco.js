import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Components/Auth/Auth';
import BtnCustom from '../../Components/Buttons/BtnCustom';
import './EditarEndereco.css'
import axios from 'axios'
import { useEffect, useState } from 'react';

const EditarEndereco = () => {
    const navigation = useNavigate();

    const { indexEndereco, userCompleto, index, idUserMembro } = useAuth();
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [numero, setNumero] = useState("");
    const [referencia, setReferencia] = useState("");
    const [id, setId] = useState("");
    const [estabelecimentoId, setEstabelecimentoId] = useState("");
    


    const enderecoEditado = {

        id: id,
        rua: rua,
        bairro: bairro,
        numero: numero,
        cep: cep,
        cidade: cidade,
        uf: uf,
        referencia: referencia,
        estabelecimentoId: estabelecimentoId
    }

    useEffect(() => {
        if (userCompleto.roles != "admin") {

            axios.get(`https://localhost:7179/estabelecimentos/${userCompleto.id}`)
                .then((response) => {
                    const data = response.data[index]

                    setCep(data.enderecos[indexEndereco].cep)
                    setRua(data.enderecos[indexEndereco].rua)
                    setBairro(data.enderecos[indexEndereco].bairro)
                    setCidade(data.enderecos[indexEndereco].cidade)
                    setUf(data.enderecos[indexEndereco].uf)
                    setNumero(data.enderecos[indexEndereco].numero)
                    setReferencia(data.enderecos[indexEndereco].referencia)
                    setId(data.enderecos[indexEndereco].id)
                    setEstabelecimentoId(data.id)

                })
                .catch((error) => {

                    console.log(error);
                })
        }
    }, [])
    useEffect(() => {
        // validacao por conta da variável que vem pelo location, caso esta tela seja acessada pelo usuário comum essa variável não existirá
        if (userCompleto.roles == "admin") {


            console.log(idUserMembro);
            console.log("index>", idUserMembro,);
            axios.get(`https://localhost:7179/estabelecimentos/${idUserMembro}`)
                .then((response) => {
                    const data = response.data
                    console.log("DATAAAAAAAA", data);
                    console.log(index);
                    data.forEach(element => {
                        if (element.id == index) {

                            setCep(element.enderecos[indexEndereco].cep)
                            setRua(element.enderecos[indexEndereco].rua)
                            setBairro(element.enderecos[indexEndereco].bairro)
                            setCidade(element.enderecos[indexEndereco].cidade)
                            setUf(element.enderecos[indexEndereco].uf)
                            setNumero(element.enderecos[indexEndereco].numero)
                            setReferencia(element.enderecos[indexEndereco].referencia)
                            setId(element.enderecos[indexEndereco].id)
                            setEstabelecimentoId(element.id)
                        }
                    });

                })
                .catch((error) => {

                    console.log(error);
                })
        }
    }, [])

    useEffect(() => {

        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => {
                const data = response.data

                setRua(data.logradouro)
                setBairro(data.bairro)
                setCidade(data.localidade)
                setUf(data.uf)
            })
            .catch((error) => {
                console.log(error);
            })

        if (cep === "") {
            setRua("")
            setBairro("")
            setCidade("")
            setUf("")
            setNumero("")
            setReferencia("")
        }
    }, [cep])

    const salvaEndereco = (e) => {
        e.preventDefault();

        axios.put(`https://localhost:7179/enderecos/${id}`, enderecoEditado)
            .then((response) => {
                console.log("Endereço editado com sucesso ", response);
                if(userCompleto.roles!="admin"){

                    navigation('/editar')
                }else{
                    navigation('/editarestabelecimentoadm')

                }
            })
            .catch((error) => {
                console.log(error);
            })


    }

    const retornaEditar = (rotaEditar, rotaEditarestabelecimentoadm) => {
        if (userCompleto.roles == "admin") {
            navigation(rotaEditarestabelecimentoadm);

        } else {
            navigation(rotaEditar)
        }
    }

    return (
        <div className='container-cadastro-endereco'>
            <div className="wrapper-cadastro-endereco">
                <div className='header-editar-endereco'>


                    <BtnCustom
                        onClick={() => retornaEditar("/editar", '/editarestabelecimentoadm')}
                        customStyle={{ width: "13%", backgroundColor: "rgb(52, 52, 201)", fontSize: "1rem" }}
                        label={"VOLTAR"}
                    />

                    <h1>Editar Endereço</h1>
                </div>
                <form action="">
                    <div className='sub-container-cadastro-endereco'>

                        <div className="input-box-cadastro-endereco">
                            <div className='cep'>

                                <input type="text" placeholder="CEP" required
                                    onChange={(e) => setCep(e.target.value)}
                                    value={cep} />
                            </div>
                        </div>

                    </div>

                    <div className='sub-container-cadastro-endereco'>
                        <div className="input-box-cadastro-endereco">
                            <div className='rua'>


                                <input type="text" placeholder="Rua" required
                                    onChange={(e) => setRua(e.target.value)}
                                    value={rua} />
                            </div>
                        </div>
                        <div className="input-box-cadastro-endereco">
                            <div className='numero'>

                                <input type="text" placeholder="Número" required
                                    onChange={(e) => setNumero(e.target.value)}
                                    value={numero} />

                            </div>
                        </div>
                    </div>
                    <div className='sub-container-cadastro-endereco'>

                        <div className="input-box-cadastro-endereco">
                            <div className='bairro'>


                                <input type="text" placeholder="Bairro" required
                                    onChange={(e) => setBairro(e.target.value)}
                                    value={bairro} />
                            </div>
                        </div>
                        <div className="input-box-cadastro-endereco">
                            <div className='cidade'>


                                <input type="text" placeholder="Cidade" required
                                    onChange={(e) => setCidade(e.target.value)}
                                    value={cidade} />
                            </div>
                        </div>
                        <div className="input-box-cadastro-endereco">
                            <div className='uf'>


                                <input type="text" placeholder="UF" required
                                    onChange={(e) => setUf(e.target.value)}
                                    value={uf} />
                            </div>
                        </div>
                    </div>
                    <div className='sub-container-cadastro-endereco'>
                        <div className="input-box-cadastro-endereco">

                            <div className='referencia'>


                                <input type="text" placeholder="Referência" required
                                    onChange={(e) => setReferencia(e.target.value)}
                                    value={referencia} />
                            </div>
                        </div>

                    </div>
                    <div className='btnCriar'>

                        <BtnCustom
                            onClick={salvaEndereco}
                            customStyle={{ width: "50%", backgroundColor: "green", fontSize: "1.2rem", marginTop: "5%" }}
                            label={"SALVAR"}
                        />
                    </div>

                </form>
            </div>
        </div>
    );
};


export default EditarEndereco;