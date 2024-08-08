// import { useRef, useState } from "react";
// import openai from "../utils/openai"; // Adjust the path as needed
// // import Header from "./Header";

// const InformationRetrieval = () => {
//   const inputQuery = useRef(null);
//   const [results, setResults] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [domain, setDomain] = useState("finance");
//   const [domainMessage, setDomainMessage] = useState("");

//   const handleSearchClick = async () => {
//     setLoading(true);
//     const query = inputQuery.current.value;

//     let gptQuery;
//     switch (domain) {
//       case "finance":
//         gptQuery = `This is a finance-related question: ${query}`;
//         setDomainMessage("The query belongs to the Finance domain.");
//         break;
//       case "banking":
//         gptQuery = `This is a banking-related question: ${query}`;
//         setDomainMessage("The query belongs to the Banking domain.");
//         break;
//       case "supply_chain":
//         gptQuery = `This is a supply chain-related question: ${query}`;
//         setDomainMessage("The query belongs to the Supply Chain domain.");
//         break;
//       case "development":
//         gptQuery = `This is a development-related question: ${query}`;
//         setDomainMessage("The query belongs to the Development domain.");
//         break;
//       default:
//         gptQuery = `This question does not fall under the specified domains: ${query}`;
//         setDomainMessage("The query is not in the specified domain range.");
//         setResults("The query is not in the domain range.");
//         setLoading(false);
//         return;
//     }

//     try {
//       const gptResults = await openai.chat.completions.create({
//         messages: [{ role: "user", content: gptQuery + "Don't give results for any other domains excluding banking, finance, development and supply chain. Incase of any other statement just say the query is out of domain. If there is no question is present and a domain is selected, just give a response with two relevant lines about the selected domain.option is selected in one domain and the query is from other domain, just make a response as select appropriate domain." }],
//         model: "gpt-3.5-turbo",
//       });

//       if (gptResults.choices[0]?.message?.content) {
//         setResults(gptResults.choices[0]?.message?.content);
//       } else {
//         setResults("Error in retrieving information.");
//       }
//     } catch (error) {
//       console.error("Error in retrieving information:", error);
//       setResults("Error in retrieving information.");
//     }
//     setLoading(false);
//   };

//   return (
//     <>
//     {/* <Header /> */}
//     <div className="bg-gray-100 rounded-md p-6">
//       <div className="pt-4 flex justify-center">
//         <form
//           className="bg-black w-full md:w-1/2 grid grid-cols-12 rounded-md"
//           onSubmit={(e) => e.preventDefault()}
//         >
//           <input
//             ref={inputQuery}
//             type="text"
//             className="p-4 m-4 col-span-12"
//             placeholder="Enter your search query"
//           />
//           <div className="col-span-12 flex justify-around">
//             <label className="p-2 m-2 bg-gray-200 rounded-lg">
//               <input
//                 type="radio"
//                 value="finance"
//                 checked={domain === "finance"}
//                 onChange={() => setDomain("finance")}
//               />
//               Finance
//             </label>
//             <label className="p-2 m-2 bg-gray-200 rounded-lg">
//               <input
//                 type="radio"
//                 value="banking"
//                 checked={domain === "banking"}
//                 onChange={() => setDomain("banking")}
//               />
//               Banking
//             </label>
//             <label className="p-2 m-2 bg-gray-200 rounded-lg">
//               <input
//                 type="radio"
//                 value="supply_chain"
//                 checked={domain === "supply_chain"}
//                 onChange={() => setDomain("supply_chain")}
//               />
//               Supply Chain
//             </label>
//             <label className="p-2 m-2 bg-gray-200 rounded-lg">
//               <input
//                 type="radio"
//                 value="development"
//                 checked={domain === "development"}
//                 onChange={() => setDomain("development")}
//               />
//               Development
//             </label>
//           </div>
//           <button
//             className="py-2 px-4 rounded-lg bg-red-600 text-white col-span-12 m-4"
//             onClick={handleSearchClick}
//             disabled={loading}
//           >
//             {loading ? "Searching..." : "Search"}
//           </button>
//         </form>
//       </div>
//       <div className="pt-4 flex justify-center">
//         <div className="bg-white w-full md:w-1/2 p-4 rounded-lg shadow-lg  max-h-32 overflow-y-auto">
//           <h3 className="text-xl font-bold mb-2">Search Results</h3>
//           <p>{domainMessage}</p>
//           <p>{results}</p>
//         </div>
//       </div>
//       </div>
//     </>
//   );
// };

