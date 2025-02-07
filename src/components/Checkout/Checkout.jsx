import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { cartId } = location.state || {};
  const { checkout } = useContext(CartContext);
  useEffect(() => {
    console.log("cartId", cartId);
  }, []);

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(
        /^((\+[2][0])|0)?[1][0-25][0-9]{8}$/,
        "Please enter a valid Egyptian phone number"
      )
      .required("Phone number is required"),
    details: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () => handleCheckout(cartId, "http://localhost:5173/"),
    validationSchema,
  });
  
  async function handleCheckout(cartId, url,) {
    try {
      setIsLoading(true);
      const response = await checkout(cartId, url, formik.values);
      if(response.data.status === "success"){
        console.log(response);
        window.location.href = response.data.session.url
      }
      
    } catch (error) {
      console.error("error in checkout: ", error.message);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {/* {errorMsg && (
        <div className="lg:w-5/12 mx-auto bg-red-200 text-red-800 font-bold rounded-lg p-2 mb-2">
          {errorMsg}
        </div>
      )} */}
      <h1 className="text-center text-2xl font-bold mb-5 text-emerald-700">
        Checkout Now
      </h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        {/* Details input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your Detailed Address
          </label>
        </div>
        {/* error msg */}
        {formik.errors.details && formik.touched.details && (
          <div
            className="p-4 mb-4 mt-[-20px]  text-sm text-red-800 rounded-lg bg-red-50 text-start"
            role="alert"
          >
            <span className="font-medium">{formik.errors.details}</span>
          </div>
        )}
        {/* Phone input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your Phone
          </label>
        </div>
        {/* error msg */}
        {formik.errors.phone && formik.touched.phone && (
          <div
            className="p-4 mb-4 mt-[-20px]  text-sm text-red-800 rounded-lg bg-red-50 text-start"
            role="alert"
          >
            <span className="font-medium">{formik.errors.phone}</span>
          </div>
        )}

        {/* City input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your City
          </label>
        </div>
        {/* error msg */}
        {formik.errors.city && formik.touched.city && (
          <div
            className="p-4 mb-4 mt-[-20px]  text-sm text-red-800 rounded-lg bg-red-50 text-start"
            role="alert"
          >
            <span className="font-medium">{formik.errors.city}</span>
          </div>
        )}

        <div className="flex flex-col items-center gap-2">
          <button
            type="submit"
            className=" text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            disabled={isLoading}
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin" spin></i>
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
