import List from "./List";
import {useState} from "react";
import useHttp from "../hooks/useHttp";

const Deate = props => {

  const [equipes, setEquipes] = useState([]);

  let url = '';

  const getEquipes = async (deate, url) => {
    const response = await fetch(url)
  }


  const selectDeateHandler = (deate) => {
    if (deate.codigo.includes('|')){
      url = `https://localhost:8443/ctx/run/DEATE - relatorios gerenciais - backend/equipesDeate?codigoDeate=${deate['codigo']}`
    } else {
      url = 'https://localhost:8443/ctx/run/DEATE - relatorios gerenciais - backend/equipesAPI?' +
        'unidade='
    }

    const equipes = getEquipes(deate, url);
  }

  console.log(equipes)

  return <List
    unidades={props.unidades}
    onDeateClick={selectDeateHandler}
  />;
};
export default Deate;
