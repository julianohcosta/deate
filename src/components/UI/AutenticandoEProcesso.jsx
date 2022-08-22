import classes from "./AutenticandoEProcesso.module.css";
import Modal from "./Modal";
import Card from "./Card";

const AutenticandoEProcesso = () => {
  return (
    <Modal classNameOverlay={classes.autenticando}>
      <Card className={classes["autenticando-card"]}>
        <div className={classes["scanner"]}>
          <h1 data-text="Autenticando no eProcesso...">
            Autenticando no eProcesso...
          </h1>
        </div>
      </Card>
    </Modal>
  );
};

export default AutenticandoEProcesso;
