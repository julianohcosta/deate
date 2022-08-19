import ListItem from "./ListItem";
import classes from "./List.module.css"

const List = props => {


  return (
    <ul className={classes['lista-deates']}>
      {props.unidades?.map((unidade) => {
        return (
          <ListItem
            unidade={unidade}
            onDeateClick={props.onDeateClick}
          />
        );
      })}
    </ul>
  );
};
export default List