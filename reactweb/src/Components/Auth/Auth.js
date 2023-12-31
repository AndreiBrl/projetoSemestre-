import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";




const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);

  const [nomeUser, setNomeUser] = useState("");
  const [senha, setsenha] = useState("");
  const [email, setemail] = useState("");
// acho que as variáveis acima não estão sendo utilizadas

const [idUserMembro, setIdUserMembro] = useState("");
  const [userCompleto, setUserCompleto] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [index, setIndex] = useState(""); // Esta index corresponde ao id do estabelecimento
  const [ indexEndereco, setIndexEndereco] = useState("");
  const [token, setToken] = useState("");



  const cadastrar = (nomeUser, email, senha) => {
    setNomeUser(nomeUser)
    setemail(email)
    setsenha(senha)

    const user = {
      nome:nomeUser,
      email:email,
      senha: senha
    }


    axios.post("https://localhost:7179/registro/membro", user)
              .then(response => {
        console.log('Resposta da requisição POST:', response.data);
        

      })
      .catch(error => {

        console.error('Erro na requisição POST', error);
      });
  }
  const cadastrarAdmin = (nomeUser, email, senha) => {
    setNomeUser(nomeUser)
    setemail(email)
    setsenha(senha)

    const user = {
      nome:nomeUser,
      email:email,
      senha: senha
    }


    axios.post("https://localhost:7179/registro/admin", user,{
      headers:{
        "Authorization" : "Bearer " + token
    }
    })
              .then(response => {
        console.log('Resposta da requisição POST ADM:', response.data);
        

      })
      .catch(error => {

        console.error('Erro na requisição POST', error);
      });
  }

  const login = async (nomeUser, senha) => {
    setNomeUser(nomeUser)
    setsenha(senha)

    const user = { nome: nomeUser, senha: senha }


    return await axios.post("https://localhost:7179/login", user)
                          .then(response => {
                                const data = response.data;

                                setAutenticado(true)
                                setToken(data.data.token)
                                setUserCompleto(data.data.usuario)
                            return true;
                          })
                            .catch(error => {
                              if (error.response && error.response.status === 400) {
                                throw new Error('Senha ou Login inválido');
                              }
                          
                              throw error;
                              return false
                            });
  }

  const deslogaAuth = () => {
   setAutenticado(false)
   setUserCompleto(null)
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, userCompleto, autenticado, deslogaAuth, cadastrar, index, setIndex, indexEndereco, setIndexEndereco,cadastrarAdmin,idUserMembro,setIdUserMembro,token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthContext, AuthProvider }