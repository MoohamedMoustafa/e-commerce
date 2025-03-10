import React, { useEffect, useRef, useState } from "react";
import style from "./Categories.module.css";
import useCategories from "../../Hooks/useCategories";
import { ClipLoader } from "react-spinners";
import RelatedProducts from "../RelatedProducts/RelatedProducts";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: categoriesList, isLoading, isError, error } = useCategories();
  const relatedProductRef = useRef(null);
  useEffect(() => {
    if (categoriesList) {
      console.log("categoriesList: ", categoriesList);
      setCategories(categoriesList);
    }
  }, [categoriesList]);

  function handleCategoryClick(category) {
    setSelectedCategory(category);
    setTimeout(() => {
      relatedProductRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }

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
        <h1 className="text-2xl font-bold mb-5 text-green-700">Categories</h1>
        <div className="flex flex-wrap gap-6 justify-center">
          {categories.map((category) => (
            <div
              key={category._id}
              className="cursor-pointer border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 flex-1 min-w-[200px] max-w-[300px]"
              onClick={() => handleCategoryClick(category.name)}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-contain"
              />
              <h2 className="p-3 text-lg font-semibold text-center">
                {category.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div ref={relatedProductRef}>
        {selectedCategory && (
          <RelatedProducts
            filterType={"category"}
            filterValue={selectedCategory}
          />
        )}
      </div>
    </>
  );
}
