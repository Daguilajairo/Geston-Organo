// Importando os módulos necessários do Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// Sua configuração do Firebase (pegue essas credenciais do seu Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDp78zwQ6Bq0ZiVjLtr3K6gmqS9tltrEhY",
  authDomain: "organo-geston.firebaseapp.com",
  projectId: "organo-geston",
  storageBucket: "organo-geston.firebasestorage.app",
  messagingSenderId: "21359577256",
  appId: "1:21359577256:web:e39c103b5262ba64eb9a9d"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Aqui obtemos a instância de autenticação
const db = getFirestore(app); // Aqui obtemos a instância do Firestore

// Funções para autenticação
const loginComEmailESenha = (email, senha) => {
  return signInWithEmailAndPassword(auth, email, senha);
};

const cadastrarUsuario = (email, senha) => {
  return createUserWithEmailAndPassword(auth, email, senha);
};

const sair = () => {
  return signOut(auth);
};

// Funções para Firestore (caso precise)
const adicionarColaborador = async (colaborador) => {
  const docRef = await addDoc(collection(db, "colaboradores"), colaborador);
  console.log("Colaborador adicionado com ID: ", docRef.id);
};

const obterColaboradores = async () => {
  const querySnapshot = await getDocs(collection(db, "colaboradores"));
  const colaboradores = [];
  querySnapshot.forEach((doc) => {
    colaboradores.push(doc.data());
  });
  return colaboradores;
};

// Exportando tudo o que é necessário
export { auth, loginComEmailESenha, cadastrarUsuario, sair, adicionarColaborador, obterColaboradores };
