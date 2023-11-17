import BtnCustom from '../../Components/Buttons/BtnCustom';
import BtnCustomStatic from '../../Components/Buttons/BtnCustomStatic';
import '../Home/home.style.css';
import { useAuth } from '../../Components/Auth/Auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Home = () => {
    const navigation = useNavigate();

    const { userCompleto, deslogaAuth, autenticado, setIndex } = useAuth();
    const [nomeEstabelecimento, setNomeEstabelecimento] = useState("");
    const [estabelecimento, setEstabelecimento] = useState([]);
    const [ativaPesquisa, setAtivaPesquisa] = useState(false);





    const desloga = () => {
        deslogaAuth();
        navigation("/");

    }


    // //implementando get estabelecimnto
    // const getEstabelecimento = async () => {
    //     return await axios.get("https://localhost:7179/estabelecimentos/9dcee6b5-ab8d-4e3f-84fc-320ab4ee8c33").then(response => {

    //         return response.data;
    //     })
    // }

    const divEstabelecimento = useRef();
    useEffect(() => {
        if (userCompleto.roles[0] != "admin") {

            userCompleto && axios.get(`https://localhost:7179/estabelecimentos/${userCompleto.id}`).then(response => {
                const data = response.data;
                setEstabelecimento(data);
            });
        }




    }, [])
    console.log("renderiza");

    /*     useEffect(()=>{
            
            
            
    
        },[divEstabelecimento])
     */

    const cadastroestabelecimento = () => {
        navigation('/cadastroestabelecimento')
    }


    const redirectPage = (rota, index) => {

        setIndex(index)
        navigation(rota)
    }



    useEffect(() => {
        if (userCompleto.roles[0] === "admin") {

            axios.get(`https://localhost:7179/estabelecimentos/`).then(response => {
                setEstabelecimento(response.data)

            })
        }

    }, [])

    console.log(estabelecimento);


    return (
        <div>

            {autenticado ?
                <div className='container-home'>
                    <div className="wrapper-home">
                        <div className='header-home'>
                            <h1>Home</h1>
                            {/* Esta condição Precisa de manutenção 
                    
                    // Primeiro retorno tela admin
                        // Segundo retorno tela Usuário normal*/}
                            {
                                userCompleto.roles[0] === "admin" ?
                                    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>

                                        <BtnCustom
                                            onClick={() => redirectPage("/cadastro")}
                                            label={" NOVO USUÁRIO"}
                                        />

                                        <BtnCustom
                                            onClick={() => redirectPage("/cadastroadmin")}
                                            label={" NOVO ADMIN"}
                                            customStyle={{ marginLeft: "5%" }} />
                                    </div>
                                    : null

                            }
                            <BtnCustom
                                onClick={desloga}
                                label={"LOGOUT"} />

                        </div>
                        <div className='sub-container'>
                            <div className='info-user'>
                                <h1>Bem vindo</h1>
                                <h2>{userCompleto.login}</h2>
                            </div>
                            {
                                // Primeiro retorno tela admin
                                // Segundo retorno tela Usuário normal

                                userCompleto.roles[0] === "admin" ? <div className='container-estabelecimentos-user'>
                                    <h1> Estabelecimentos</h1>
                                    <div className="input-box-pesquisa">
                                        <input type="text" placeholder="Pesquise um estabelecimento" required
                                            onChange={(e) => setNomeEstabelecimento(e.target.value)}

                                        />
                                        <BtnCustomStatic
                                            customStyle={{ marginLeft: "2%" }}
                                            label={"Pesquisar"}
                                            onClick={() => setAtivaPesquisa(true)}
                                        />


                                    </div>
                                    {/* implementar MAP */}


                                    {

                                        nomeEstabelecimento.length>0 && estabelecimento

                                        .filter((estabelecimento) => estabelecimento.Nome.toLowerCase().includes(nomeEstabelecimento.toLowerCase()))

                                            .map((estabelecimentoFiltrado) => (
                                                <div className='estabelecimento' key={estabelecimentoFiltrado.id}>
                                                    <div className='nome-endereco'>
                                                        <h1>{estabelecimentoFiltrado.Nome}</h1>
                                                    </div>

                                                    <div className='btn-editar'>
                                                        <BtnCustom label={"ABRIR"}
                                                            onClick={() => redirectPage('/editarestabelecimentoadm', estabelecimentoFiltrado.Id)} />
                                                    </div>
                                                </div>
                                            ))

                                    }
                                </div> : <div className='container-estabelecimentos-user'>
                                    <h1> Seus estabelecimentos</h1>
                                    <BtnCustomStatic
                                        onClick={cadastroestabelecimento}
                                        label={"CRIAR NOVO ESTABELECIMENTO"}
                                        customStyle={{ width: "100%", backgroundColor: "green", marginBottom: "8%" }}
                                    />

                                    {
                                        estabelecimento && estabelecimento.length > 0 ? (
                                            estabelecimento.map((item, index) => (
                                                <div className='estabelecimento' key={item.id}>
                                                    <div className='nome-endereco' alt="testedoalt" >

                                                        <h1>{item.nome}</h1>
                                                        {item.enderecos && item.enderecos.length > 0 ? (
                                                            <h2>{item.enderecos[0].rua}</h2>
                                                        ) : (
                                                            <p>Nenhum endereço disponível</p>
                                                        )}
                                                    </div>
                                                    <div className='btn-editar'>


                                                        <BtnCustom
                                                            onClick={() => redirectPage('/editar', index)}
                                                            label={"EDITAR"}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <h1 style={{ fontSize: "1rem" }}>Não há estabelecimentos cadastrados</h1>
                                        )
                                    }

                                    {/* {
                                        estabelecimento.map((item) => (
                                            item.enderecos.map((endereco, index) => (
                                                <div className='estabelecimento' key={`${item.id}_${index}`}>
                                                    <div className='nome-endereco'>
                                                        <h1>{item.nome}</h1>
                                                        <h2>{endereco.rua}</h2>
                                                    </div>
                                                    <div className='btn-editar'>
                                                        <BtnCustom label={"EDITAR"} />
                                                    </div>
                                                </div>
                                            ))
                                        ))
                                    } */}

                                </div>
                            }
                        </div>
                    </div>
                </div> : <div><h1>Você nao esta logado</h1></div>
            }
        </div>
    );
}

export default Home;