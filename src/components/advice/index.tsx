import { FC, useEffect, useState } from "react";
import axios from "axios";

import "./index.css";
import Loader from "../common/loader";

const WordinAdvice: FC = () => {
  const [advice, setAdvice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_ADVICE_API_URL}`
        );
        setAdvice(response.data.slip.advice);
      } catch (error) {
        setAdvice("Yeas, sometimes unexprected things can happen😔");
      } finally {
        setLoading(false);
      }
    };
    fetchAdvice();
  }, []);
  if (loading) return <Loader />;
  return (
    <div className="advice-wrapper">
      <h3>Advice of the day...</h3>
      <p>{advice}</p>
    </div>
  );
};

export default WordinAdvice;
