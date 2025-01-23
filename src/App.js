import React, { useState, useEffect } from 'react';
import Banner from './componentes/Banner';
import Formulario from './componentes/Formulario';
import Time from './componentes/Time';
import Rodape from './componentes/Rodape';
import Login from './componentes/Login';
import { adicionarColaborador, obterColaboradores } from './firebase';

// Adicionando a variável demoMode, que será controlada pela variável de ambiente
const demoMode = process.env.REACT_APP_DEMO_MODE === 'true';

function App() {
  const [colaboradores, setColaboradores] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const times = [
    { nome: 'Front-End', corPrimaria: '#82cffa', corSecundaria: '#e8fbff' },
    { nome: 'UX e Design', corPrimaria: '#db6ebf', corSecundaria: '#fae9f5' },
    { nome: 'Back-end', corPrimaria: '#ffba05', corSecundaria: '#fff5d9' },
    { nome: 'Gestão', corPrimaria: '#ff8a29', corSecundaria: '#ffeedf' },
  ];

  const aoNovoColaboradorAdicionado = async (colaborador) => {
    if (demoMode) {
      alert("Modo demo: Não é possível adicionar colaboradores.");
      return;
    }
    await adicionarColaborador(colaborador);
    setColaboradores([...colaboradores, colaborador]);
  };

  const carregarColaboradores = async () => {
    const colaboradoresDoFirestore = await obterColaboradores();
    setColaboradores(colaboradoresDoFirestore);
  };

  const handleLoginSuccess = () => {
    setUsuarioLogado(true);
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
  };

  useEffect(() => {
    carregarColaboradores();
  }, []);

  return (
    <div className="App">
      <Banner />
      {demoMode || usuarioLogado ? (
        <div>
          <h2 className='modo-demo'>Esse é o modo Demo - Edição e cadastro disponivel no modo Funcional!</h2>
          {times.map((time) => (
            <Time
              key={time.nome}
              nome={time.nome}
              corPrimaria={time.corPrimaria}
              corSecundaria={time.corSecundaria}
              colaboradores={colaboradores.filter(
                (colaborador) => colaborador.time === time.nome
              )}
            />
          ))}
          {!demoMode && (
            <>
              <Formulario times={times.map((time) => time.nome)} aoColaboradorCadastrado={aoNovoColaboradorAdicionado} />
              <button className="sair-button" onClick={handleLogout}>Sair</button>
            </>
          )}
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
      <Rodape />
    </div>
  );
}

export default App;
