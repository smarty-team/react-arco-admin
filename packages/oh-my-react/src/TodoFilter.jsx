import styles from "./TodoFilter.module.css";

export default function TodoFilter({ visibility, setVisibility }) {
  return (
    <div className="footer">
      <ul className={styles.filters}>
        {["all", "active", "completed"].map((v) => (
          <li className={styles.filtersLi} key={v}>
            <button
              className={visibility === v ? styles.selected : ""}
              onClick={() => setVisibility(v)}
            >
              {v}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
