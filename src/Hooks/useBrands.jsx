import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useBrands() {
  async function getAllBrands() {
    try {
      const response = axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      return response;
    } catch (error) {
      console.error("error from getAllBrands: ", error.message);
      throw new Error("fails to fetch Brands ", error.message);
    }
  }
  const allBrandsObject = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
    retry: 3,
    retryDelay: 3000,
    staleTime: 1000 * 120,
    select: (data) => data.data.data,
  });

  return allBrandsObject;
}
