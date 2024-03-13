// Quick Guide for Using the Custom Modal Hook:

// 1. Import the useModal  in the component where the modal will be used

// 2. Initialize the modal hook within your component:
//    const { showModal, hideModal } = useModal();

// 3. Create an object for the modal content and control actions. For example:
//    const modalContent = {
//      message: "", // Message displayed in the modal
//      textButtonCancel: "", // Text for the cancel button
//      textButtonConfirm: "", // Text for the confirm button
//      onConfirm: function you want to call onConfirm }
//
//    3a. If you want to show a toast to the user after the onConfirm function is done and inform if action was successfull,
//        the function you are passing to onConfirm must return true or false. No toast will be shown if your functions return is undefined.

// 4. Displaying the Modal:
//    - To show the modal, use the showModal method with your modalContent object:
//      showModal(modalContent);

// Closing the Modal:
//    - The modal can be closed either by the user with the cancel button, clicking the backdrop, pressing ESC,
//      or programmatically using the hideModal method.

import { useContext, createContext, useState, useEffect } from "react";

// Create a Context for the modal. This will be used to provide and consume modal data.
const ModalContext = createContext();

// Custom Hook for using our modal context. This allows any component in our app to easily access the modal's state and control methods.
export const useModal = () => useContext(ModalContext);

// ModalProvider is a component that provides the modal context to its children in _app.
export const ModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Function to show the modal and set its content
  const showModal = ({
    message = "Bist du sicher?", // Default message
    textButtonCancel = "Abbrechen", // Default text for the cancel button
    textButtonConfirm = "Bestätigen", // Default text for the confirm button
    onConfirm,
  }) => {
    // This object will be set as modal context
    const content = {
      message,
      textButtonCancel,
      textButtonConfirm,
      // Manipulating the incomming onConfirm function to also hide the modal and returning onConfirms return.
      // Return value will be used to show a toast if the action was successfull or no toast if undefined.
      onConfirm: () => {
        const success = onConfirm();
        hideModal();
        return success;
      },
    };
    setModalContent(content);
    setIsVisible(true);
  };

  // Function to hide the modal and clear its content
  const hideModal = () => {
    setIsVisible(false);
    setModalContent(null);
  };

  // Effect hook to add and remove the event listener for the Esc key
  useEffect(() => {
    // Function to call hideModal if the Esc key is pressed
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        hideModal();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // The ModalProvider component rendering. It provides the modal state and control methods to its child components.
  return (
    <ModalContext.Provider
      value={{ isVisible, modalContent, showModal, hideModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
