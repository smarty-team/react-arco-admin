import {
  ChangeEventHandler,
  FormEvent,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import { Container } from "./Container";
import { TodoList } from "./TodoList";

type ChangeFn = (e: FormEvent<HTMLInputElement>) => void;

function App() {
  const [title, setTitle] = useState("Container");
  const ref1 = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref1.current!.focus();
  }, [ref1.current]);

  // 1.FormEvent
  // const onChange: ChangeFn = (e) => {
  //   setTitle(e.currentTarget.value)
  // }
  // 2.ChangeEventHandler
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if(e.code === 'Enter') {
      console.log('Enter');
    }
  }
  return (
    <div className="App">
      <Container title={title}>
        <input
          type="text"
          ref={ref1}
          value={title}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <TodoList message="TodoMVC"></TodoList>
      </Container>
    </div>
  );
}

export default App;
