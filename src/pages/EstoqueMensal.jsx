import React from "react";

import classes from "./EstoqueMensal.module.css";

const EstoqueMensal = () => {
  return (
    <div className={classes["container-estoque"]}>
      <div className={classes["container-option-bar"]}>optionBar</div>
      <div className={classes["container-deate"]}>Deate</div>
      <div className={classes["container-equipes"]}>Equipes</div>
      <div className={classes["container-btn"]}>Button</div>
    </div>
  );
};

export default EstoqueMensal;
