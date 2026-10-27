import { useState } from "react";
import "./counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);

  function handleDecrement() {
    setCount(count - 1);
  }

  function handleIncrement() {
    setCount(count + 1);
  }

  return (
    <div className="container-counter">
      <button
        className="btn-counter"
        type="button"
        name="counter-decrement"
        data-action="decrement"
        onClick={handleDecrement}
      >
        -
      </button>
      <span className="label-count">{count}</span>
      <button
        className="btn-counter"
        type="button"
        name="counter-increment"
        data-action="increment"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export { Counter };
