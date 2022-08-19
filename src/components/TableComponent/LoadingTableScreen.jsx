import classes from "./LoadingTableScreen.module.css";

import Modal from "../UI/Modal";
import Card from "../UI/Card";
import logoLabin from "../../assets/logoLabin.png";

const ProgressBar = props => {
  const percentNow = Math.trunc((props.currentCount / props.numEquipes) * 100);

  return (
    <div className={classes["progress-bar--container"]}>
      <div
        className={classes["progress-bar--bar"]}
        style={{ width: `${percentNow}%` }}
      >
        <p className={classes["progress-bar--percent"]}>{percentNow}%</p>
      </div>
    </div>
  );
};

const CreatingTableScreen = ({ totalEquipes, count }) => {
  return (
    <Modal classNameOverlay={classes["creating-table-screen-container"]}>
      <Card className={classes["creating-table-screen--header"]}>
        <img src={logoLabin} alt="logo Labin01" />
        <div className={classes["creating-table-screen--header--text"]}>
          <p>
            Gerando os relatórios de estoque para <span>{totalEquipes}</span>{" "}
            equipes.
          </p>
          <p>
            Total de consultas concluídas <span>{count}</span>. Falta(m)
            <span> {totalEquipes - count}</span>.
          </p>
        </div>
      </Card>
      <Card>
        {<ProgressBar numEquipes={totalEquipes} currentCount={count} />}
      </Card>
    </Modal>
  );
};

export default CreatingTableScreen;
