import { ReplyButtonStyled } from "./ReplyButton.styled";

export default function ReplyButton({ text, onClick }) {
  return <ReplyButtonStyled onClick={onClick}>{text}</ReplyButtonStyled>;
}
