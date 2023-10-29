import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "./productCard";
const ProductCardPage = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const accessToken = localStorage.getItem("accessToken");
  const handleDeleteMessage = () => {
    toast("Deleted Successfully");
    setTimeout(() => {
      fetchProducts();
    }, 200);
  };
  const fetchProducts = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("authorization", accessToken as string);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:7000/get-products", requestOptions as any)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  if (loading) {
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {new Array(24).fill(0).map((com) => (
            <Skeleton
              className="bg-slate-700"
              height={"224px"}
              width={"275px"}
            />
          ))}
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data?.data?.map((product: any, index: any) => (
          <ProductCard
            key={index}
            product={product}
            handleDeleteMessage={handleDeleteMessage}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCardPage;
