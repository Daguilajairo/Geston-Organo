import { loginComEmailESenha } from '../../firebase'; // Importa a função correta para login
import React, { useState } from 'react';
import './Login.css';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroLogin, setErroLogin] = useState('');  // Estado para mostrar erro de login, se houver

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Tentando fazer login...', email, senha); // Verifique os dados do login no console

    try {
      // Chama a função de login do Firebase
      await loginComEmailESenha(email, senha);
      console.log('Login bem-sucedido!');
      onLoginSuccess(); // Chama a função de sucesso ao fazer login
    } catch (error) {
      console.error('Erro no login:', error.message);
      setErroLogin('Email ou senha inválidos.');  // Exibe a mensagem de erro no estado
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {erroLogin && <p style={{ color: 'red' }}>{erroLogin}</p>} {/* Exibe o erro de login, se houver */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
