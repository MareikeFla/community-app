import {
  FormDescriptionField,
  TextAreaContainer,
  TextAreaMirror,
} from "./EventForm.styled";
import { useEffect, useRef, useState } from "react";

export default function AutoResizingTextArea({ initialLongDescription }) {
  const [input, setInput] = useState(initialLongDescription);
  const [longDescription, setLongDescription] = useState(
    initialLongDescription
  );

  const [longDescriptionHeight, setLongDescriptionHeight] = useState("auto");
  const mirror = useRef();

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    const mirrorHeight = mirror.current.scrollHeight;
    const minHeight = 64; // 4rem
    const newHeight = mirrorHeight > minHeight ? mirrorHeight : minHeight;
    setLongDescriptionHeight(newHeight);
    setLongDescription(input);
  }, [mirror, input]);

  return (
    <TextAreaContainer $longDescriptionHeight={longDescriptionHeight}>
      <TextAreaMirror aria-hidden="true" ref={mirror}>
        {input + "\n"}
      </TextAreaMirror>
      <FormDescriptionField
        spellcheck="false"
        $longDescriptionHeight={longDescriptionHeight}
        className="auto-resizing-textarea"
        value={longDescription}
        onChange={handleChange}
        id="longDescription"
        name="longDescription"
        required
        aria-required="true"
      />
    </TextAreaContainer>
  );
}
