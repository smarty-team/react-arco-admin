export default function TodoFilter({ visibility, setVisibility }) {
  return (
    <div className="footer">
      <ul className="filters">
        <li>
          <button
            className={visibility === "all" ? "selected" : ""}
            onClick={() => setVisibility("all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={visibility === "active" ? "selected" : ""}
            onClick={() => setVisibility("active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={visibility === "completed" ? "selected" : ""}
            onClick={() => setVisibility("completed")}
          >
            Completed
          </button>
        </li>
      </ul>
    </div>
  );
}
