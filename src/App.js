import React, { useState, useEffect } from 'react';
import Banner from './componentes/Banner';
import Formulario from './componentes/Formulario';
import Time from './componentes/Time';
import Rodape from './componentes/Rodape';
import Login from './componentes/Login';
import { adicionarColaborador, obterColaboradores } from './firebase';
import { v4 as uuidv4 } from 'uuid';
uuidv4();


function App() {
  const [colaboradores, setColaboradores] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);  // Estado para controlar o usuário logado

  const [times, setTimes] = useState([

    {
      id: uuidv4(),
      nome: 'Front-End', corPrimaria: '#82cffa', corSecundaria: '#e8fbff'
    },
    {
      id: uuidv4(),
      nome: 'UX e Design', corPrimaria: '#db6ebf', corSecundaria: '#fae9f5'
    },
    {
      id: uuidv4(),
      nome: 'Back-end', corPrimaria: '#ffba05', corSecundaria: '#fff5d9'
    },
    {
      id: uuidv4(),
      nome: 'Gestão', corPrimaria: '#ff8a29', corSecundaria: '#ffeedf'
    },
  ]);

  const aoNovoColaboradorAdicionado = async (colaborador) => {
    await adicionarColaborador(colaborador);
    setColaboradores([...colaboradores, colaborador]);
  };

  const carregarColaboradores = async () => {
    const colaboradoresDoFirestore = await obterColaboradores();
    setColaboradores(colaboradoresDoFirestore);
  };

  const handleLoginSuccess = () => {
    setUsuarioLogado(true);  // Marca como logado
  };

  const handleLogout = () => {
    setUsuarioLogado(null);  // Marca como não logado
  };

  useEffect(() => {
    carregarColaboradores();
  }, []);


  function deletarColaborador(prop) {
    console.log('Deletando colaborador: ', prop);
  }

  function mudarCorDoTime(cor, nome) {
    setTimes(times.map(time => {
      if (time.nome === nome) {
        time.corSecundaria = cor;
      }
      return time;
    }))
  };

  function cadastrarTime(novoTime) {
    setTimes([...times, {...novoTime, id: uuidv4()}]);
  }

  return (
    <div className="App">
      <Banner />
      {!usuarioLogado ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <React.Fragment>
          <Formulario 
          cadastrarTime={cadastrarTime}
          times={times.map(time => time.nome)} aoColaboradorCadastrado={aoNovoColaboradorAdicionado} />
            
          {times.map(time => (
            <Time
              mudarCor={mudarCorDoTime}
              key={time.nome}
              nome={time.nome}
              corPrimaria={time.corPrimaria}
              corSecundaria={time.corSecundaria}
              colaboradores={colaboradores.filter(colaborador => colaborador.time === time.nome)}
              aoDeletar={deletarColaborador}  // Passando a função de deletar para o Time
            />
          ))}

          <button className="sair-button" onClick={handleLogout}>Sair</button>
        </React.Fragment>
      )}
      <Rodape />
    </div>
  );
}

export default App;
