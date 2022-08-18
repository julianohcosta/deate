import React, {useState} from "react";
import {EQUIPES} from "../assets/deates";
import RelatorioLayout from "../components/RelatorioLayout";

const RHAP = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <RelatorioLayout
        disabled={disabled}
        equipes={EQUIPES}
      />
    </>
  )
};

export default RHAP;