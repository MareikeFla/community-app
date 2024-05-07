import { Subcategory } from "./CategoryAccordion.styled";
export default function CategoryAccordion({ subCategories }) {
  return (
    <ul>
      {subCategories.map((subCategory) => (
        <Subcategory>
          {subCategory.title} <span>{subCategory.count} Events</span>
        </Subcategory>
      ))}
    </ul>
  );
}
