import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";




const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);

  const [nomeUser, setNomeUser] = useState("");
  const [senha, setsenha] = useState("");
  const [email, setemail] = useState("");
  const [userCompleto, setUserCompleto] = useState();
  const [autenticado, setAutenticado] = useState(false);

  // const cadastrar = (nomeUser, email, senha) => {
  //   setNomeUser(nomeUser)
  //   setemail(email)
  //   setsenha(senha)

  //   axios.post("sss", {

  //     body: {
  //       nome: nomeUser,
  //       email: email,
  //       senha: senha

  //     }

  //   })

  //     .then(response => {


  //       console.log('Resposta da requisição POST:', response.data);

  //     })
  //     .catch(error => {
  //       // Trate os erros aqui
  //       console.error('Erro na requisição POST', error);
  //     });



  // }
  const login = async (nomeUser, senha) => {
    setNomeUser(nomeUser)
    setemail(email)
    setsenha(senha)

    const user = { nome: nomeUser, senha: senha }


    await axios.post("https://localhost:7179/login", user).then(response => {

      const data = response.data;
      console.log("ESTA DEMORANDO", data.data.usuario);
      setAutenticado(true)
      setUserCompleto(data.data.usuario)


    })
      .catch(error => {
        // Trate os erros aqui
        console.error('Erro na requisição POST', error);
      });


  }

  const deslogaAuth = () => {
   setAutenticado(false)
   setUserCompleto(null)
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, userCompleto, autenticado, autenticado,deslogaAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthContext, AuthProvider }