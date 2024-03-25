import { useState, useRef, useEffect } from "react";
import {
  Description,
  ExpandCollapseButton,
  DescriptionContainer,
} from "./EventDetail.styled";

export default function ExpandableText({ text }) {
  if (!text.length) {
    return null;
  }
  const COLLAPSED_TEXT_LENGTH = 500;

  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null); // Is used to get the container height for the css transition and as a hook to scoll to when shrinking
  const [containerHeight, setContainerHeight] = useState("auto");

  function toggleIsExpanded() {
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    // Reset containerHeight when changing isExpanded
    if (containerRef.current) {
      setContainerHeight(`${containerRef.current.scrollHeight}px`);
    }
    if (!isExpanded && containerRef.current) {
      // Smooth scroll to the top when collapsing
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [isExpanded]);

  return (
    <DescriptionContainer
      aria-expanded={isExpanded}
      ref={containerRef}
      $containerHeight={containerHeight}
    >
      <Description id="Event-Beschreibung">
        {isExpanded
          ? text + " "
          : text.substring(0, COLLAPSED_TEXT_LENGTH) + "... "}
        {text.length > COLLAPSED_TEXT_LENGTH && (
          <ExpandCollapseButton
            aria-controls="Event-Beschreibung"
            onClick={toggleIsExpanded}
          >
            {isExpanded ? "weniger" : "mehr"}
          </ExpandCollapseButton>
        )}
      </Description>
    </DescriptionContainer>
  );
}
