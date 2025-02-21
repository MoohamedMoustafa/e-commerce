import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategories() {
  async function getCategories() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      return response;
    } catch (error) {
        console.error("error from getCategories: ", error.message);
        throw new Error("fails to fetch Categories ", error.message);
    }
  }

  const allCategoriesObject = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    retry: 3,
    retryDelay: 3000,
    staleTime: 1000 * 120,
    select: (data) => data.data.data,

  })
  return allCategoriesObject;
}
