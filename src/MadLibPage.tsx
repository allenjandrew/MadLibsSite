import { useParams, Link } from "react-router-dom";
import WordEntry from "./components/WordEntry";
import { useState } from "react";
import Display from "./components/Display";
import * as intf from "./scripts/interfaces";
// import * as func from "./scripts/functions";

interface MadLibPageProps {
  data: intf.MadLib[];
  filled: string[];
  handleFilledSentence: (id: number, values: string[]) => void;
}

const MadLibPage = (p: MadLibPageProps) => {
  const { id } = useParams();
  const idn = Number(id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [values, setValues] = useState<string[]>([]);
  const [showSentence, setShowSentence] = useState(Boolean(p.filled[idn]));
  const [showErrorAnnouncement, setShowErrorAnnouncement] = useState(false);

  const Wrong = () => {
    return (
      <>
        <nav>
          <Link to="/">Back to Home</Link>
        </nav>
        <div className="alert alert-warning" role="alert">
          MadLib not found
        </div>
      </>
    );
  };

  const handleEnter = () => {
    if (!values[currentIndex] || values[currentIndex].trim() === "") {
      setShowErrorAnnouncement(true);
      return;
    }
    setCurrentIndex(currentIndex + 1);
    if (values.length === madlib.blanks.length) {
      p.handleFilledSentence(idn, values);
      setShowSentence(true);
    } else {
      setShowSentence(false);
    }
  };

  const handleValueChange = (value: string, i: number) => {
    const newValues = [...values];
    newValues[i] = value;
    setValues(newValues);
    setShowErrorAnnouncement(false);
  };

  if (!id) {
    return Wrong();
  }

  const madlib = p.data[idn];

  if (!madlib) {
    return Wrong();
  }

  return (
    <div className="my-4">
      <nav className="my-4 btn btn-outline-primary">
        <Link to="/">Back to Home</Link>
      </nav>
      <h1>{madlib.title}</h1>

      {currentIndex < madlib.blanks.length && (
        <WordEntry
          handleEnter={handleEnter}
          handleValueChange={handleValueChange}
          partOfSpeech={madlib.blanks[currentIndex]}
          wIndex={currentIndex}
        />
      )}
      {showErrorAnnouncement && (
        <div className="alert alert-danger" role="alert">
          Please fill in the blank
        </div>
      )}
      {showSentence && (
        <Display
          image={`/src/assets/images/${madlib.image}`}
          sentence={p.filled[idn]}
        />
      )}
    </div>
  );
};

export default MadLibPage;
