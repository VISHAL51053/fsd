import { useState } from "react";
import { calculateTotal } from "../utils/calculateTotal.js";

function Student({ name, department }) {
  const [marks, setMarks] = useState(80);
  const total = calculateTotal(marks, 10);

  return (
    <section className="student-card" aria-labelledby="student-title">
      <div className="student-heading">
        <div className="student-avatar" aria-hidden="true">
          {name.charAt(0)}
        </div>
        <div>
          <p className="eyebrow">STUDENT PROFILE</p>
          <h2 id="student-title">Student Details</h2>
        </div>
      </div>

      <dl className="student-details">
        <div className="detail-row">
          <dt>Name</dt>
          <dd>{name}</dd>
        </div>
        <div className="detail-row">
          <dt>Department</dt>
          <dd>{department}</dd>
        </div>
      </dl>

      <div className="marks-panel">
        <div>
          <p className="eyebrow">CURRENT MARKS</p>
          <p className="marks-value" aria-live="polite">
            {marks}
          </p>
        </div>
        <button
          className="add-marks-button"
          onClick={() => setMarks((currentMarks) => currentMarks + 5)}
          type="button"
        >
          <span aria-hidden="true">+</span> Add 5 Marks
        </button>
      </div>

      <div className="total-row" aria-live="polite">
        <span>Total including 10 bonus marks</span>
        <strong>{total}</strong>
      </div>
    </section>
  );
}

export default Student;
