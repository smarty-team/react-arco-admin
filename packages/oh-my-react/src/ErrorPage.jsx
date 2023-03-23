import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>啊哦!</h1>
      <p>实在抱歉，页面显示发生了点意外情况，要不咱再试试？</p>
      <p>
        <i>{error.data}</i>
      </p>
    </div>
  );
}
