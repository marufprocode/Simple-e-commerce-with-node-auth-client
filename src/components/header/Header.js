import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { sharedContext } from "../../context/UserContext";
import NavLinks from "./NavLinks";

const Header = () => {
  const {user, setUser, cartItems} = useContext(sharedContext);  
  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('Token');
    toast.success('User Log Out Successfull');
  }

  const totalQuantity = cartItems.reduce((accumulator, object) => accumulator + object.quantity, 0);
  const totalPrice = cartItems.reduce((accumulator, object) => accumulator + (object.price*object.quantity), 0);

  return (
    <div>
      <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
          <a href="/#" className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <NavLinks/>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{totalQuantity}</span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">{totalQuantity} Items</span>
                <span className="text-info">Subtotal: ${totalPrice}</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          {
            user?.email &&
            <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="userImage"/>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="/#" className="justify-between">
                  {user?.name}
                  <span className="badge">Wlecome!</span>
                </a>
              </li>
              <li>
                <a href="/#">{user?.email}</a>
              </li>
              <li>
                <button onClick={handleSignOut}>Logout</button>
              </li>
            </ul>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
