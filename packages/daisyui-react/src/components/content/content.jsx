import BreadCrumbs from "./breadcrumbs";
import { useNavigate } from "react-router-dom";

export default function Content() {
  const navigate = useNavigate();
  return (
    <div class="px-6 xl:pr-2 pb-16">
      <div class="flex flex-col-reverse justify-between gap-6 xl:flex-row">
        <div class="prose w-full max-w-4xl flex-grow">
          <BreadCrumbs></BreadCrumbs>
          <li>
            <a onClick={() => navigate("/login")}>Login</a>
          </li>
          <h1 class="text-xl">Vue面试宝典</h1>
          <p> XXXX</p>
          <p> XXXX</p>
          <p> XXXX</p>

          <p> XXXX</p>
        </div>
      </div>
    </div>
  );
}
