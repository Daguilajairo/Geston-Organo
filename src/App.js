import React, { useState, useEffect } from 'react';
import Banner from './componentes/Banner';
import Formulario from './componentes/Formulario';
import Time from './componentes/Time';
import Rodape from './componentes/Rodape';
import Login from './componentes/Login';  // Atualizando a importação para refletir o nome correto
import { adicionarColaborador, obterColaboradores } from './firebase';

function App() {
  const [colaboradores, setColaboradores] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);  // Estado para controlar o usuário logado

  const times = [
    { nome: 'Front-End', corPrimaria: '#82cffa', corSecundaria: '#e8fbff' },
    { nome: 'UX e Design', corPrimaria: '#db6ebf', corSecundaria: '#fae9f5' },
    { nome: 'Back-end', corPrimaria: '#ffba05', corSecundaria: '#fff5d9' },
    { nome: 'Gestão', corPrimaria: '#ff8a29', corSecundaria: '#ffeedf' },
  ];

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

  return (
    <div className="App">
      <Banner />
      {!usuarioLogado ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <Formulario times={times.map(time => time.nome)} aoColaboradorCadastrado={aoNovoColaboradorAdicionado} />
          {times.map(time => (
            <Time
              key={time.nome}
              nome={time.nome}
              corPrimaria={time.corPrimaria}
              corSecundaria={time.corSecundaria}
              colaboradores={colaboradores.filter(colaborador => colaborador.time === time.nome)}
            />
          ))}
          <button className="sair-button" onClick={handleLogout}>Sair</button>
        </>
      )}
      <Rodape />
    </div>
  );
}

export default App;
