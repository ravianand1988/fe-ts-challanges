import { useState } from "react";
import "./counter.css";

interface ICounterProps {
  min?: number;
  max?: number;
  value?: number;
  onChange: (value: number) => void;
}

const Counter = ({ min, max, value, onChange }: ICounterProps) => {
  const [count, setCount] = useState(value || 0);

  function handleDecrement() {
    setCount(() => count - 1);
    onChange(count);
  }

  function handleIncrement() {
    setCount(() => count + 1);
    onChange(count);
  }

  return (
    <div className="container-counter">
      <button
        className="btn-counter"
        type="button"
        name="counter-decrement"
        data-action="decrement"
        disabled={!!min && count === min}
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
        disabled={!!max && count === max}
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export { Counter };
