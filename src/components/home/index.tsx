import { ChangeEvent, FC, useState } from "react";
import axios from "axios";

import "./index.css";

type Definitions = {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example: string;
};

type Meanings = {
  partOfSpeech: string;
  definitions: Definitions[];
};

const WordinHome: FC = () => {
  const [requestedWord, setRequestedWord] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [wordMeanings, setWordMeanings] = useState<Meanings[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearching(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DICTIONARY_APU_URL}${requestedWord}`
      );
      setWordMeanings(response.data[0].meanings);
      setMessage("");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.title);
      } else {
        setMessage(error.message);
      }
      setWordMeanings([]);
    } finally {
      setSearching(false);
    }
  };
  return (
    <div className="word-wrapper">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={requestedWord}
          onChange={(e) => setRequestedWord(e.target.value)}
        />
        <button type="submit">Seach</button>
      </form>

      <div className="definitions-wrapper">
        {wordMeanings?.map((meaning) => (
          <div key={meaning.partOfSpeech}>
            <p className="part-of-speech">
              <h4>Parts of Speech</h4>
              <span>{meaning.partOfSpeech}</span>
            </p>
            {meaning.definitions.map((definition) => (
              <p key={definition.definition}>{definition.definition}</p>
            ))}
          </div>
        ))}
      </div>
      {!searching && <p className="message">{message}</p>}
    </div>
  );
};

export default WordinHome;
