"use client";

import { useEffect, useState } from "react";

const useLocalStorage: any = (key) => {
  const [value, setValue] = useState({
    items: [],
    installation_services: [],
    total: {
      currency: "EUR",
      amount: 0,
    },
  });

  useEffect(() => {
    const data = localStorage.getItem(key);

    if (data) {
      setValue(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  return [value, setValue];
};

export default useLocalStorage;
