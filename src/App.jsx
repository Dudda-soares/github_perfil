import { useState, useEffect } from "react";
import Perfil from "./components/Perfil";
import Formulario from "./components/Formulario";
import ReposList from "./components/ReposList";
import "./App.css";


 function App(){
  
  const[nomeUsuario, setNomeUsuario] = useState('');

  return(
    // App é o componente principal que renderiza o componente Perfil e o Formulario
    // O componente Perfil exibe uma imagem de avatar e o nome do usuário, enquanto o
    // Formulario permite ao usuário inserir notas e calcular a média, exibindo se o aluno
    // foi aprovado ou reprovado com base nas notas inseridas.
    <>
      <div className="usuario" >
        <div className="user">
          <label >Digite o nome do usuário Github:</label>
          <input 
          placeholder="Digite o nome do usuário"
          type="text" 
          onBlur={(e) => setNomeUsuario( e.target.value)}/>
        </div>
      </div>

      {nomeUsuario.length > 1 && (
        <>
          <Perfil nomeUsuario={nomeUsuario}/>
          <ReposList nomeUsuario={nomeUsuario} />
        </>

      )}

      {/* {formularioVisivel && <Formulario />} 
      {/* O componente Formulario só será renderizado se formularioVisivel for true */}
      {/* O botão abaixo alterna a visibilidade do componente Formulario */}  
      
      {/* <button type="button" onClick={()=> setFormularioVisivel(!formularioVisivel)}>Toggle</button> */}
    </>
  );


}
export default App;