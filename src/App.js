import { useState } from "react";
import ButtonChange from "./ButtonChange";
import "./App.css";
import SummaryForm from "./pages/summary/SummaryForm";

//npm install eslint-plugin-testing-library eslint-plugin-jest

function App() {
  return (
    <div>
      <ButtonChange />
      <SummaryForm />
    </div>
  );
}

export default App;
