import CategoryAccordionCard from "@/components/CategoryAccordionCard/CategoryAccordionCard";

export default function CategoryAccordion({ subCategories }) {
  return (
    <ul>
      {subCategories.map((subCategory) => (
        <li>
          {subCategory.title} {subCategory.count}
        </li>
      ))}
    </ul>
  );
}
