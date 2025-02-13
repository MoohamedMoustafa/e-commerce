import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'

export default function useOrders() {
    const userId = '678a78a5a036763e8b6db5a0';
    async function getOrders() {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
            return response;
        } catch (err) {
            console.error("error from Orders: ", err.message);
            return err;
        }
    }
    const ordersObject = useQuery({
        queryKey : ['orders'],
        queryFn : getOrders,
        select: (data) => data.data
    })
    return ordersObject;
}
