import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sharedContext } from "../context/UserContext";
import { addUser } from "../redux/slices/authSlice";

const Login = () => {
  const { signInError, setsignInError, /* user, */ setUser } =
    useContext(sharedContext);
  const [loginProcessing, setLoginProcessing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleUserSignIn = (e) => {
    setLoginProcessing(true);
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    axios
      .post("https://simple-e-commerce-server.vercel.app/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("Token", res.data.token);

          setUser(res.data.userData);
          dispatch(addUser(res.data))
          toast.success("User LoggedIn Successfully");
          setLoginProcessing(false);
          navigate("/");
        } else {
          setsignInError(res.data.message);
          toast.error(res.data.message);
          setLoginProcessing(false);
        }
      })
      .catch((err) => {
        console.error(["error:", err]);
        setLoginProcessing(false);
      });
  };

  return (
    <div className="md:flex min-h-screen mt-16 md:mt-0 justify-center md:items-center h-fit max-h-[500px] px-5 md:px-0">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-indigo-100 text-gray-700">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Login to your account
        </h2>
        <p className="text-sm text-center text-gray-600">
          Dont have account?
          <Link
            to="/signup"
            rel="noopener noreferrer"
            className="ml-1 focus:underline hover:underline"
          >
            Sign up here
          </Link>
        </p>
        <div className="my-6 space-y-4"></div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-gray-400" />
          <hr className="w-full text-gray-400" />
        </div>
        <form
          onSubmit={handleUserSignIn}
          action=""
          className="space-y-8 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Type your email here..."
                required
                className="w-full px-3 py-2 border rounded-md border-teal-700 bg-gray-100 text-gray-700 focus:border-violet-400"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <label
                  htmlFor="my-modal"
                  className="modal-button text-xs hover:underline text-gray-600 cursor-pointer"
                >
                  Forgot Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                required
                className="w-full px-3 py-2 border rounded-md border-teal-700 bg-gray-100 text-gray-700 focus:border-violet-400"
              />
            </div>
            {signInError && (
              <p className="text-red-500">Error: {signInError}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loginProcessing}
            className="w-full px-8 py-3 font-semibold rounded-md bg-indigo-400 hover:bg-indigo-500 transition-all text-gray-900 flex justify-center"
          >
            {loginProcessing ? (
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="26"
                visible={true}
              />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
