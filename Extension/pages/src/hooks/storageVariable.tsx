import { useEffect, useState } from "react";

const useStorageVariable = ({
  key,
  defaultValue = null,
}: {
  key: string;
  defaultValue?: string | null;
}) => {
  const [state, setState] = useState<string | null>(
    localStorage.getItem(key) || defaultValue
  );

  const setValue = (value: string) => {
    localStorage.setItem(key, value);
    setState(value);
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        setState(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return { value: state, setValue };
};

export default useStorageVariable;
