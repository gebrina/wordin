import { Rings } from "react-loader-spinner";

import "./index.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <Rings width={200} height={300} color="orangered" radius={100} />
    </div>
  );
};

export default Loader;
