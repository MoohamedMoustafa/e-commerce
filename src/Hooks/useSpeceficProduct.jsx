import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useSpeceficProduct( id ) {
  async function getSpeceficProduct() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      return response;
    } catch (err) {
      console.error("error from SpeceficProduct: ", err.message);
      throw new Error("fails to fetch Specefic product ", err.message);
    }
  }
  const speceficProductObject =
    useQuery({
      queryKey: ["speceficProduct", id],
      queryFn: getSpeceficProduct,
      retry: 4,
      retryDelay: 3000,
      select: (data) => data.data.data,
      enabled : Boolean(id),
    });
    return speceficProductObject;
}
