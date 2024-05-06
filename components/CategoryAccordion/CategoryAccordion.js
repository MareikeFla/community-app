import CategoryAccordionCard from "@/components/CategoryAccordionCard/CategoryAccordionCard";
import { useData } from "@/lib/useData";
export default function CategoryAccordion({ subCategories }) {
  return (
    <ul>
      {subCategories.map((scat) => (
        <li>
          {scat.title} {scat.count}
        </li>
      ))}
    </ul>
  );
}
