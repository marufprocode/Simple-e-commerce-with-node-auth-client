import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { sharedContext } from "../context/UserContext";

const CheckOut = () => {
  const { user, cartItems, refetchCart } = useContext(sharedContext);
  const [removeProcessing, setRemoveProcessing] = useState(false);

  const totalPrice = cartItems.reduce(
    (accumulator, object) => accumulator + object.price * object.quantity,
    0
  );

  const handleRemoveItem = (id) => {
    setRemoveProcessing(true);
    axios
      .delete(
        `https://simple-e-commerce-server.vercel.app/delete-cart-item/?email=${user?.email}&id=${id}`,
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
          setRemoveProcessing(false);
        }
      })
      .catch((err) => {
        console.error("[error:]", err);
        setRemoveProcessing(false);
      });
  };

  return (
    <>
      {cartItems?.length > 0 ? (
        <>
          <h3 className="text-2xl font-semibold p-6">Checkout {">>"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8 order-2 md:order-1 bg-gray-[#FFE0B3] p-5">
              {cartItems?.length > 0 &&
                cartItems?.map((item) => (
                  <div
                    className="review-item flex mb-5 border border-gray-300 rounded-lg w-full max-w-[570px] p-2"
                    key={item._id}
                  >
                    <div>
                      <img src={item.img} alt="" className="w-28 h-full" />
                    </div>
                    <div className="review-details-container flex w-full justify-between ml-4">
                      <div className="review-details">
                        <p>{item.name}</p>
                        <p>
                          <small>Price: ${item.price}</small>
                        </p>
                        <p>
                          <small>Quantity: {item.quantity}</small>
                        </p>
                        <p>
                          <small>
                            Total Price: ${item.price * item.quantity}
                          </small>
                        </p>
                      </div>
                      <div className="delete-container flex items-center">
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          disabled={removeProcessing}
                          className="btn-delete w-14 h-14 rounded-full bg-red-300 hover:bg-red-400 flex items-center justify-center"
                        >
                          <RiDeleteBin5Line className="delete-icon text-red-600 h-[60%] w-[60%]"></RiDeleteBin5Line>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="md:col-span-4 order-1 md:order-2 bg-gray-[#FFE0B3] mx-5">
              <div className="p-5 bg-gray-100 rounded-lg">
                <h4 className="text-xl font-semibold">Billing Information:</h4>
                <p>Name: {user?.name}</p>
                <p>Email: {user?.email}</p>
                <h4 className="text-xl font-semibold mt-5">Order Summary</h4>
                <p>Selected Items: {cartItems.length}</p>
                <p>Total price: ${totalPrice}</p>
                <p>Total Shipping: $10</p>
                <h5>Grand Total: ${totalPrice + 10}</h5>
                <button className="btn btn-success btn-sm mt-5">
                  Proceed to pay
                </button>
                {/* <button onClick={clearCart}>Clear Cart</button> */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-2xl text-center mt-10 font-semibold">
          <h3>
            No Cart Items Found,{" "}
            <Link to="/home" className="underline text-teal-700">
              Shop Now
            </Link>
          </h3>
        </div>
      )}
    </>
  );
};

export default CheckOut;
