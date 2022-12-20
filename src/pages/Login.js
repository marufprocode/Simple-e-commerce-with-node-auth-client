import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { sharedContext } from '../context/UserContext';

const Login = () => {
    const {signInError, setsignInError} = useContext(sharedContext);

    const handleUserSignIn = () => {
        console.log('SignIn');
    }

    return (
        <div className='flex min-h-screen justify-center items-center'>
            <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-teal-100 text-gray-700">
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
            <div className="my-6 space-y-4">
            </div>
            <div className="flex items-center w-full my-4">
            <hr className="w-full text-gray-400" />
            <p className="px-3 text-gray-500">OR</p>
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
                    <label htmlFor="my-modal" className="modal-button text-xs hover:underline text-gray-600 cursor-pointer">
                        Forgot Password
                    </label>
                </div>
                    {/* <Modal/> */} 
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="*****"
                    required
                    className="w-full px-3 py-2 border rounded-md border-teal-700 bg-gray-100 text-gray-700 focus:border-violet-400"
                />
                </div>
                {
                    signInError && <p className="text-red-500">Error: {signInError}</p>
                }
            </div>
            <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-emerald-500 hover:bg-emerald-600 transition-all text-gray-900"
            >
                Sign in
            </button>
            </form>
        </div>
        </div>
    );
};

export default Login;