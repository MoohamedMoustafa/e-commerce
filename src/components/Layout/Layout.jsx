import React, { useEffect, useState } from "react";
import style from "./Layout.module.css";

export default function Layout() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);

  return (
    <>
      <h1>Layout</h1>
    </>
  );
}
