import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { sharedContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { RotatingLines } from  'react-loader-spinner'

const SignUp = () => {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const {signUpError, setSignUpError} = useContext(sharedContext);
    const [signUpProcessing, setSignUpProcessing] = useState(false);
    const navigate = useNavigate();

    const handleCreateUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPass = e.target.confirmpass.value;
          if(!/(?=.*?[0-9])/.test(password)){
            setSignUpError('Password should Contain At least one digit');
            return;
          }
          if(password.length < 6){
            setSignUpError('Password length should be at least 6 character');
            return;
          }
          if (password !== confirmPass) {
            setSignUpError('Password Did Not Match')
            return;
          }
          const user = {
            name, email, password
          }
          setSignUpProcessing(true);
          axios.post('http://localhost:5000/create-user', user)
          .then(res => {
            if(res.data.success){
                toast.success(`${res.data.message}, Please Login Now`);
                setSignUpError(null);
                navigate('/login');
                setSignUpProcessing(false);
            }else{
                console.error(res.data.message);
                setSignUpError(res.data.message);
                setSignUpProcessing(false);
            }
          }).catch(err => {
            console.error('Error:', err);
            setSignUpProcessing(false);
          });
          e.target.reset();
    }
  return (
    <div className="flex justify-center items-center min-h-screen py-10 px-5 md:px-0 w-full">
      <div>
        <div className="flex shadow-xl flex-col py-6 px-5 md:px-10 rounded-md bg-indigo-100 text-gray-700 w-full max-w-lg">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
            <p className="text-sm text-gray-400">
              Sign up to to get our outstanding services
            </p>
          </div>
          <form
            onSubmit={handleCreateUser}
            action=""
            className="space-y-12 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Your Full Name..."
                  className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-200 text-gray-700"
                  onFocus={()=> setSignUpError(null)}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Your Email..."
                  className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-200 text-gray-700"
                />
              </div>
              <div className="relative">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    Password (should contain at least 1 digit and 6 character)
                  </label>
                </div>
                <input
                  required
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-200 text-gray-700"
                />
                <div
                  className="absolute right-4 bottom-3 cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="relative">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    Confirm Password
                  </label>
                </div>
                <input
                  required
                  type={showConfirmPass ? "text" : "password"}
                  name="confirmpass"
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-200 text-gray-700"
                />
                <div
                  className="absolute right-4 bottom-3 cursor-pointer"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                >
                  {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {signUpError && (
                <p className="text-red-500">Error: {signUpError}</p>
              )}
            </div>
            <div className="space-y-2">
              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900 hover:bg-violet-500 transition-all flex justify-center"
                  disabled={signUpProcessing}
                >
                  {
                    signUpProcessing? <RotatingLines 
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="26"
                      visible={true}
                    />
                    :"Sign Up"
                  }
                </button>
              </div>
              <p className="px-6 text-sm text-center text-gray-600">
                Already have an account?
                <Link
                  to="/login"
                  className="hover:underline text-violet-700 ml-1"
                >
                  Sign In
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
