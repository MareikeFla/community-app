import { useModal } from "@/lib/useModal";
import { notifySuccess, notifyError } from "@/lib/toasts";
import {
  DialogMessage,
  ButtonWrap,
  Button,
  Dialog,
  Backdrop,
} from "./ConfirmationModal.styled";

export const ConfirmationModal = () => {
  const { isVisible, modalContent, hideModal } = useModal();

  if (!isVisible) return null;
  const { message, textButtonCancel, textButtonConfirm, onConfirm } =
    modalContent;

  return (
    <>
      <Backdrop onClick={hideModal} />
      <Dialog>
        <DialogMessage>{message}</DialogMessage>
        <ButtonWrap>
          <Button onClick={hideModal}>{textButtonCancel}</Button>
          <Button
            className="primary"
            onClick={async () => {
              const success = await onConfirm();
              console.log(success);
              if (success === undefined) {
                return;
              }
              success
                ? notifySuccess("Erfolgreich!")
                : notifyError("Ein Fehler ist aufgetreten!");
            }}
          >
            {textButtonConfirm}
          </Button>
        </ButtonWrap>
      </Dialog>
    </>
  );
};
