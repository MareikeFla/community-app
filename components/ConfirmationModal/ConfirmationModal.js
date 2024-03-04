import React from "react";
import {
  Dialog,
  DialogMessage,
  ButtonWrap,
  Button,
} from "./ConfirmationModal.styled";

const ConfirmationModal = React.forwardRef(({ modalInfo }, ref) => {
  const { message, textButtonClose, textButtonConfirm, onClose, onConfirm } =
    modalInfo;

  return (
    <Dialog ref={ref}>
      <DialogMessage>{message}</DialogMessage>
      <ButtonWrap>
        <Button onClick={onClose}>{textButtonClose}</Button>
        <Button className="primary" onClick={onConfirm}>
          {textButtonConfirm}
        </Button>
      </ButtonWrap>
    </Dialog>
  );
});

ConfirmationModal.displayName = "ConfirmationModal";

export default ConfirmationModal;
