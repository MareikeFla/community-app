import { Button } from "./CategoryTag.styled";

export default function CategoryTag({ category }) {
  return <Button color={category.color}>{category.title}</Button>;
}
