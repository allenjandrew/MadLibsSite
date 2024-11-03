import * as intf from "./scripts/interfaces";
import * as func from "./scripts/functions";
import MadLibPage from "./MadLibPage";
import Home from "./Home";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [sentences, setSentences] = useState<intf.MadLib[]>([]);
  const [filled, setFilled] = useState<string[]>([]);

  const handleGenerateNew = () => {
    const madlib = func.fetchData();
    setSentences([...sentences, madlib]);
  };

  const handleFilledSentence = (id: number, values: string[]) => {
    const newFilled = [...filled];
    newFilled[id] = func.fillBlanks(sentences[id].text, values);
    setFilled(newFilled);
  };

  return (
    <div className="mx-5 my-4">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home data={sentences} handleGenerateNew={handleGenerateNew} />
            }
          />
          <Route
            path="madlib/:id"
            element={
              <MadLibPage
                data={sentences}
                filled={filled}
                handleFilledSentence={handleFilledSentence}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
