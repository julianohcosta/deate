import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const portalElement = document.getElementById("overlays");

const Backdrop = props => {
  return <div
    className={`${classes.backdrop} ${props.className}`}
    onClick={props.onClose}
  />;
};

const ModalOverlay = props => {
  return (
    <div className={`${classes.modal} ${props.className}`}>
      {props.children}
    </div>
  );
};

const Modal = props => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop
        className={props.className}
        onClose={props.onClose}/>, portalElement)}

      {ReactDOM.createPortal(<ModalOverlay
        className={props.className}>
        {props.children}
      </ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
