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
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Explain how ai works?",
    });
    setAnswer(response.text);
    setLoading(false);

    console.log("Response==>", response.text);
  };

  return (
    <>
      <title>Chatbot with react</title>
      <div className="w-9/12 mx-auto">
        <h1 className="text-3xl font-bold mb-6">ChatBot</h1>

        <form>
          <textarea
            cols="50"
            rows="10"
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your query..."
            className="input input-bordered border-2 w-full"
          ></textarea>

          <button
            onClick={generateAnswer}
            type="button"
            className="btn btn-primary border-1 mt-5"
          >
            {loading?"Loading...":"Generate answer"}
          </button>
        </form>

        {loading ? (
          <div className="animate-pulse text-2xl mt-16 text-green-400 ">Loading...</div>
        ) : (
          <div className="mt-5 border-2 w-full">
            <pre className="overflow-auto w-full h-64">{answer}</pre>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
