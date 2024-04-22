import {
  AccordionHeader,
  AccordionTitle,
  OpenArrow,
  AccordionBody,
  StyledArrow,
  Counter,
  TitleCounterWrap,
} from "./AccordionMenu.styled";

export default function AccordionSection({
  title = "",
  componentsProps,
  isOpen = false,
  toggleIsOpen,
  component: Component,
  counter,
  counterText,
  canOpen = true,
  isHighlighted = true,
}) {
  const hasCounter = counter !== undefined;

  return (
    <>
      <AccordionHeader
        $isOpen={isOpen}
        $isHighlighted={isHighlighted}
        onClick={() => canOpen && toggleIsOpen()}
      >
        <TitleCounterWrap>
          <AccordionTitle>{title}</AccordionTitle>
          {hasCounter && (
            <Counter>
              {counter}{" "}
              {counter === 1 ? counterText.singular : counterText.plural}
            </Counter>
          )}
        </TitleCounterWrap>
        <OpenArrow $isHighlighted={isHighlighted}>
          <StyledArrow
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            $isOpen={isOpen}
          >
            <path
              d="M2 12L7.07813 7.76819C7.55789 7.3684 7.55789 6.63154 7.07813 6.23175L2 1.99997"
              strokeWidth="2.4"
              strokeLinecap="round"
              stroke="var(--color_white)"
            />
          </StyledArrow>
        </OpenArrow>
      </AccordionHeader>
      <AccordionBody $isOpen={isOpen}>
        <Component {...componentsProps} />
      </AccordionBody>
    </>
  );
}
