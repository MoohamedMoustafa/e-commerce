import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigateUser = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    newPassword: Yup.string().required("Password is required"),
  });

  function handleNewPassword(values) {
    setIsLoading(true);
    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then((res) => {
        setIsLoading(false);
        console.log("respone from handleNewPassword", res);
        if (res.statusText === "OK") {
          toast.success("Password Reset Successfully");
          navigateUser("/login");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("error in ResetPassword: ", error);
        toast.error("failed to reset password");
      });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: handleNewPassword,
    validationSchema,
  });

  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-5 text-emerald-700">
        Reset Your Password
      </h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        {/* Email input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your Email
          </label>
        </div>
        {/* error msg */}
        {formik.errors.email && formik.touched.email && (
          <div
            className="p-4 mb-4 mt-[-20px]  text-sm text-red-800 rounded-lg bg-red-50 text-start"
            role="alert"
          >
            <span className="font-medium">{formik.errors.email}</span>
          </div>
        )}
        {/* Password input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="newPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your New Password
          </label>
        </div>
        {/* error msg */}
        {formik.errors.newPassword && formik.touched.newPassword && (
          <div
            className="p-4 mb-4 mt-[-20px]  text-sm text-red-800 rounded-lg bg-red-50 text-start"
            role="alert"
          >
            <span className="font-medium">{formik.errors.password}</span>
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
              "Submit"
            )}
          </button>
          
        </div>
      </form>
    </>
  );
}
