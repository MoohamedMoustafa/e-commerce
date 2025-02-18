import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ConfirmCode() {
  const [isLoading, setIsLoading] = useState(false);
  const navigateUser = useNavigate();

  

  function handleConfirmCode(values) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
      .then((res) => {
        setIsLoading(false);
        console.log("respone from handleComfirCode",res);

        if (res.data.status === "Success") {
          toast.success("Code Verified");
          navigateUser("/resetpassword");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("error in ConfirmCode: ", error);
        toast.error("Invalid Code");
      });
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handleConfirmCode,
  });

  return (
    <>

      <h1 className="text-center text-2xl font-bold mb-5 text-emerald-700">
        Please Enter The Code Sent To Your Email
      </h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        {/* Email input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="resetCode"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="resetCode"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Code
          </label>
        </div>
        


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
