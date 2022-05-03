import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState<string>("Before");
  const handleAPI1 = () => {
    const url: string = "http://localhost:8080/api1";
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((e) => console.error(e));
  };
  const handleAPI2 = () => {
    const url: string = "http://localhost:8080/api2";
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((e) => console.error(e));
  };
  const handleAPI3 = () => {
    const url: string = "http://localhost:8080/api3";
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        console.log(data);
        setData(res.data);
      })
      .catch((e) => console.error(e));
  };
  return (
    <div className="App">
      {/* //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header> */}

      <button onClick={handleAPI1}>API1</button>
      <button onClick={handleAPI2}>API2</button>
      <button onClick={handleAPI3}>API3</button>
      <div>
        <h1>data.id</h1>
      </div>
    </div>
  );
}

export default App;
