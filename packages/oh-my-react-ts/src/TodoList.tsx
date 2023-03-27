import { FC } from "react";

type Props = {
  message: string;
};

const TodoList: FC<Props> = ({ message }) => {
  return <div>{message}</div>;
};

export { TodoList };
