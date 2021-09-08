import { ChangeEvent, useState } from "react";

export const useInput = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return { inputValue, handleInputChange };
};
