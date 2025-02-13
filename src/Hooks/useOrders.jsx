import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function useOrders() {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("UserToken");
    if (token) {
      const decoded = jwtDecode(token);
      console.log("decoded",JSON.stringify(decoded.id));
      setUserId(decoded.id);
    }
  }, []);

  async function getOrders() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      return response;
    } catch (err) {
      console.error("error from Orders: ", err.message);
      throw err;
    }
  }
  const ordersObject = useQuery({
    queryKey: ["orders", userId],
    queryFn: getOrders,
    select: (data) => data.data,
    enabled: Boolean(userId),
  });
  return ordersObject;
}
