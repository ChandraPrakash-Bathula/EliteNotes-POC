// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {

//   return (
//     // <>
//     //   <div className="flex flex-col items-center pt-20">
//     //     {/* <header className="w-full py-4 bg-gray-800 text-white text-center">
//     //     <h1>Elite Notes</h1>
//     //   </header> */}
//     //     <div className="w-full max-w-6xl mt-8 px-2 py-4 border-2 border-gray-800">
//     //       <div
//     //         className="relative"
//     //         style={{ paddingBottom: "56.25%", height: 0 }}
//     //       >
//     //         <iframe
//     //           className="absolute top-0 left-0 w-full h-full"
//     //           width="560"
//     //           height="315"
//     //           src="https://www.youtube.com/embed/eAHat-QDizc?si=hjAl44ehaAed_Oe0"
//     //           title="YouTube video player"
//     //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//     //         ></iframe>
//     //       </div>
//     //     </div>
//     //     <section className="max-w-5xl py-8 px-4 text-center">
//     //       <h2 className="mb-4 text-2xl font-bold">About Elite Notes</h2>
//     //       <p className="mb-4 text-lg">
//     //         Elite Notes is a virtual assistant platform designed to help you
//     //         manage your tasks, organize your notes, and enhance productivity.
//     //         With Elite Notes, you can easily track your to-do lists, set
//     //         reminders, and access your notes from anywhere at any time.
//     //       </p>
//     //       <p className="mb-4 text-lg">
//     //         Our platform emphasizes the importance of efficiency, organization,
//     //         and convenience. Whether you're a student, professional, or anyone
//     //         needing a reliable assistant, Elite Notes is here to support you
//     //         every step of the way.
//     //       </p>
//     //     </section>
//     //   </div>
//     // </>
//     <div className="flex flex-col items-center pt-20">
//       {/* Header */}
//       <header className="w-full py-4 bg-gray-800 text-white text-center">
//         <h1 className="text-3xl font-bold">Elite Notes</h1>
//       </header>

//       {/* Video Section */}
//       <div className="w-full max-w-6xl mt-8 px-2 py-4 border-2 border-gray-800">
//         <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
//           <iframe
//             className="absolute top-0 left-0 w-full h-full"
//             width="560"
//             height="315"
//             src="https://www.youtube.com/embed/eAHat-QDizc?si=hjAl44ehaAed_Oe0"
//             title="YouTube video player"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           ></iframe>
//         </div>
//       </div>

//       {/* About Section */}
//       <section className="max-w-5xl py-8 px-4 text-center">
//         <h2 className="mb-4 text-2xl font-bold">About Elite Notes</h2>
//         <p className="mb-4 text-lg">
//           Elite Notes is a virtual assistant platform designed to help you
//           manage your tasks, organize your notes, and enhance productivity.
//           With Elite Notes, you can easily track your to-do lists, set
//           reminders, and access your notes from anywhere at any time.
//         </p>
//         <p className="mb-4 text-lg">
//           Our platform emphasizes the importance of efficiency, organization,
//           and convenience. Whether you're a student, professional, or anyone
//           needing a reliable assistant, Elite Notes is here to support you
//           every step of the way.
//         </p>
//       </section>

//       {/* Features Section */}
//       <section className="w-full max-w-6xl py-8 px-4">
//         <h2 className="mb-4 text-2xl font-bold text-center">Our Features</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <FeatureCard title="File Summarizer" description="Transform lengthy documents into concise summaries, saving you precious time and effort." link="/file-summarizer" />
//           <FeatureCard title="Text Summarization" description="Condense extensive text into digestible bites with our advanced summarization tools." link="/text-summarization" />
//           <FeatureCard title="Live Transcription" description="Experience real-time transcription that captures every word accurately and instantly." link="/live-transcription" />
//           <FeatureCard title="Video to Text Transcription" description="Convert your videos into text seamlessly, making content creation a breeze." link="/video-to-text" />
//           <FeatureCard title="Keywords Identifier" description="Extract crucial keywords from any document to highlight the essence of the content." link="/keywords-identifier" />
//           <FeatureCard title="Domain Specific Info Retrieval" description="Retrieve precise information tailored to your domain with unparalleled accuracy." link="/info-retrieval" />
//           <FeatureCard title="Language Translation" description="Break language barriers with effortless translations between Hindi, Marathi, and English." link="/translation" />
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="w-full bg-gray-800 text-white py-12 mt-8">
//         <div className="max-w-6xl mx-auto text-center">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">Contact Us</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <img src="/icons/phone.svg" alt="Phone" className="inline-block w-5 h-5 mr-2" />
//                   +1 234 567 890
//                 </li>
//                 <li>
//                   <img src="/icons/email.svg" alt="Email" className="inline-block w-5 h-5 mr-2" />
//                   support@elitenotes.com
//                 </li>
//                 <li>
//                   <img src="/icons/location.svg" alt="Location" className="inline-block w-5 h-5 mr-2" />
//                   123 Elite Street, Notes City, NT 45678
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-4">Follow Us</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
//                     <img src="/icons/facebook.svg" alt="Facebook" className="inline-block w-5 h-5 mr-2" />
//                     Facebook
//                   </a>
//                 </li>
//                 <li>
//                   <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
//                     <img src="/icons/twitter.svg" alt="Twitter" className="inline-block w-5 h-5 mr-2" />
//                     Twitter
//                   </a>
//                 </li>
//                 <li>
//                   <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
//                     <img src="/icons/linkedin.svg" alt="LinkedIn" className="inline-block w-5 h-5 mr-2" />
//                     LinkedIn
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-4">Company</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link to="/about" className="hover:underline">About Us</Link>
//                 </li>
//                 <li>
//                   <Link to="/careers" className="hover:underline">Careers</Link>
//                 </li>
//                 <li>
//                   <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-8">
//             <p>&copy; 2023 Elite Notes. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// const FeatureCard = ({ title, description, link }) => (
//   <div className="bg-white rounded-lg shadow-md p-6 text-center">
//     <h3 className="text-xl font-bold mb-2">{title}</h3>
//     <p className="mb-4">{description}</p>
//     <Link to={link} className="text-blue-500 hover:underline" >Learn More</Link>
//   </div>
// );

