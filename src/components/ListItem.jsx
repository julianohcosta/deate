import {useContext} from "react";
import SelectedDeateContext from "../context/selected-deate-context";
import classes from "./ListItem.module.css";

const ListItem = props => {

  const ctx = useContext(SelectedDeateContext);
  const unidade = props.unidade;
  const codigoUnidade = unidade["codigo"];
  const isSelected = ctx.codigo === codigoUnidade;

  return (
    <li
      key={codigoUnidade}
      className={classes.unidade}
      style={
        isSelected
          ? {
            backgroundColor: "#003399",
            color: "#fff",
            transform: "translateX(0.15em)",
            boxShadow: "-4px 0 12px rgba(110, 146, 212, 0.8)",
          }
          : {}
      }
      onClick={() => props.onDeateClick(unidade)}
    >
      {unidade["nome"]}
    </li>
  );
};
export default ListItem;
