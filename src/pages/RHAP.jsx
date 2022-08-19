import React, {useState} from "react";
import {EQUIPES} from "../assets/deates";
import RelatorioLayout from "../components/RelatorioLayout";

const RHAP = () => {
  const [disabled, setDisabled] = useState(false);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedEquipes, setSelectedEquipes] = useState([]);

  const selectedYearsHandler = (values) => {
      setSelectedYears( () => [...values])
  }

  const selectEquipeHandler = (values) => {
    setSelectedEquipes( () => [...values])
  }


  return (
    <>
      <RelatorioLayout
        disabled={disabled}
        equipes={EQUIPES}
        optionBarType={`rhap`}
        onSelectedYear={selectedYearsHandler}

        onSelectEquipes={selectEquipeHandler}
      />
    </>
  )
};

export default RHAP;