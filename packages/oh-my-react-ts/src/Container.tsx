import { PropsWithChildren } from "react";

type Props = {
  title: string;
};

const Container = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <div style={{ border: "1px solid white", padding: "0 15px 20px" }}>
      <h1>{title}</h1>
      <div>{children}</div>
    </div>
  );
};

export { Container };