// export default InformationRetrieval;

import { useRef, useState } from "react";
import openai from "../utils/openai"; // Adjust the path as needed
// import Header from "./Header";

const InformationRetrieval = () => {
  const inputQuery = useRef(null);
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState("finance");
  const [domainMessage, setDomainMessage] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const handleCopy = () => {
    navigator.clipboard.writeText(results);
    setCopyButtonText("Copied!");
    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 2000);
  };

  const handleSearchClick = async () => {
    setLoading(true);
    const query = inputQuery.current.value;

    let gptQuery;
    switch (domain) {
      case "finance":
        gptQuery = `This is a finance-related question: ${query}`;
        setDomainMessage("The query belongs to the Finance domain.");
        break;
      case "banking":
        gptQuery = `This is a banking-related question: ${query}`;
        setDomainMessage("The query belongs to the Banking domain.");
        break;
      case "supply_chain":
        gptQuery = `This is a supply chain-related question: ${query}`;
        setDomainMessage("The query belongs to the Supply Chain domain.");
        break;
      case "development":
        gptQuery = `This is a development-related question: ${query}`;
        setDomainMessage("The query belongs to the Development domain.");
        break;
      default:
        gptQuery = `This question does not fall under the specified domains: ${query}`;
        setDomainMessage("The query is not in the specified domain range.");
        setResults("The query is not in the domain range.");
        setLoading(false);
        return;
    }

    try {
      const gptResults = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content:
              gptQuery +
              " Don't give results for any other domains excluding banking, finance, development and supply chain. Incase of any other statement just say the query is out of domain. If there is no question is present and a domain is selected, just give a response with two relevant lines about the selected domain.option is selected in one domain and the query is from other domain, just make a response as select appropriate domain.",
          },
        ],
        model: "gpt-3.5-turbo",
      });

      if (gptResults.choices[0]?.message?.content) {
        setResults(gptResults.choices[0]?.message?.content);
      } else {
        setResults("Error in retrieving information.");
      }
    } catch (error) {
      console.error("Error in retrieving information:", error);
      setResults("Error in retrieving information.");
    }
    setLoading(false);
  };

  return (
    <>
      {/* <Header /> */}
      <div className="bg-gray-100 rounded-md p-6">
        <div className="pt-4 flex justify-center">
          <form
            className="bg-black w-full md:w-1/2 grid grid-cols-12 rounded-md"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              ref={inputQuery}
              type="text"
              className="p-4 m-4 col-span-12"
              placeholder="Enter your search query"
            />
            <div className="col-span-12 flex justify-around">
              <select
                className="p-2 m-2 bg-gray-200 rounded-lg w-full text-left"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              >
                <option value="finance">Finance</option>
                <option value="banking">Banking</option>
                <option value="supply_chain">Supply Chain</option>
                <option value="development">Development</option>
              </select>
            </div>
            <button
              className="py-2 px-4 rounded-lg bg-red-600 text-white col-span-12 m-4"
              onClick={handleSearchClick}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
        <div className="pt-4 flex justify-center">
          <div className="bg-white w-full md:w-1/2 p-4 rounded-lg shadow-lg max-h-32 overflow-y-auto">
            <h3 className="text-xl font-bold mb-2">Search Results</h3>
            <p>{domainMessage}</p>
            <p>{results}</p>
            {results && (
              <button
                className={`py-2 px-4 rounded-lg mt-4 text-white ${
                  copyButtonText === "Copied!" ? "bg-green-600" : "bg-blue-600"
                }`}
                onClick={handleCopy}
              >
                {copyButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationRetrieval;
