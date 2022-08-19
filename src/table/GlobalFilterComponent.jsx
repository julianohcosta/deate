import React from "react";

const GlobalFilterComponent = ({ filter, setFilter }) => {
  return (
    <>
      Pesquisar:{" "}
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
