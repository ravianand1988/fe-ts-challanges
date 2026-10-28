import {
  createContext,
  useContext,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";
import { cx } from "src/utilities";
import cssUtils from "../../utilities/styles.module.css";
import css from "./Toast.module.css";

/**
 * API which is exposed to developer
 */
export type TToastMethods = {
  toast: (item: TToastItem) => void;
};

type TToastItem = {
  id: string;
  text: string;
};

const TIMER = 3000;

const ToastContext = createContext<TToastMethods>({
  toast: (_: TToastItem) => {},
});

export function ToastProvider({
  children,
  target,
}: PropsWithChildren<{ target: string }>) {
  const [targetElement, setTarget] = useState<HTMLElement | null>(null);

  const toastRef = useRef<TToastMethods>(null);

  useLayoutEffect(() => {
    if (targetElement == null && target != null) {
      const element = document.querySelector(target);
      if (element instanceof HTMLElement) {
        setTarget(element);
      }
    }
  }, [target, targetElement]);

  const context = useMemo(
    () => ({
      toast: (item: TToastItem) => toastRef.current?.toast(item),
    }),
    [],
  );

  return (
    <ToastContext.Provider value={context}>
      {targetElement &&
        createPortal(<ToastList refX={toastRef} />, targetElement)}
      {children}
    </ToastContext.Provider>
  );
}

export function useToast(): TToastMethods {
  const context = useContext(ToastContext);
  return context;
}

function ToastList({ refX }: { refX: React.Ref<TToastMethods> }) {
  const [items, setItems] = useState<Array<TToastItem & { removed: boolean }>>(
    [],
  );

  useImperativeHandle(refX, () => ({
    toast: (item: TToastItem) => {
      setItems((items) => [...items, { ...item, removed: false }]);
    },
  }));

  const onAnimationEndMaster: React.AnimationEventHandler<HTMLElement> = ({
    target,
  }) => {
    console.log("on animation end: ", target);
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.dataset.id == null) {
      return;
    }
    console.log("on animation ", target.dataset);
    console.log("removed ", target.dataset.removed === "true");
    if (target.dataset.removed === "true") {
      setItems((items) => items.filter((it) => it.id !== target.dataset.id));
    } else if (target.dataset.removed === "false") {
      console.log("removed false");

      setTimeout(() => {
        console.log("setting time out");
        setItems((items) =>
          items.map((it) => ({
            ...it,
            removed: target.dataset.id === it.id ? true : it.removed,
          })),
        );
      }, TIMER);
    }
  };

  return (
    <ul
      aria-live="polite"
      aria-relevant="additions removals"
      className={cx(css.toastList, cssUtils.flexColumnStart)}
      onAnimationEndCapture={onAnimationEndMaster}
    >
      {items.map((item) => (
        <li
          role="status"
          aria-atomic="true"
          aria-live="polite"
          key={item.id}
          data-removed={item.removed}
          data-id={item.id}
          className={`${item.removed ? css.fadeout : css.fadeIn}`}
        >
          <div className={cx(css.toast, cssUtils.flexColumnCenter)}>
            <p>{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
