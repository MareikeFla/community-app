import { useState } from "react";

export default useSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (event) => {};
  const handleSubmit = (event) => {};
};
