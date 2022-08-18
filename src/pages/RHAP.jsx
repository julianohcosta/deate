import OptionBar from "../components/OptionBar";
import classes from "./EstoqueMensal.module.css";
import React, {useState} from "react";

import { EQUIPES } from '../assets/deates'
import DeateEquipe from "../components/DeateEquipe";

const RHAP = () => {

  const [disabled, setDisabled] = useState(false);

    return (
      <div className={classes["container-estoque"]}>
          <OptionBar
            disabled={disabled}
          />
          <div className={classes["container-equipes"]}>Equipes</div>
          <div className={classes["container-deate"]}>Deate</div>
          <div className={classes["container-btn"]}>Button</div>
        <DeateEquipe
          disabled={disabled}
          equipes={EQUIPES}
        />
      </div>
    )
};

export default RHAP;