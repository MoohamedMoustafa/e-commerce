import React, { useEffect, useState } from "react";
import style from "./Footer.module.css";

export default function Footer() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);

  return (
    <>
       <nav className="bg-emerald-500 fixed bottom-0 left-0 right-0 text-white font-bold text-center p-2 ">
        Footer
      </nav>
    </>
  );
}
