import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import Translation from "./Translation";
import Transcription from "./Transcription";
import FileSummarizer from "./FileSummarizer";
import InformationRetrieval from "./InformationRetrieval";
import KeywordIdentifier from "./KeywordIdentifier";
import TextSummarization from "./TextSummarization";

const Body = () => {
  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/translation",
      element: <Translation />,
    },
    {
      path: "/transcription",
      element: <Transcription />,
    },
    {
      path: "/text-summary",
      element: <TextSummarization />,
    },
    {
      path: "/file-summarizer",
      element: <FileSummarizer />,
    },
    {
      path: "/info-retrieval",
      element: <InformationRetrieval />,
    },
    {
      path: "/keywords",
      element: <KeywordIdentifier />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
      } else {
        dispatch(removeUser());
      }
    });
  }, []);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
