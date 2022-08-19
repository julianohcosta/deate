import List from "./List";

const Deate = props => {

  return <List
    unidades={props.unidades}
    onDeateClick={deate => props.onSelectDeate(deate)}
  />;
};
export default Deate;
