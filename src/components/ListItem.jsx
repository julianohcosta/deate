import classes from './ListItem.module.css'

const ListItem = (props) => {
  const unidade = props.unidade;

  return (
    <li
      key={unidade['codigo']}
      className={classes.unidade}
      onClick={() => props.onDeateClick(unidade)}
    >
      {unidade['nome']}
    </li>
  )
}
export default ListItem