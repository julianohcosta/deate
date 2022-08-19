import List from "./List";
import {useState} from "react";
import useHttp from "../hooks/useHttp";

const Deate = props => {

  const [selectedDeate, setSelectedDeate] = useState({codigo: '', nome: ''});

  const selectDeateHandler = (deate) => {
    setSelectedDeate(deate)
  }

  console.log(selectedDeate)

  return <List
    unidades={props.unidades}
    onDeateClick={selectDeateHandler}
  />;
};
export default Deate;
