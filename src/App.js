import { useState } from "react";
import "./App.css";

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
  // if you find a capital letter in a middle of a word
  // /g even if multiple times
  // replace it with whateever letter you have,
  // preceeded by a space
}

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const [disabled, setDisabled] = useState(false);
  const [gray, setGray] = useState("");
  const newButtonColor = buttonColor === "red" ? "blue" : "red";
  const evaluation = gray === "" ? "gray" : "";

  return (
    <div>
      <button
        style={{ backgroundColor: buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}
        className={gray}
      >
        Changed to {buttonColor}
      </button>

      <input
        type="checkbox"
        onClick={(e) => {
          setDisabled(e.target.checked);
          setGray(evaluation);
        }}
        id="enabler"
        defaultChecked={disabled}
        aria-checked={disabled}
      />
    </div>
  );
}

export default App;
