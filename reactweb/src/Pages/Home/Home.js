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
    

    



    const desloga = () => {
        deslogaAuth();
        navigation("/");

    }
    const [estabelecimento, setEstabelecimento] = useState([]);


    // //implementando get estabelecimnto
    // const getEstabelecimento = async () => {
    //     return await axios.get("https://localhost:7179/estabelecimentos/9dcee6b5-ab8d-4e3f-84fc-320ab4ee8c33").then(response => {

    //         return response.data;
    //     })
    // }

    const divEstabelecimento = useRef();
    useEffect(()=>{
        userCompleto && axios.get(`https://localhost:7179/estabelecimentos/${userCompleto.id}`).then(response => {
            const data = response.data;
            setEstabelecimento(data);
        });
         

        

    },[])

/*     useEffect(()=>{
        
        
        

    },[divEstabelecimento])
 */

    const cadastroestabelecimento = () =>{
        navigation('/cadastroestabelecimento')
    }

    const editarestabelecimento = (index) => {

        setIndex(index)
        navigation('/editar', { state: { index } });
        //navigation('/editar')
    }

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
                                userCompleto.roles === "admin" ? <a href="/cadastro">

                                    <BtnCustom

                                        label={"CADASTRO NOVO USUÁRIO"} /> </a> : null

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

                                userCompleto.roles === "admin" ? <div className='container-estabelecimentos-user'>
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
                                    {/* <a href='/cadastroestabelecimento'>
                                        <BtnCustomStatic
                                            label={"CRIAR NOVO ESTABELECIMENTO"}
                                            customStyle={{ width: "100%", backgroundColor: "green", marginBottom: "8%" }}
                                        />
                                    </a> */}

                                    <BtnCustomStatic
                                            onClick={cadastroestabelecimento}
                                            label={"CRIAR NOVO ESTABELECIMENTO"}
                                            customStyle={{ width: "100%", backgroundColor: "green", marginBottom: "8%" }}
                                        />
                                 
                                    {
                                        estabelecimento && estabelecimento.length > 0 ? (
                                            estabelecimento.map((item,index) => (
                                                <div className='estabelecimento' key={item.id}>
                                                    <div className='nome-endereco'  alt="testedoalt" >
                                                      
                                                        <h1>{item.nome}</h1>
                                                        {item.enderecos && item.enderecos.length > 0 ? (
                                                            <h2>{item.enderecos[0].rua}</h2>
                                                            ) : (
                                                                <p>Nenhum endereço disponível</p>
                                                                )}
                                                    </div>
                                                    <div className='btn-editar'>
                                                        
                                                    
                                                        <BtnCustom
                                                            onClick={()=>editarestabelecimento(index)}
                                                            label={"EDITAR"}
                                                             />
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <h1 style={{fontSize:"1rem"}}>Não há estabelecimentos cadastrados</h1>
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