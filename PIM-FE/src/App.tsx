import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EditProduct from "./components/custom/editProduct";
import Footer from "./components/custom/footer";
import Login from "./components/custom/login/login";
import Navbar from "./components/custom/navbar";
import NotFound from "./components/custom/notFound";
import ProductCard from "./components/custom/product";
import CreateProduct from "./components/custom/createProduct";
interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
}

function App() {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <>
      <Router>
        <Navbar />
        <div className="h-screen">
          <div>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProductCard />} />
              <Route
                path="/edit-product/:productId"
                element={<EditProduct />}
              />
               <Route
                path="/create-product"
                element={<CreateProduct />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
