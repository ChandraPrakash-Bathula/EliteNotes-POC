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
    <div className="absolute flex justify-between px-8 w-screen py-2 z-10 bg-gray-800">  {/* bg-gradient-to-b from-black */}
      {/* <img src={image} alt="logo" className="w-44"  onClick={handleFeatureSearch} /> */}
      <header className="py-4 bg-gray-800 text-white flex items-center px-4">
  <img className="w-12 h-12 rounded-sm mr-4" src={user?.photoURL ? user.photoURL : 'https://media.licdn.com/dms/image/D4D0BAQEKvnbFXsF7cA/company-logo_100_100/0/1665577857098?e=1729123200&v=beta&t=iPjhkVZVbi2-rXQJAs44VsPd2dQGOpFzwvjZ6KjRc2M'} alt="userIcon" />
  <h1 className="text-3xl ">Elite Notes</h1>
</header>

      {user && (
        <div className="flex p-2">
          <button
            className="py-2 px-4 bg-purple-500 text-white mx-4 my-2 rounded-md"
            onClick={handleFeatureSearch}
          >
            Features
          </button>
          {/* <img className="w-12 h-12" src={user?.photoURL} alt="userIcon" /> */}
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white font-bold p-1 m-1 h-12 w-24 mt-2 rounded-md"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;