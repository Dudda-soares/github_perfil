import React, { useState, useEffect } from "react";
import styles from "./ReposList.module.css";
import { use } from "react";

const ReposList = ({nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [deuErro, setDeuErro] = useState(false);

    useEffect(() => {
        setEstaCarregando(true);
        setDeuErro(false);
        // useEffect é um hook que permite executar efeitos colaterais em componentes funcionais
        // Neste caso, ele está buscando dados de uma API e atualizando o estado do componente  
        
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            // fetch é uma função que faz uma requisição HTTP para a URL especificada
            // e retorna uma Promise que resolve com a resposta da requisição
            .then(response =>{
                if(!response.ok){
                    throw new Error("Erro ao buscar repositórios");
                }
                return response.json()
            })
            // response.json() converte a resposta da requisição em um objeto JSON
            // e retorna uma Promise que resolve com o objeto JSON
            .then(resJson => {
                setTimeout(() => {
                    setEstaCarregando(false);   
                    setRepos(resJson);
                    // setRepos atualiza o estado do componente com os dados recebidos da API       

                },1000)
                
            })
            
            .catch(error => {
                console.error("erro ao buscar repositorio confirme o nome do usuario", error)
                setDeuErro(true);
                // setDeuErro atualiza o estado do componente para indicar que houve um erro ao
                // buscar os dados da API
                setEstaCarregando(false);
            })
    },[nomeUsuario])
    
    useEffect(() => {
                if(deuErro){
                    alert("Erro ao buscar repositórios. Verifique o nome do usuário.");
                }
            }, [deuErro]);
    
    return(
        <div className="container">  

            

            {estaCarregando ? (
                // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
                <h1>Carregando ...</h1>

            ):(  
                <ul className={styles.list}>
                    {/* O componente ReposList renderiza uma lista de repositórios do usuário */ }
                    {/* Cada repositório é exibido com seu nome, linguagem e um link para o GitHub */}
                    {/* O método map é usado para iterar sobre o array de repositórios e renderizar um item de lista para cada repositório */}
                    {/* A chave (key) é usada para ajudar o React a identificar quais itens mudaram, foram adicionados ou removidos */}
                    {/* O atributo target="_blank" é usado para abrir o link em uma nova aba do navegador */}
                    {/* O atributo rel="noopener noreferrer" é usado por motivos de segurança ao abrir links em uma nova aba */}
                    {repos.map(({ id, name, language, html_url}) => (
                        <li key={id} className={styles.listItem}>

                            <div className={styles.itemName}>
                                <b > Nome:</b> 
                                {name}
                            </div> 
                            <div className={styles.itemLanguage}>
                                <b >Linguagem:</b> 
                                {language}
                            </div>
                            <a className={styles.itemLink} target="_blank" href={html_url}> Vistar github</a>
                        </li>
                    ))}
                
                </ul>
            )}
            
        </div>
       
    )
}

export default ReposList;