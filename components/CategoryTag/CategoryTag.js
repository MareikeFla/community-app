import { Button } from "./CategoryTag.styled";

export default function CategoryTag({ category }) {
  if (!category) {
    return;
  }

  return <Button color={category.color}>{category.title}</Button>;
}
