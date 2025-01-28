import React, { useEffect } from "react";
import style from "./ProductCard.module.css";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <>
      <div key={product.id} className="md:w-1/6 px-2">
        <div className="product px-2 py-1">
          <Link to={`productdetails/${product.id}/${product.category?.name}`}>
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-full"
            />
            <h3 className="text-emerald-600 mb-1">{product.category?.name}</h3>
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
    </>
  );
}
