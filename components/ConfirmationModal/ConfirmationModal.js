import React from "react";
import {
  Dialog,
  DialogMessage,
  ButtonWrap,
  Button,
} from "./ConfirmationModal.styled";
import { notifySuccess, notifyError } from "@/lib/toasts";

export const ConfirmationModal = ({ modalInfo, modalRef }) => {
  const { message, textButtonClose, textButtonConfirm, onClose, onConfirm } =
    modalInfo;

  return (
    <Dialog ref={modalRef}>
      <DialogMessage>{message}</DialogMessage>
      <ButtonWrap>
        <Button onClick={onClose}>{textButtonClose}</Button>
        <Button
          className="primary"
          onClick={async () => {
            (await onConfirm())
              ? notifySuccess("Erfolgreich!")
              : notifyError("Ein Fehler ist aufgetreten!");
          }}
        >
          {textButtonConfirm}
        </Button>
      </ButtonWrap>
    </Dialog>
  );
};
