import Menu from "../components/menu";
import NavBar from "../components/content/navbar";
import Content from "../components/content/content";
import Footer from "../components/content/footer";
import Loading from "../components/content/loading";
import { useState } from "react";
export default function Admin() {
  const [display, setDispllay] = useState(true);

  setTimeout(() => {
    setDispllay(false);
  }, 500);
  return (
    <div className="bg-base-100 drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <NavBar></NavBar>
        <Content></Content>
        <Footer></Footer>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <Menu></Menu>
      </div>

      <Loading display={display}></Loading>

      {/* Put this part before </body> tag */}
      {/* <input type="checkbox" id="my-modal" className="modal-toggle" /> */}
    </div>
  );
}
