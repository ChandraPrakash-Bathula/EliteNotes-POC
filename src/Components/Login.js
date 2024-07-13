import React from "react";
import Header from "./Header";
import Cover from "../utils/Cover.webp";

const Login = () => {
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={Cover} alt="background-image" className="w-screen h-1/2" />
      </div>
      <form className="absolute my-36 mx-auto p-12 text-white bg-black rounded-lg w-3/12 right-0 left-0 bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">Sign In</h1>
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-md"
        />
        <button className="p-4 my-6 bg-red-600 w-full rounded-md">
          Sign In
        </button>
        <p className='py-6'>New to EliteNotes? Sign Up Now</p>
      </form>
    </div>
  );
};

export default Login;
