import React, { useEffect, useRef, useState } from "react";
import style from "./Brands.module.css";
import useBrands from "../../Hooks/useBrands";
import { ClipLoader } from "react-spinners";
import RelatedProducts from "../RelatedProducts/RelatedProducts";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const { data: brandsList, isLoading, isError, error } = useBrands();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const relatedProductRef = useRef(null);

  function handleBrandClick(brand) {
    setSelectedBrand(brand);
    setTimeout(() => {
      relatedProductRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }

  useEffect(() => {
    if (brandsList) {
      setBrands(brandsList);
    }
  }, [brandsList]);

  if (isLoading) {
    return (
      <>
        <div className="flex justify-center items-center min-h-screen w-full">
          <ClipLoader color={"green"} />
        </div>
      </>
    );
  }

  if (isError) {
    console.error("error from RecentProducts: ", error);
    return (
      <>
        <div
          class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
          role="alert"
        >
          <span class="font-medium">{error}</span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-5 text-green-700">Brands</h1>
        <div className="flex flex-wrap gap-6 justify-center">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="cursor-pointer border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 flex-1 min-w-[200px] max-w-[300px]"
              onClick={() => handleBrandClick(brand.name)}
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-40 object-contain"
              />
              <h2 className="p-3 text-lg font-semibold text-center">
                {brand.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div ref={relatedProductRef}>
        {selectedBrand && (
          <RelatedProducts filterType={"brand"} filterValue={selectedBrand} />
        )}
      </div>
    </>
  );
}
