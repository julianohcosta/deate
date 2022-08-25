import React from "react";
// import { FiSearch } from "react-icons/fi";

const GlobalFilterComponent = ({filter, setFilter}) => {
  return (
    <>
      {/* <FiSearch /> */}
      <span>Pesquisar:</span>
      <input
        value={filter || ""}
        onChange={e => {
          // console.log(e.target.value);
          setFilter(e.target.value);
        }}
      />
    </>
  );
};

export default GlobalFilterComponent;
