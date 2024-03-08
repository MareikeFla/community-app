import React from "react";
import {
  Dialog,
  DialogMessage,
  ButtonWrap,
  Button,
} from "./ConfirmationModal.styled";

export const ConfirmationModal = ({ modalInfo, modalRef }) => {
  const { message, textButtonClose, textButtonConfirm, onClose, onConfirm } =
    modalInfo;

  return (
    <Dialog ref={modalRef}>
      <DialogMessage>{message}</DialogMessage>
      <ButtonWrap>
        <Button onClick={onClose}>{textButtonClose}</Button>
        <Button className="primary" onClick={onConfirm}>
          {textButtonConfirm}
        </Button>
      </ButtonWrap>
    </Dialog>
  );
};