// export default Home;

import Dialog from "./Dialog";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Linkedin from "../utils/linkedin.png";
import Facebook from "../utils/facebook.png";
import Twitter from "../utils/twitter.png";
import Address from "../utils/address.svg";
import Phone from "../utils/phone.svg";
import Email from "../utils/mail.svg";

const Home = () => {
  const [dialogContent, setDialogContent] = useState(null);

  const features = [
    {
      title: "File Summarizer",
      description:
        "Transform lengthy documents into concise summaries, saving you precious time and effort.",
      details: `
      The File Summarizer helps you quickly understand the main points of large documents by generating concise summaries. It's perfect for students and professionals in finance, banking, development, and supply chain who need to digest information quickly.`,
      useCases: [
        {
          title: "Researchers",
          description:
            "Summarize academic papers and research reports to quickly identify key findings.",
        },
        {
          title: "Students",
          description:
            "Condense textbook chapters or lecture notes to review essential information before exams.",
        },
        {
          title: "Professionals",
          description:
            "Summarize lengthy business reports, project documents, and meeting notes to extract crucial insights.",
        },
      ],
      leverage: [
        "Upload your document in any supported format, and let our advanced summarization algorithms extract the key points.",
        "Use the summaries to create quick reference guides, study aids, or executive summaries for reports.",
        "Save time and increase productivity by focusing only on the most relevant information.",
      ],
    },
    {
      title: "Text Summarization",
      description:
        "Condense extensive text into digestible bites with our advanced summarization tools.",
      details: `
      Our Text Summarization tool is designed to help you break down long pieces of text into shorter, more manageable segments. This is ideal for students and professionals in finance, banking, development, and supply chain who need to summarize articles, books, and other texts for their audience.`,
      useCases: [
        {
          title: "Writers",
          description:
            "Summarize research materials or drafts to create concise outlines for articles or books.",
        },
        {
          title: "Students",
          description:
            "Condense lengthy chapters or lecture notes for easier review.",
        },
        {
          title: "Professionals",
          description:
            "Generate brief summaries of reports, emails, or other documents to quickly grasp the content.",
        },
      ],
      leverage: [
        "Paste your text into the tool, and our AI-powered algorithms will generate a concise summary.",
        "Use the summaries to create abstracts, teaser content, or key points for presentations.",
        "Enhance readability and comprehension by providing easy-to-digest content.",
      ],
    },
    {
      title: "Live Transcription",
      description:
        "Experience real-time transcription that captures every word accurately and instantly.",
      details: `
      Live Transcription offers real-time conversion of spoken language into written text. This feature is invaluable for meetings, classes, and events, ensuring no word is missed even with voice connection difficulties.`,
      useCases: [
        {
          title: "Students",
          description:
            "Transcribe lectures in real-time for better understanding and note-taking.",
        },
        {
          title: "Professionals",
          description:
            "Capture every detail during meetings or conference calls for accurate minutes.",
        },
        {
          title: "Event Organizers",
          description:
            "Provide real-time transcription for webinars, seminars, and live events to enhance accessibility.",
        },
      ],
      leverage: [
        "Start the live transcription tool during your event, and watch as spoken words are instantly converted into text.",
        "Use the transcriptions to create detailed notes, summaries, or accessible content for your audience.",
        "Ensure accuracy and inclusivity by providing real-time captions and transcriptions.",
      ],
    },
    {
      title: "Video to Text Transcription",
      description:
        "Convert your videos into text seamlessly, making content creation a breeze.",
      details: `
      Video to Text Transcription converts video dialogue into written text, simplifying content creation and accessibility. Ideal for educators, content creators, and businesses who want to repurpose video content or make it accessible to a wider audience.`,
      useCases: [
        {
          title: "YouTubers",
          description:
            "Transcribe video content to create subtitles, descriptions, and transcripts for SEO.",
        },
        {
          title: "Content Creators",
          description:
            "Convert video tutorials into text guides or blog posts.",
        },
        {
          title: "Educators",
          description:
            "Provide transcripts of lectures and educational videos for students to review.",
        },
      ],
      leverage: [
        "Upload your video, and our tool will automatically transcribe the audio into text.",
        "Use the text to create subtitles, detailed notes, or accessible content for your audience.",
        "Enhance engagement and reach by making your video content searchable and accessible.",
      ],
    },
    {
      title: "Keywords Identifier",
      description:
        "Extract crucial keywords from any document to highlight the essence of the content.",
      details: `
      The Keywords Identifier helps you pinpoint the most important terms in a document, making it easier to understand the core topics. This is especially useful for SEO specialists, researchers, and marketers looking to optimize content for search engines.`,
      useCases: [
        {
          title: "SEO Specialists",
          description:
            "Identify key terms to optimize website content for search engines.",
        },
        {
          title: "Researchers",
          description:
            "Highlight important terms in academic papers or research articles.",
        },
        {
          title: "Marketers",
          description:
            "Extract key phrases from market research reports or customer feedback to inform strategies.",
        },
      ],
      leverage: [
        "Upload your document, and our tool will analyze the text to extract the most relevant keywords.",
        "Use the keywords to enhance SEO, create targeted content, or summarize main points for reports.",
        "Improve content visibility and understanding by focusing on the most significant terms.",
      ],
    },
    {
      title: "Domain Specific Info Retrieval",
      description:
        "Retrieve precise information tailored to your domain with unparalleled accuracy.",
      details: `
      Domain Specific Information Retrieval allows you to get accurate, relevant information specific to your field. Whether you're in finance, banking, development, or supply chain, this tool helps you find the data you need quickly and efficiently.`,
      useCases: [
        {
          title: "Finance",
          description:
            "Access financial reports, market analysis, and economic forecasts.",
        },
        {
          title: "Banking",
          description: "Retrieve detailed banking information and analysis.",
        },
        {
          title: "Development",
          description:
            "Find technical documents, product specifications, and industry trends.",
        },
        {
          title: "Supply Chain",
          description: "Access detailed logistics and supply chain reports.",
        },
      ],
      leverage: [
        "Enter your query, and our tool will search through domain-specific databases to find the most relevant information.",
        "Use the retrieved data to make informed decisions, support research, or create detailed reports.",
        "Enhance productivity and accuracy by accessing information tailored to your specific needs.",
      ],
    },
    {
      title: "Language Translation",
      description:
        "Break language barriers with effortless translations between Hindi, Marathi, and English.",
      details: `
      Our Language Translation feature provides seamless translation between Hindi, Marathi, and English. It's perfect for businesses, educators, and travelers who need accurate translations to communicate effectively across different languages.`,
      useCases: [
        {
          title: "Businesses",
          description:
            "Translate documents, emails, and marketing materials to reach a broader audience.",
        },
        {
          title: "Educators",
          description:
            "Provide translations of educational materials to support multilingual students.",
        },
        {
          title: "Travelers",
          description:
            "Translate travel guides, menus, and local information for better navigation.",
        },
      ],
      leverage: [
        "Enter the text you need translated, and our tool will provide an accurate translation in your desired language.",
        "Use the translations to create multilingual content, communicate with diverse audiences, or enhance learning materials.",
        "Break language barriers and promote inclusivity by providing content in multiple languages.",
      ],
    },
  ];

  const openDialog = (feature) => {
    setDialogContent(
      <div>
        <h2 className="text-lg lg:text-xl md:text-xl font-bold mb-4 flex justify-center">
          {feature.title}
        </h2>
        <p className="mb-4 whitespace-pre-line">{feature.details}</p>
        <div className="text-left">
          <h3 className="text-xl font-bold mb-2">Use Cases:</h3>
          <ul className="list-disc list-inside mb-4">
            {feature.useCases.map((useCase, index) => (
              <li key={index} className="mb-2">
                <strong>{useCase.title}:</strong> {useCase.description}
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-bold mb-2">How to Leverage:</h3>
          <ul className="list-disc list-inside">
            {feature.leverage.map((item, index) => (
              <li key={index} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
    <div className="flex flex-col items-center pt-48 lg:pt-28 md:pt-28 w-screen bg-rose-300">
      {/* Header */}
      {/* <header className="w-full py-4 bg-gray-800 text-white text-center">
        <h1 className="text-3xl font-bold">Elite Notes</h1>
      </header> */}

      {/* Video Section */}
      <div className="w-10/12 h-[535px] max-w-6xl mt-8 px-4 py-4 rounded-md border-2 border-gray-800">
        <div
          className="relative pb-[56.25%]"
        >
         <iframe
            className="absolute top-0 left-0 w-full h-[500px] rounded-md"
            width="450"
            height="275"
           src="https://www.youtube.com/embed/reUZRyXxUs4?si=A9TpzBKJ3GqmUigA"
           title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>

      {/* About Section */}
      <section className="max-w-5xl py-8 px-4 text-center">
        {/* <h2 className="mb-4 text-2xl font-bold">About Elite Notes</h2>
        <p className="mb-4 text-lg">
          Elite Notes is a virtual assistant platform designed to help you
          manage your tasks, organize your notes, and enhance productivity.
          With Elite Notes, you can easily track your to-do lists, set
          reminders, and access your notes from anywhere at any time.
        </p>
        <p className="mb-4 text-lg">
          Our platform emphasizes the importance of efficiency, organization,
          and convenience. Whether you're a student, professional, or anyone
          needing a reliable assistant, Elite Notes is here to support you
          every step of the way.
        </p> */}
        <h2 className="mb-4 text-xl lg:text-2xl md:text-2xl font-bold">About Elite Notes</h2>
        <p className="mb-4 text-sm lg:text-lg md:text-lg text-justify">
          Elite Notes is a cutting-edge virtual assistant platform designed to
          break down complex tasks, eliminate repetitive processes, and
          significantly reduce the time spent on manual activities. Our platform
          helps you streamline your workflow, enhance productivity, and focus on
          what truly matters.
        </p>
        <p className="mb-4 text-sm lg:text-lg md:text-lg text-justify">
          With Elite Notes, you can efficiently manage your tasks, summarize
          lengthy documents, transcribe live meetings, translate languages in
          real-time, and retrieve crucial information specific to your domain.
          Whether you're a student, professional, or business, Elite Notes is
          here to support you every step of the way by simplifying your daily
          tasks and boosting your efficiency.
        </p>
      </section>
      {/* Features Section */}
      <section className="w-full max-w-6xl pt-2 pb-8 px-4">
        <h2 className="mb-4 text-2xl font-bold text-center">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              openDialog={openDialog}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-screen bg-gray-800 text-white py-12 mt-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li>
                  <img
                    src={Phone}
                    alt="Phone"
                    className="inline-block w-5 h-5 mr-2"
                  />
                  +91 77018 15890
                </li>
                <li>
                  <img
                    src={Email}
                    alt="Email"
                    className="inline-block w-5 h-5 mr-2"
                  />
                  workingonmymindset@gmail.com
                </li>
                <li>
                  <img
                    src={Address}
                    alt="Location"
                    className="inline-block w-5 h-5 mr-2"
                  />
                  Gurugram, Haryana 122001, INDIA
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <ul className="space-y-2 md:pl-32 lg:pl-32 pl-40">
                <li>
                  <a
                    href="https://www.linkedin.com/company/elitenotes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <img
                      src={Facebook}
                      alt="Facebook"
                      className="inline-block w-5 h-5 mr-2"
                    />
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/elitenotes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <img
                      src={Twitter}
                      alt="Twitter"
                      className="inline-block w-5 h-5 mr-2"
                    />
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/elitenotes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <img
                      src={Linkedin}
                      alt="LinkedIn"
                      className="inline-block w-5 h-5 mr-2"
                    />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.linkedin.com/company/elitenotes"
                    className="hover:underline"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/elitenotes"
                    className="hover:underline"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/elitenotes"
                    className="hover:underline"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <p>&copy; 2023 Elite Notes. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Dialog Box */}
      {dialogContent && (
        <Dialog
          isOpen={Boolean(dialogContent)}
          onClose={() => setDialogContent(null)}
          title="Feature Details"
        >
          {dialogContent}
        </Dialog>
      )}
    </div>
    </>
  );
};

const FeatureCard = ({ feature, openDialog }) => (
  <div className="bg-white rounded-lg shadow-md p-6 text-center">
    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
    <p className="mb-4 text-sm lg:text-sm md:text-sm text-balance">{feature.description}</p>
    <button
      onClick={() => openDialog(feature)}
      className="text-blue-500 hover:underline"
    >
      Learn More
    </button>
  </div>
);

export default Home;