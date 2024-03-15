import { Button } from "./CategoryTag.styled";

export default function CategoryTag({ category }) {
  console.log(category);

  if (!category) {
    return;
  }

  return <Button color={category.color}>{category.title}</Button>;
}
