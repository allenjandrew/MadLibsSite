import { useState, KeyboardEvent } from "react";

interface WordEntryProps {
  handleEnter: () => void;
  handleValueChange: (value: string, ind: number) => void;
  wIndex: number;
  partOfSpeech: string;
}

const WordEntry = (p: WordEntryProps) => {
  return (
    <div className="my-4 input-group input-group-lg w-50">
      <EnterAWord word={p.partOfSpeech} />
      <WordInputBox
        partOfSpeech={p.partOfSpeech}
        wIndex={p.wIndex}
        handleEnter={p.handleEnter}
        handleValueChange={p.handleValueChange}
      />
    </div>
  );
};

const WordInputBox = (p: WordEntryProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      p.handleEnter();
      setInputValue("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    p.handleValueChange(e.target.value, p.wIndex);
  };

  return (
    <input
      autoFocus
      type="text"
      className="form-control"
      key={`word-entry-${p.wIndex}`}
      placeholder={p.partOfSpeech}
      value={inputValue}
      onChange={(e) => handleChange(e)}
      onKeyDown={handleKeyDown}
    />
  );
};

interface EnterAWordProps {
  word: string;
}

const EnterAWord = (p: EnterAWordProps) => {
  const addN = (word: string) => {
    let rv = "";
    if (["a", "e", "i", "o", "u"].includes(word.slice(0, 1).toLowerCase())) {
      rv += "n";
    }
    return rv + " " + word;
  };

  return (
    <span className="input-group-text" id="inputGroup-sizing-lg">
      Enter a{`${addN(p.word)}`}:
    </span>
  );
};

export default WordEntry;
export { WordInputBox, EnterAWord };
