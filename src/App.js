import React, { useState, useEffect } from 'react';
import Banner from './componentes/Banner';
import Formulario from './componentes/Formulario';
import Time from './componentes/Time';
import Rodape from './componentes/Rodape';
import { adicionarColaborador, obterColaboradores } from './firebase';  // Importando as funções do Firebase

function App() {

  const times = [
  
    { nome: 'Front-End', corPrimaria: '#82cffa', corSecundaria: '#e8fbff' },
    { nome: 'UX e Design', corPrimaria: '#db6ebf', corSecundaria: '#fae9f5' },
    { nome: 'Back-end', corPrimaria: '#ffba05', corSecundaria: '#fff5d9' },
    { nome: 'Gestão', corPrimaria: '#ff8a29', corSecundaria: '#ffeedf' },
  ];

  const [colaboradores, setColaboradores] = useState([]);

  // Função para adicionar um novo colaborador
  const aoNovoColaboradorAdicionado = async (colaborador) => {
    // Adicionar o colaborador ao Firestore
    await adicionarColaborador(colaborador);
    
    // Atualizar o estado local para re-renderizar o componente
    setColaboradores([...colaboradores, colaborador]);
  }

  // Carregar os colaboradores ao iniciar o componente
  const carregarColaboradores = async () => {
    const colaboradoresDoFirestore = await obterColaboradores();
    setColaboradores(colaboradoresDoFirestore);
  }

  // Chama a função para carregar os colaboradores quando o componente é montado
  useEffect(() => {
    carregarColaboradores();
  }, []);

  return (
    <div className="App">
      <Banner />
      <Formulario 
        times={times.map(time => time.nome)} 
        aoColaboradorCadastrado={aoNovoColaboradorAdicionado} 
      />
      {times.map(time => (
        <Time 
          key={time.nome} 
          nome={time.nome} 
          corPrimaria={time.corPrimaria} 
          corSecundaria={time.corSecundaria}
          colaboradores={colaboradores.filter(colaborador => colaborador.time === time.nome)} 
        />
      ))}
      <Rodape/>
    </div>
  );
}

export default App;
