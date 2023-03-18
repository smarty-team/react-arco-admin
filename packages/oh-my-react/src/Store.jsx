import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './store/counterSlice';

export function Counter() {
  // useSelector(selector)获取需要的子模块数据
  const count = useSelector(state => state.counter.value);
  // dispatch(action)用来修改状态
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  )
}