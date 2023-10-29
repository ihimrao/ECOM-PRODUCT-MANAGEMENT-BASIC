import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
const Login: React.FC = () => {
  let navigate = useNavigate();

  const [register, setRegister] = useState(false);
  const handleLogin = (user: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: user.email,
      password: user.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://localhost:7000/${register ? "register" : "login"}User`,
      requestOptions as any
    )
      .then((response) => response.json())
      .then((result) => {
        if (register) {
          toast("Created Successfully");
        } else {
          localStorage.setItem("accessToken", result.token);
          navigate("/");
        }
      })
      .catch((error) => console.log("error", error));
  };
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = (values: any) => {
    handleLogin(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login & Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                onClick={() => setRegister(!register)}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                {register ? "Login" : "Create a new account"}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                {!register ? "Login" : "Register"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
