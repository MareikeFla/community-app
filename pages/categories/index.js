import AccordionMenu from "@/components/Accordion/AccordionMenu";
import CategoryAccordion from "@/components/CategoryAccordion/CategoryAccordion";
import { CategoryAccordeonCardContainer } from "@/components/CategoryAccordion/CategoryAccordion.styled";
import { useData } from "@/lib/useData";
import Loading from "@/components/Loading/Loading";
import FetchingError from "@/components/FetchingError/FetchingError";

export default function CategoryOverview() {
  const { categories, isLoadingCategories, errorCategories } =
    useData().fetchedCategories;
  const { events, isLoadingEvents, errorEvents } = useData().fetchedEvents;

  if (isLoadingCategories || isLoadingEvents) {
    return <Loading />;
  }
  if (errorCategories || errorEvents) {
    return <FetchingError />;
  }

  // const array = [
  //   { mainCategory: "", subCategories: [{ title: "", id: "", count: "" }, {}] },
  //   {},
  // ];

  const categoriesAndSubcategories = categories.map((category) => {
    const subCategories = category.subCategories.map((subCategory) => {
      const count = events.filter((event) =>
        event.subCategories.includes(subCategory._id)
      ).length;
      return { title: subCategory.title, id: subCategory._id, count };
    });
    return { mainCategory: category.title, subCategories };
  });

  const sections = categoriesAndSubcategories.map((category, i) => {
    return {
      id: i,
      title: category.mainCategory,
      component: CategoryAccordion,
      componentsProps: { subCategories: category.subCategories || [] },
      counter: category.subCategories.length,
      counterText: { singular: "Unterkategorie", plural: "Unterkategorien" },
      canOpen: true,
      isHighlighted: true,
      isOpen: false,
    };
  });

  return (
    <CategoryAccordeonCardContainer>
      <h1>Themenübersicht</h1>
      <AccordionMenu sections={sections} />
    </CategoryAccordeonCardContainer>
  );
}
