import { useState } from "react";
import "./App.css";
import Alarm from "./components/alerm";
import Menu from "./components/menu";
import NavBar from "./components/content/navbar";
import Content from "./components/content/content";
import Footer from "./components/content/footer";
function App() {
  return (
    <div className="App">
      <div className="bg-base-100 drawer drawer-mobile">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <NavBar></NavBar>
          <Content></Content>
          <Footer></Footer>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <Menu></Menu>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
