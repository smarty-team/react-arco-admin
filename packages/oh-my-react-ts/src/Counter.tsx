import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./store/counterSlice";
import { RootState } from "./store";

export default function Counter() {
  const dispatch = useDispatch();
  // selector函数可以用到 RootState
  const counter = useSelector((state: RootState) => state.counter.value);

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{counter}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
}
