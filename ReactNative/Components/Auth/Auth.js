import * as React from 'react'
import { createContext, useContext, useState } from "react";
import { useFonts } from 'expo-font';
import axios from 'axios';

const AuthContext = createContext();


const useAuth = () => {
    return useContext(AuthContext)
}
const Auth = ({ children }) => {
    const [autenticado, setAutenticado] = React.useState(false);
    const [token, setToken] = React.useState("");
    const [userCompleto, setUserCompleto] = React.useState("");
    const [idUserMembro, setIdUserMembro] = React.useState("");
    const [index, setIndex] = React.useState(""); // Esta index corresponde ao id do estabelecimento
    const [ indexEndereco, setIndexEndereco] = React.useState("");
    const [estabelecimentoIdClicado, setEstabelecimentoIdClicado ] = React.useState("");
 
  


    const [nomeUser, setNomeUser] = React.useState("");
    const [senha, setsenha] = React.useState("");
    const [email, setemail] = React.useState("");


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
    //setUserCompleto(null)
    }
    return (
        <AuthContext.Provider value={{ cadastrar, cadastrarAdmin, login, deslogaAuth, autenticado, token,userCompleto, idUserMembro,setIdUserMembro, index, setIndex, indexEndereco, setIndexEndereco, estabelecimentoIdClicado, setEstabelecimentoIdClicado }}>
            {children}
        </AuthContext.Provider>

    )
}

export { useAuth, AuthContext, Auth }