import { AccordionSection } from "./Accordion.styled";
import { AccordionTitle } from "./Accordion.styled";
import { Counter } from "./Accordion.styled";
import EventList from "../EventList/EventList";
import { PreviewWrap } from "./Accordion.styled";
export default function Accordion({ text, items, status, setStatus }) {
  const hasItems = items.length > 0;

  return (
    <>
      <AccordionSection
        $isOpen={status}
        $hasItems={hasItems}
        onClick={() => hasItems && setStatus(!status)}
      >
        <AccordionTitle $hasItems={hasItems}>{text}</AccordionTitle>
        <Counter $hasItems={hasItems}>{items.length}</Counter>
      </AccordionSection>
      <PreviewWrap $isOpen={status}>
        <EventList events={items} />
      </PreviewWrap>
    </>
  );
}
