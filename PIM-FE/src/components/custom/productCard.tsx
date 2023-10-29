import { useNavigate } from "react-router-dom";
const ProductCard = ({ product, handleDeleteMessage }) => {
  let navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const handleDelete = (id: string) => {
    var myHeaders = new Headers();
    myHeaders.append("authorization", accessToken as string);

    var raw = "";

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:7000/delete-product/${id}`, requestOptions as any)
      .then((response) => response.json())
      .then((result) => handleDeleteMessage())
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs m-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="mt-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <div className="inline-flex items-center space-x-2">
            <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
              {product.category}
            </span>
          </div>
        </div>
        <p className="text-gray-600">{product.description}</p>
        <div className="flex justify-between mt-10">
          <p className="text-blue-500 mt-2">INR: {product.price}</p>

          <div style={{ display: "flex", gap: "2px" }}>
            <button
              className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full cursor-pointer focus:outline-none hover:bg-blue-600"
              onClick={() => navigate("/edit-product/" + product._id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full cursor-pointer focus:outline-none hover:bg-red-600"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
