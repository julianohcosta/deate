import classes from "./Modal.module.css";
import React from "react";
import ReactDOM from "react-dom";

const portalElement = document.getElementById("overlays");

const Backdrop = props => {
  return (
    <div
      className={`${classes.backdrop} ${props.className}`}
      onClick={props.onClose}
    />
  );
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
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop
          className={props.classNameBackdrop}
          onClose={props.onClose}
        />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay className={props.classNameOverlay}>
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
