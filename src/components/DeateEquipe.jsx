import { Checkbox, Space } from "antd";
import { useState } from "react";
import classes from "./DeateEquipe.module.css";

const DeateEquipe = props => {
  const disabled = props.disabled && true;
  const equipes = props.equipes.map(equipe => equipe["nome"]);

  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < equipes.length);
    setCheckAll(list.length === equipes.length);
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? equipes : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);

    console.log(checkedList);
  };
  return (
    <Space direction={`vertical`}>
      <Checkbox
        indeterminate={indeterminate}
        disabled={disabled}
        checked={checkAll}
        onChange={onCheckAllChange}
      >
        Selecionar Tudo
      </Checkbox>
      {props.children}
      <Checkbox.Group
        className={classes["container-list"]}
        options={equipes}
        value={checkedList}
        onChange={onChange}
      />
    </Space>
  );
};
export default DeateEquipe;
