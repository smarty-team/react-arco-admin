import { useNavigate } from "react-router";

import Menu from "../components/menu";
import NavBar from "../components/content/navbar";
import Content from "../components/content/content";
import Footer from "../components/content/footer";
import Loading from "../components/content/loading";
import { useState } from "react";
export default function Index() {
  const navigate = useNavigate();

  const [display, setDispllay] = useState(true);

  setTimeout(() => {
    setDispllay(false);
  }, 500);

  const collapse = () => (
    <div
      tabIndex={0}
      className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
    >
      <div className="collapse-title text-xl font-medium">
        Focus me to see content
      </div>
      <div className="collapse-content">
        <p>tabIndex={0} attribute is necessary to make the div focusable</p>
      </div>
    </div>
  );

  return (
    <div className="bg-base-100 drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <NavBar></NavBar>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              {/* <h1 className="text-5xl font-bold">Hello there</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p> */}

              {collapse}

              <button
                className="btn btn-primary"
                onClick={() => navigate("/admin")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello there</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>

              {collapse}

              <button
                className="btn btn-primary"
                onClick={() => navigate("/admin")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
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
