import { useState } from "react";
import "./style.css";
export const LoaderComponent = ({ msg, msgOn = true }) => {
  const [isVisible, setVisible] = useState(false);
  setTimeout(() => {
    setVisible(true);
  }, 5000);
  return (
    <>
      <div className="loader"></div>
      {isVisible && msgOn ? (
        <h1>{msg ? msg : "oh no, something's wrong..."}</h1>
      ) : null}
    </>
  );
};
