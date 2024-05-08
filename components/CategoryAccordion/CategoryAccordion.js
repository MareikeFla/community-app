import { Subcategory } from "./CategoryAccordion.styled";
import { LinkCat } from "./CategoryAccordion.styled";
export default function CategoryAccordion({ subCategories, mainSlug }) {
  return (
    <ul>
      {subCategories.map((subCategory) => (
        <Subcategory key={subCategories}>
          <LinkCat href={`categories/${mainSlug}/${subCategory.subSlug}`}>
            {subCategory.title} <span>{subCategory.count} Events</span>
          </LinkCat>
        </Subcategory>
      ))}
    </ul>
  );
}
