import React, { useEffect, useState } from "react";
import style from "./Navbar.module.css";

export default function Navbar() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);

  return (
    <>
      <h1>Navbar</h1>
    </>
  );
}
