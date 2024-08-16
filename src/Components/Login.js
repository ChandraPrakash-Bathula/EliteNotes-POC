import React, { useRef } from "react";
import Header from "./Header";
import Cover from "../utils/Cover.jpg";
import { useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const dispatch = useDispatch();
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const handleButtonClick = () => {
    //Validation
    const message = checkValidData(
      email.current.value,
      password.current.value
      // name.current.value
    );
    setErrorMessage(message);

    if (message) return;

    //Sign in / sign up
    if (!isSignInForm) {
      //sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://media.licdn.com/dms/image/D4D0BAQEKvnbFXsF7cA/company-logo_100_100/0/1665577857098?e=1729123200&v=beta&t=iPjhkVZVbi2-rXQJAs44VsPd2dQGOpFzwvjZ6KjRc2M",
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message)
            });

          navigate("/browse");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
          // ..
        });
    } else {
      //sign in
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };
  return (
    <>
      <Header />
      <div className="absolute">
        <img src={Cover} alt="background-image" className="h-[154lvh] md:h-screen lg:h-screen object-cover w-screen" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute md:my-36 lg:my-36 my-36 mx-auto p-12 text-white bg-black rounded-lg md:w-6/12 lg:w-3/12 w-10/12 right-0 left-0 bg-opacity-80"
      >
        <h1 className="font-bold text-2xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-md"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded-md"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-md"
        />
        <p className="text-red-500 text-lg font-bold p-2">{errorMessage}</p>
        <p className="text-white md:text-sm lg:text-sm text-xs font-semibold p-1">Password must be (8) characters in length, contain (1) uppercase, (1) lowercase and 1 numeric.</p>
        <button
          className="p-4 my-6 bg-red-600 w-full rounded-md"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-6 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
           ? "New User ? Sign Up Now"
           : "Already an User ? Sign In Now."}
        </p>
      </form>
    </>
  );
};

export default Login;