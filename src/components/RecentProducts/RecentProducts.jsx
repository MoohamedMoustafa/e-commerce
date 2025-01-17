import React, { useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RecentProducts() {
  const [products, setProducts] = useState([]);

  function getAllProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((response) => {
        console.log(response.data.data);
        setProducts(response.data.data);
      })
      .catch();
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="row gap-y-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="md:w-1/6 px-2 ">
                <div className="product px-2 py-1">
              <Link to={`productdetails/${product.id}`}>
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full"
                  />
                  <h3 className=" text-emerald-600 mb-1">
                    {product.category.name}
                  </h3>
                  <h3 className="font-semibold mb-1">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-around mb-2">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
              </Link>
                  <button className="btn">Add To Cart</button>
                </div>
            </div>
          ))
        ) : (
          <>
            <div className="flex justify-center items-center min-h-screen w-full">
              <span className="loader"></span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
