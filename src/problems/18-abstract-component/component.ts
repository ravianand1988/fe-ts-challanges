export type TComponentConfig<T extends object> = T & {
  root: HTMLElement;
  className?: string[];
  listeners?: string[];
  tag?: keyof HTMLElementTagNameMap;
};

const DEFAULT_CONFIG: Partial<TComponentConfig<any>> = {
  className: [],
  listeners: [],
  tag: "div",
};

type TComponentListener = {
  type: string;
  callback: EventListenerOrEventListenerObject;
};

const toEventName = (type: string): string => {
  if (!type) {
    return "";
  } else return `on${type[0].toUpperCase()}${type.slice(1)}`;
};

abstract class AbstractComponent<T extends object> {
  container: HTMLElement | null;
  config: TComponentConfig<T>;
  events: Array<TComponentListener>;

  constructor(config: TComponentConfig<T>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.container = null;
    this.events = [];
  }

  public init() {
    this.container = document.createElement(
      this.config.tag as keyof HTMLElementTagNameMap,
    );
    if (this.config.className) {
      for (const className of this.config.className) {
        this.container.classList.add(className);
      }
    }

    this.events = (this.config.listeners || []).map((type) => {
      const event = toEventName(type);
      // @ts-expect-error - we need to handle both native and custom events
      let callback = this[event];

      if (!callback) {
        throw Error(`handler ${event} for ${type} is not implemented`);
      }

      callback = callback.bind(this);
      this.container!.addEventListener(type, callback);
      return { type, callback };
    });
  }

  public afterRender() {}

  public render() {
    if (this.container) {
      this.destroy();
    }

    this.init();
    this.container!.innerHTML = this.toHTML();
    this.config.root.appendChild(this.container!);
    this.afterRender();
  }

  public toHTML(): string {
    return ``;
  }

  public destroy() {
    this.events.forEach(({ type, callback }) => {
      this.container!.removeEventListener(type, callback);
    });
    this.events = [];
    this.container!.remove();
  }
}

export { AbstractComponent };
