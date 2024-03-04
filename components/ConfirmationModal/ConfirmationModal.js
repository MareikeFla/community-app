import React from "react";
import {
  Dialog,
  DialogMessage,
  ButtonWrap,
  Button,
} from "./ConfirmationModal.styled";

export const ConfirmationModal = ({ modalInfo, hook }) => {
  const { message, textButtonClose, textButtonConfirm, onClose, onConfirm } =
    modalInfo;

  return (
    <Dialog ref={hook}>
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
