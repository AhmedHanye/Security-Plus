import { useEffect } from "react";

const Title = (text: string) => {
  useEffect(() => {
    document.title = "Security Plus: " + text;
  }, [text]);
};

export default Title;
