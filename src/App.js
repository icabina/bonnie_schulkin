import { useState } from "react";
import ButtonChange from "./ButtonChange";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SummaryForm from "./pages/summary/SummaryForm";
import Options from "./pages/entry/Optons";

//npm install eslint-plugin-testing-library eslint-plugin-jest

function App() {
  return (
    <div>
      <ButtonChange />
      <SummaryForm />
      <Options />
    </div>
  );
}

export default App;
