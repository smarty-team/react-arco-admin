export function Loading() {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my-modal"></label>
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        readOnly
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">🚌 Loading ....</h3>
          <progress className="progress progress-success w-100"></progress>
        </div>
      </div>
    </div>
  );
}
