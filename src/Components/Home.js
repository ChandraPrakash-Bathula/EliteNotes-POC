import React from "react";

const Home = () => {
  return (
    <>
    <div className="flex flex-col items-center pt-20">
    {/* <header className="w-full py-4 bg-gray-800 text-white text-center">
        <h1>Elite Notes</h1>
      </header> */}
      <div className="w-full max-w-6xl mt-8 px-2 py-4 border-2 border-gray-800">
      <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/reUZRyXxUs4?si=xX7U0xQU5Fsjvyc7"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <section className="max-w-5xl py-8 px-4 text-center">
        <h2 className="mb-4 text-2xl font-bold">About Elite Notes</h2>
        <p className="mb-4 text-lg">
          Elite Notes is a virtual assistant platform designed to help you
          manage your tasks, organize your notes, and enhance productivity. With
          Elite Notes, you can easily track your to-do lists, set reminders, and
          access your notes from anywhere at any time.
        </p>
        <p className="mb-4 text-lg">
          Our platform emphasizes the importance of efficiency, organization,
          and convenience. Whether you're a student, professional, or anyone
          needing a reliable assistant, Elite Notes is here to support you every
          step of the way.
        </p>
      </section>
    </div>
    </>
  );
};

export default Home;
