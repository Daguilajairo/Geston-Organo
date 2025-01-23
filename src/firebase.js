// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Sua configuração do Firebase (obtida no console do Firebase)
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

// Função para adicionar um colaborador ao Firestore
const adicionarColaborador = async (colaborador) => {
  try {
    await addDoc(collection(db, "colaboradores"), colaborador);
  } catch (e) {
    console.error("Erro ao adicionar colaborador: ", e);
  }
};

// Função para buscar todos os colaboradores do Firestore
const obterColaboradores = async () => {
  const querySnapshot = await getDocs(collection(db, "colaboradores"));
  const colaboradoresArray = querySnapshot.docs.map(doc => doc.data());
  return colaboradoresArray;
};

// Exportando as funções necessárias
export { db, addDoc, collection, getDocs, adicionarColaborador, obterColaboradores };
