import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { sharedContext } from "../../context/UserContext";
import { useGetProductsQuery } from "../../redux/rtk/baseApi";
// import { addProducts } from "../../redux/slices/productSlices";

const Products = () => {
  const {data, isFetching} = useGetProductsQuery();
  const [products, setProducts] = useState();
  const { user, refetchCart } = useContext(sharedContext);
  const [addCartProcessing, setAddCartProcessing] = useState(false);
  const dispatch = useDispatch()

  console.log(isFetching)
  
  // useEffect(() => {
  //   axios
  //     .get("https://simple-e-commerce-server.vercel.app/products")
  //     .then((res) => {
  //       if (res.data.success) {
  //         setProducts(res.data.products);
  //         dispatch(addProducts(res.data.products))
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("[Error]:", err)
  //     });
  // }, [dispatch]);

  const handleAddToCart = (productOriginal) => {
    setAddCartProcessing(productOriginal._id);
    const product = {...productOriginal}
    delete product._id;
    console.log(product);
    if (user?.email) {
      product["buyerEmail"] = user?.email;
      product["buyerName"] = user?.name;
      product["quantity"] = 1;
      axios
        .put(
          `https://simple-e-commerce-server.vercel.app/addto-cart/?email=${user?.email}`,
          product,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("Token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            refetchCart();
            setAddCartProcessing(false);
          }
        })
        .catch((err) => {
          console.error("[error:]", err);
          setAddCartProcessing(false);
        });
    } else {
      toast.error("Please Login to Purchase Product");
      setAddCartProcessing(false);
    }
  };
  return (
    <div className="w-full my-10">
      <h4 className="text-3xl font-semibold text-center">All Products</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 place-items-center px-5 md:px-10 xl:px-0">
        {
          products?.length > 0 ?
          products?.map((product, index) => (
            <div
              key={index}
              className="product max-w-full w-[350px] h-[520px] border border-gray-200 relative transition-all rounded-md p-3 hover:border-none hover:shadow-lg"
            >
              <img
                src={product.img}
                alt=""
                className="w-full h-[296px] rounded-md"
              />
              <div className="product-info my-4">
                <p className="product-name mt-2 text-xl font-semibold">
                  {product.name}
                </p>
                <p className="mt-2 text-lg">Price: ${product.price}</p>
                <p className="mt-2 text-lg">Seller: {product.seller}</p>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={addCartProcessing === product._id}
                className="btn-cart bg-[#FFE0B3] w-[92%] rounded-md flex items-center justify-center py-3 hover:bg-[#eccfa3] transition-all mr-3 mb-3 absolute bottom-0"
              >
                {
                  addCartProcessing === product._id? "loading...": <><p className="btn-text">Add to Cart</p>
                  <FaCartPlus className="w-4 h-4 ml-2"></FaCartPlus></>
                }
              </button>
            </div>
          ))
          :
          [1,2,3,4,5].map(item => (
            <div
              key={item}
              className="product max-w-full w-[350px] h-[520px] border border-gray-200 relative transition-all rounded-md p-3 hover:border-none hover:shadow-lg"
            >
              <div
                className="w-full h-[296px] rounded-md bg-gray-200 animate-pulse"
              />
              <div className="product-info my-4">
                <p className="product-name mt-2 text-xl font-semibold">
                  Product Name...
                </p>
                <p className="mt-2 text-lg">Price: ...</p>
                <p className="mt-2 text-lg">Seller: ...</p>
              </div>
              <button
                className="btn-cart bg-[#FFE0B3] w-[92%] rounded-md flex items-center justify-center py-3 hover:bg-[#eccfa3] transition-all mr-3 mb-3 absolute bottom-0"
              >
                <p className="btn-text">Add to Cart</p>
                  <FaCartPlus className="w-4 h-4 ml-2"></FaCartPlus>
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Products;
