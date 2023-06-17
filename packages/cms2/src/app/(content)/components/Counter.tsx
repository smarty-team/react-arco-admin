'use client'

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { dec, inc } from "@/app/store/counterSlice";
import { AppDispatch, RootState } from "@/app/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default function Counter() {

  const count = useAppSelector(state => state.counter.count)
  const dispatch = useAppDispatch()
  
  return (
    <div>
      <button onClick={() => dispatch(dec())}>-</button>
      <span>count: {count}</span>
      <button onClick={() => dispatch(inc())}>+</button>
    </div>
  );
}