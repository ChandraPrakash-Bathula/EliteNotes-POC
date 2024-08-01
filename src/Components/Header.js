import React from "react";
import image from "../utils/Logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFeaturesView } from "../utils/featureSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleFeatureSearch = () => {
    dispatch(toggleFeaturesView());
  };

  return (
    <div className="absolute flex justify-between px-8 w-screen py-2 bg-gradient-to-b from-black z-10">
      <img src={image} alt="logo" className="w-44" />
      {user && (
        <div className="flex p-2">
          <button
            className="py-2 px-4 bg-purple-500 text-white mx-4 my-2 rounded-md"
            onClick={handleFeatureSearch}
          >
            GPT Search
          </button>
          <img className="w-12 h-12" src={user?.photoURL} alt="userIcon" />
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white font-bold p-1 m-1 rounded-md"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;