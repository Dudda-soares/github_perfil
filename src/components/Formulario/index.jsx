import { use } from "react";
import { useState, useEffect } from "react";

const Formulario =()=>{
    //useState é um hook que permite adicionar o estado ao componente funcional
   const [notaA, setNotaA] = useState(0);
   const [notaB, setNotaB] = useState(0); 
    const [notaC, setNotaC] = useState(0);
    const [nome, setNome] = useState("");

    useEffect(() => {
        //useEffect é um hook que permite executar efeitos colaterais em componentes funcionais
        console.log("O componente foi montado ou atualizado");
    }, [notaA, notaB, notaC, nome]); // Dependências do efeito

    const alterarNome = (evento) =>{
        // setNome(evento.target.value);
        setNome (estadoAnterior => {
            return evento.target.value;
        })
    }
    //redenizaResultado é uma função que calcula a média e retorna um elemento JSX com o resultado
    const redenizaResultado = () => {
        const soma = parseFloat(notaA) + parseFloat(notaB) + parseFloat(notaC);
        const media = soma / 3;

        if(media >= 7){
            return(
                <p>Ola, {nome} Voce foi aprovado</p>
            )
        }else{
            return(
                <p>Ola, {nome}  Voce foi reprovado</p>
            )
        }
    }
   // O componente Formulario renderiza um formulário com três campos de entrada para notas e exibe o resultado da média
    // com base nas notas inseridas.
    return(
        <form>
            <ul>
                {/* O método map é usado para iterar sobre um array e renderizar uma lista de itens */}
                {/* Neste caso, ele está renderizando uma lista de itens numerados de 1 a 3 */}
                {/* Cada item da lista é renderizado como um elemento <li> com uma chave única */}
                {/* A chave é importante para ajudar o React a identificar quais itens mudaram, foram adicionados ou removidos */} 
                
                {[1, 2, 3].map((item => (
                    <li key={item}>Item {item}</li>
                )))}
            </ul>
            <input type="text" placeholder="Nome do Aluno" onChange={alterarNome} />
            <input type="number" placeholder="Nota Materia A" onChange={({target}) => setNotaA( target.value) } />
            <input type="number" placeholder="Nota Materia B" onChange={({target}) => setNotaB(target.value)}/>
            <input type="number" placeholder="Nota Materia C" onChange={({target}) => setNotaC(target.value)}/>
          {redenizaResultado()}
        </form>
    )
}

export default Formulario;