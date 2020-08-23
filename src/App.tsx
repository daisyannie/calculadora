import React, { useState } from 'react';
import './App.css';

function App() {

  const [resultado, setResultado] = useState('');

  const vazio: string[] = [];
  const [comandos, setComandos] = useState(vazio);

  const [inputClass, setInputClass] = useState('input');
  
  interface teclas{
    id: string;
    label: string;
    tipo: string;
  }

  const botoes: Array<teclas> = [
    {id:'limpar', label: 'AC', tipo: 'limpar'},

    {id:'num0',label: '0', tipo: 'numero'},
    {id:'num1',label: '1', tipo: 'numero'},
    {id:'num2',label: '2', tipo: 'numero'},
    {id:'num3',label: '3', tipo: 'numero'},
    {id:'num4',label: '4', tipo: 'numero'},
    {id:'num5',label: '5', tipo: 'numero'},
    {id:'num6',label: '6', tipo: 'numero'},
    {id:'num7',label: '7', tipo: 'numero'},
    {id:'num8',label: '8', tipo: 'numero'},
    {id:'num9',label: '9', tipo: 'numero'},
    {id:'virgula',label: ',', tipo: 'numero'},

    {id:'soma',label: '+', tipo: 'operador'},
    {id:'subtrai',label: '-', tipo: 'operador'},
    {id:'multiplica',label: '*', tipo: 'operador'},
    {id:'divide',label: '/', tipo: 'operador'},    

    {id:'voltar',label: '<-', tipo: 'voltar'},

    {id:'abrePar',label: '(', tipo: 'operador'},
    {id:'fechaPar',label: ')', tipo: 'operador'},

    {id:'igual',label: '=', tipo: 'igual'}
  ]

  function calculaResultado(){
    try{
      const newResultado = eval(comandos.join(''));
      setResultado(newResultado);
      setComandos([newResultado]);
    }catch(error){      
      setInputClass('inputError')
      setResultado('ERROR');
      
      setTimeout(() => {
        limpaResultado()
        setInputClass('input')
      },700)
    }    
  }

  function limpaResultado(){
    setResultado("");
    setComandos([""]);
  }

  function apagaUltimoComando(){
    const newComandos = comandos;
    const ultimoComando = newComandos.pop();
    setComandos(newComandos);
    setResultado(newComandos.join(''));
  }

  function handleComandos(comando: string){    
    
    switch(comando){
      case '=':
        calculaResultado();
        break;
      case 'AC':
        limpaResultado();        
        break;
      case '<-':
        apagaUltimoComando();
        break;
      default:
        comando = comando.replace(',','.')
        const newComandos = [...comandos, comando];
        setComandos(newComandos);
    
        setResultado([...comandos, comando].join(''));        
    }    
  }

  return (
    <div className="container">
      <input type="text" className={inputClass} defaultValue={resultado} readOnly={true} maxLength={12}/>
      <div className="buttonsContainer">
        {botoes.map(botao => 
          <button 
            id={botao.id}
            className={botao.tipo}
            key={botao.id}
            style={{gridArea:botao.id}}
            onClick={() => handleComandos(`${botao.label}`)}
          >
            {botao.label}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
