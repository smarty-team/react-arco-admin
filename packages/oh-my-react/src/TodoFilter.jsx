import styles from "./TodoFilter.module.css";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  VisibilityFilters,
  setVisibilityFilter,
} from "./store/visibilitySlice";

const Button = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #646cff;
  }

  ${(props) =>
    props.selected &&
    css`
      border-color: #646cff;
    `}
`;

export default function TodoFilter() {
  // 引入visibility
  const visibility = useSelector((state) => state.visibility);
  // 引入dispatch
  const dispatch = useDispatch();

  // 设置过滤
  const setVisibility = (filter) => {
    dispatch(setVisibilityFilter(filter));
  };

  const getButtonText = (filter) => {
    return filter === VisibilityFilters.SHOW_ALL
      ? "显示全部"
      : filter === VisibilityFilters.SHOW_ACTIVE
      ? "进行中"
      : "已完成";
  };

  return (
    <div className="footer">
      <ul className={styles.filters}>
        {Object.keys(VisibilityFilters).map((v) => (
          <li className={styles.filtersLi} key={v}>
            <Button
              selected={visibility === v}
              onClick={() => setVisibility(v)}
            >
              {getButtonText(v)}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
