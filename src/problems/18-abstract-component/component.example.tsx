import { AbstractComponent } from "./component";
import { useRef, useEffect } from "react";

type TCounterConfig = { initial: number };

class Counter extends AbstractComponent<TCounterConfig> {
  count: number;

  constructor(
    config: ConstructorParameters<typeof AbstractComponent<TCounterConfig>>[0],
  ) {
    super({ ...config, listeners: ["click"] });
    this.count = config.initial;
  }

  toHTML() {
    return `
      <div style="display:flex;align-items:center;gap:12px;font-family:sans-serif;">
        <button data-action="decrement" style="padding:6px 14px;font-size:1.1rem;cursor:pointer;">-</button>
        <span style="font-size:1.3rem;min-width:40px;text-align:center;">${this.count}</span>
        <button data-action="increment" style="padding:6px 14px;font-size:1.1rem;cursor:pointer;">+</button>
      </div>
    `;
  }

  onClick(e: Event) {
    const action = (e.target as HTMLElement).dataset.action;
    if (action === "increment") this.count++;
    if (action === "decrement") this.count--;
    this.render();
  }
}

export const AbstractComponentExample = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<Counter | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    counterRef.current = new Counter({
      root: rootRef.current,
      initial: 0,
    });

    counterRef.current.render();

    return () => {
      counterRef.current?.destroy();
      counterRef.current = null;
    };
  }, []);

  return <div ref={rootRef}></div>;
};
