import { useState } from "react";
import "./App.css";
import { GoogleGenAI } from "@google/genai";

const my_api_key = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: my_api_key });

function App() {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Loading....");

  // api call to Gemini
  const generateAnswer = async () => {
    // if(question.length===0){

    // }
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: JSON.stringify(question),
    });
    setAnswer(response.text);

    setLoading(false);

    // console.log("Response==>", response.text);
  };

  return (
    <>
      <title>Chatbot with react</title>
      <div className="w-8/12 mx-auto  p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">ChatBot</h1>

        <form className="w-full flex flex-col items-center">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your query..."
            className="input input-bordered border-2 w-full min-h-48 max-h-64"
          ></textarea>

          <button
            onClick={generateAnswer}
            type="button"
            className="btn btn-primary border-1 mt-5 hover:bg-gray-300  "
          >
            {loading ? "Loading..." : "Generate answer"}
          </button>
        </form>

        <div className="mt-5 border-2 w-full p-4 min-h-72">
          {!loading &&(
            <div className="mt-5 border-2 w-full p-4">
              <p className="font-semibold mb-5 text-center">{question}</p>
              <p className="overflow-y-auto  max-h-72">{answer}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
