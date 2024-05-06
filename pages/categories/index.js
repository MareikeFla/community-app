import AccordionMenu from "@/components/Accordion/AccordionMenu";
import CategoryAccordion from "@/components/CategoryAccordion/CategoryAccordion";
import { CategoryAccordeonCardContainer } from "@/components/CategoryAccordion/CategoryAccordion.styled";

export default function CategoryOverview() {
  const accordionSections = [
    {
      id: 0,
      title: "Kategorie 1",
      component: CategoryAccordion,
      componentsProps: "",
      counter: 1,
      counterText: { singular: "Unterkategorie", plural: "Unterkategorien" },
      canOpen: true,
      isHighlighted: false,
      isOpen: false,
    },
    {
      id: 1,
      title: "Kategorie 2",
      component: CategoryAccordion,
      componentsProps: "",
      counter: 1,
      counterText: { singular: "Unterkategorie", plural: "Unterkategorien" },
      canOpen: true,
      isHighlighted: false,
      isOpen: false,
    },
    {
      id: 2,
      title: "Kategorie 3",
      component: CategoryAccordion,
      componentsProps: "",
      counter: 1,
      counterText: { singular: "Unterkategorie", plural: "Unterkategorien" },
      canOpen: true,
      isHighlighted: false,
      isOpen: false,
    },
    {
      id: 3,
      title: "Kategorie 4",
      component: CategoryAccordion,
      componentsProps: "",
      counter: 1,
      counterText: { singular: "Unterkategorie", plural: "Unterkategorien" },
      canOpen: true,
      isHighlighted: false,
      isOpen: false,
    },
  ];
  return (
    <>
      <CategoryAccordeonCardContainer>
        <h1>Themenübersicht</h1>
        <AccordionMenu sections={accordionSections} />
      </CategoryAccordeonCardContainer>
    </>
  );
}
