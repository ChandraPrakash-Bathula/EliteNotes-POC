import React, { useEffect, useState } from "react";
import image from "../utils/Logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFeaturesView } from "../utils/featureSlice";
import emailjs from "@emailjs/browser";

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
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);
  useEffect(() => {
    emailjs.init("id4rOGSRrVYfw-aho"); // Replace with your actual EmailJS user ID
  }, []);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    emailjs.sendForm("service_4xokop1", "template_ao747nk", event.target).then(
      () => {
        alert("Feedback sent successfully!");
        setFeedbackOpen(false); // Close the dialog
      },
      (err) => {
        alert("Failed to send feedback. Please try again.");
        console.error("Error:", err);
      }
    );
  };

  const handleFeatureSearch = () => {
    dispatch(toggleFeaturesView());
  };

  return (
    <div className="absolute flex justify-between px-8 w-screen py-2 z-10 bg-gray-800">
      {" "}
      {/* bg-gradient-to-b from-black */}
      {/* <img src={image} alt="logo" className="w-44"  onClick={handleFeatureSearch} /> */}
      <header className="py-4 bg-gray-800 text-white flex items-center px-4">
        <img
          className="w-12 h-12 rounded-sm mr-4"
          onClick={handleFeatureSearch}
          src={
            user?.photoURL
              ? user.photoURL
              : "https://media.licdn.com/dms/image/D4D0BAQEKvnbFXsF7cA/company-logo_100_100/0/1665577857098?e=1729123200&v=beta&t=iPjhkVZVbi2-rXQJAs44VsPd2dQGOpFzwvjZ6KjRc2M"
          }
          alt="userIcon"
        />
        <h1 className="lg:text-2xl md:text-2xl text-md font-serif">EliteNotes</h1>
      </header>
      <div>
        {/* Button to open the feedback dialog */}

        {/* Feedback Dialog Box */}
        {isFeedbackOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-gray-100 p-6 rounded-lg w-full md:w-1/3 mx-auto relative">
              {/* Close button */}
              <button
                onClick={() => setFeedbackOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none text-2xl"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-4">Feedback</h2>
              <form onSubmit={handleFormSubmit}>
                <label className="block text-gray-700 mb-2">
                  Name:
                  <input
                    type="text"
                    name="name"
                    required
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </label>
                <label className="block text-gray-700 mb-2">
                  Email:
                  <input
                    type="email"
                    name="email"
                    required
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </label>
                <label className="block text-gray-700 mb-4">
                  Feedback:
                  <textarea
                    name="message"
                    required
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </label>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {user && (
        <div className="flex p-2 md:text-sm lg:text-sm text-xs font-serif">
          <button
            onClick={() => setFeedbackOpen(true)}
            className="md:py-2 py-1 lg:py-2 px-4 bg-sky-600 text-white lg:mx-4 md:mx-4 mx-2 my-2 rounded-md"
          >
            Feedback!
          </button>
          <button
            className="py-2 px-4 bg-purple-500 text-white mx-4 my-2 rounded-md"
            onClick={handleFeatureSearch}
          >
            Features
          </button>
          {/* <img className="w-12 h-12" src={user?.photoURL} alt="userIcon" /> */}
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white p-1 m-1 h-12 w-24 mt-2 rounded-md"
          >
            Signout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;