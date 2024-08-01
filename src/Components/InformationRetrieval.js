import { useRef, useState } from "react";
import openai from "../utils/openai"; // Adjust the path as needed

const InformationRetrieval = () => {
  const inputQuery = useRef(null);
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState("finance");
  const [domainMessage, setDomainMessage] = useState("");

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
        messages: [{ role: "user", content: gptQuery + "Don't give results for any other domains excluding banking, finance, development and supply chain. Incase of any other statement just say the query is out of domain." }],
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
      <div className="pt-10 flex justify-center">
        <form
          className="bg-black w-full md:w-1/2 grid grid-cols-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={inputQuery}
            type="text"
            className="p-4 m-4 col-span-12"
            placeholder="Enter your search query"
          />
          <div className="col-span-12 flex justify-around">
            <label className="p-2 m-2 bg-gray-200 rounded-lg">
              <input
                type="radio"
                value="finance"
                checked={domain === "finance"}
                onChange={() => setDomain("finance")}
              />
              Finance
            </label>
            <label className="p-2 m-2 bg-gray-200 rounded-lg">
              <input
                type="radio"
                value="banking"
                checked={domain === "banking"}
                onChange={() => setDomain("banking")}
              />
              Banking
            </label>
            <label className="p-2 m-2 bg-gray-200 rounded-lg">
              <input
                type="radio"
                value="supply_chain"
                checked={domain === "supply_chain"}
                onChange={() => setDomain("supply_chain")}
              />
              Supply Chain
            </label>
            <label className="p-2 m-2 bg-gray-200 rounded-lg">
              <input
                type="radio"
                value="development"
                checked={domain === "development"}
                onChange={() => setDomain("development")}
              />
              Development
            </label>
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
        <div className="bg-white w-full md:w-1/2 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Search Results</h3>
          <p>{domainMessage}</p>
          <p>{results}</p>
        </div>
      </div>
    </>
  );
};

export default InformationRetrieval;