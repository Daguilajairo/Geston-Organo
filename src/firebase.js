// Importando as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
// Importando funções do Firestore para interagir com o banco de dados
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Configuração do Firebase (suas credenciais)
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
// Inicializando o Firestore
const db = getFirestore(app);

// Função para adicionar colaborador no Firestore
const adicionarColaborador = async (colaborador) => {
  try {
    await addDoc(collection(db, "colaboradores"), colaborador);
    console.log("Colaborador adicionado com sucesso!");
  } catch (e) {
    console.error("Erro ao adicionar colaborador: ", e);
  }
};

// Função para obter todos os colaboradores
const obterColaboradores = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "colaboradores"));
    const colaboradores = [];
    querySnapshot.forEach((doc) => {
      colaboradores.push({ ...doc.data(), id: doc.id });
    });
    return colaboradores;
  } catch (e) {
    console.error("Erro ao obter colaboradores: ", e);
  }
};

export { adicionarColaborador, obterColaboradores };
