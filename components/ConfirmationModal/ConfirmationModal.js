import { useModal } from "@/lib/useModal";
import { useRef } from "react";
import { notifySuccess, notifyError } from "@/lib/toasts";
import {
  DialogMessage,
  Dialog,
  Backdrop,
  ButtonWrap,
} from "./ConfirmationModal.styled";
import Button from "../Button/Button";
import { useEffect } from "react";

export const ConfirmationModal = () => {
  const { isVisible, modalContent, hideModal } = useModal();
  const cancelButtonRef = useRef(null); // Create a ref for the cancel button
  const confirmButtonRef = useRef(null); // Create a ref for the confirm button

  useEffect(() => {
    if (isVisible) {
      cancelButtonRef.current.focus();
    }
  }, [isVisible]);

  // Trap focus within the modal buttons
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Tab") {
        event.preventDefault(); // Prevent default tab behavior

        // If focus is on the cancel button, move to the confirm button, and vice versa
        if (document.activeElement === cancelButtonRef.current) {
          confirmButtonRef.current.focus();
        } else {
          cancelButtonRef.current.focus();
        }
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible]); // Depend on `isVisible` to add/remove the event listener

  if (!isVisible) return null;
  const { message, textButtonCancel, textButtonConfirm, onConfirm } =
    modalContent;

  return (
    <>
      <Backdrop onClick={hideModal} />
      <Dialog role="dialog" aria-modal="true">
        <DialogMessage aria-label="Modal Nachricht">{message}</DialogMessage>
        <ButtonWrap>
          <Button
            aria-label="Modal schließen"
            text={textButtonCancel}
            onClick={hideModal}
            ref={cancelButtonRef}
          />
          <Button
            aria-label="Modal bestätigen"
            text={textButtonConfirm}
            color="primary"
            onClick={async () => {
              const success = await onConfirm();
              if (success === undefined) {
                return;
              }
              success
                ? notifySuccess("Erfolgreich!")
                : notifyError("Ein Fehler ist aufgetreten!");
            }}
            ref={confirmButtonRef}
          />
        </ButtonWrap>
      </Dialog>
    </>
  );
};
