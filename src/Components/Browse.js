import React from "react";
import Header from "./Header";
import Home from "./Home";
import Features from "./Features";
import { useSelector } from "react-redux";

const Browse = () => {
  const showFeatureView = useSelector((store) => store.features.showFeatures);

  return (
    <div>
      <Header />
      {showFeatureView ? (
        <Features />
      ) : (
        <>
          <Home />
        </>
      )}
    </div>
  );
};

export default Browse;