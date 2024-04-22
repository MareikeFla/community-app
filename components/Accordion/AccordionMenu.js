import { AccordionWrap } from "./AccordionMenu.styled";
import AccordionSection from "./AccordionSection";
import { useState } from "react";

export default function AccordionMenu({ sections = [] }) {
  const initialAccordionSectionsIsOpen = {};
  sections.forEach(
    (section) => (initialAccordionSectionsIsOpen[section.id] = !!section.isOpen)
  );
  const [accordionSectionsIsOpen, setAccordionSectionsIsOpen] = useState(
    initialAccordionSectionsIsOpen
  );

  return (
    <AccordionWrap>
      {sections.map((section) => {
        const id = section.id;
        section.key = id;
        const isOpen = accordionSectionsIsOpen[id];

        return (
          <AccordionSection
            key={id}
            title={section.title}
            component={section.component}
            componentsProps={section.componentsProps}
            counter={section.counter}
            canOpen={section.canOpen}
            isHighlighted={section.isHighlighted}
            isOpen={isOpen}
            toggleIsOpen={() => {
              const newStateObject = { ...accordionSectionsIsOpen };
              newStateObject[id] = !isOpen;
              setAccordionSectionsIsOpen(newStateObject);
            }}
          />
        );
      })}
    </AccordionWrap>
  );
}
