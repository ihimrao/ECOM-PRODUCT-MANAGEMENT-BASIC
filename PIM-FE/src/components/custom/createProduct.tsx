import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function CreateProduct() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const validationSchema = Yup.object().shape({
    category: Yup.string()
      .required("Category is required")
      .oneOf(
        ["Airbag", "Plastic Bag"],
        "Category must be Airbag or Plastic Bag"
      ),
    description: Yup.string().required("Description is required"),
    name: Yup.string().required("Name is required"),
    image: Yup.string().required("Image is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values: any) => {
    setIsLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("authorization", accessToken as string);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      category: values.category,
      description: values.description,
      name: values.name,
      price: values.price,
      image: values.image,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:7000/create-product", requestOptions as any)
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        toast("Created Successfully");
        navigate("/");
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
        <Formik
          initialValues={{
            category: "",
            description: "",
            name: "",
            price: "",
            image: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <Field
                as="select"
                name="category"
                id="category"
                className="w-full p-2 border rounded"
              >
                <option value="">Select Category</option>
                <option value="Airbag">Airbag</option>
                <option value="Plastic Bag">Plastic Bag</option>
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <Field
                type="text"
                name="description"
                id="description"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-600">
                Image url
              </label>
              <Field
                type="text"
                name="image"
                id="image"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-600">
                Price
              </label>
              <Field
                type="number"
                name="price"
                id="price"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500"
              />
            </div>
            <button
              type="submit"
              className={`${
                isLoading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white py-2 px-4 rounded relative`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 border-t-2 border-blue-600 border-r-2 border-b-2 border-transparent rounded-full"></div>
              ) : (
                "Create"
              )}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreateProduct;
