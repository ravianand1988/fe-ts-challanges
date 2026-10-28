import { useState, type CSSProperties } from "react";
import { cx } from "src/utilities";
import cssUtils from "../../utilities/styles.module.css";
import { Toast, type IToastItem } from "./Toast";
import { ToastProvider, useToast } from "./Toast.master";
import css from "./Toast.module.css";

const TIMER = 3000;

let id = 0;

const TOAST_CONTAINER_STYLES: CSSProperties = {
  position: "absolute",
  left: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "end",
  overflow: "hidden",
  height: "100%",
  bottom: 0,
  pointerEvents: "none",
  zIndex: 9999,
};

function InnerToastExample() {
  const { toast } = useToast();
  return (
    <button
      onClick={() =>
        toast({
          id: `${id++}`,
          text: `Toast message: ${id}`,
        })
      }
    >
      Click on me!
    </button>
  );
}

export const ToastExample = () => {
  const [toasts, setToasts] = useState<IToastItem[]>([]);

  function addToast() {
    setToasts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: "New notification",
        removed: false,
      },
    ]);
  }

  const onAnimationEnd: React.AnimationEventHandler<HTMLElement> = ({
    target,
  }) => {
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.dataset.id === null) {
      return;
    }

    if (target.dataset.removed === "true") {
      setToasts((items) =>
        items.filter((item) => item.id !== target.dataset.id),
      );
    } else if (target.dataset.removed === "false") {
      setTimeout(() => {
        setToasts((items) => {
          return items.map((item) => ({
            ...item,
            removed: target.dataset.id === item.id ? true : item.removed,
          }));
        });
      }, TIMER);
    }
  };

  return (
    <>
      <button
        className={cssUtils.marginRight16}
        type="button"
        onClick={() => addToast()}
      >
        Show toast
      </button>
      <ul
        id="toastList"
        aria-live="polite"
        aria-relevant="additions removals"
        className={cx(css.toastList, cssUtils.flexColumnStart, cssUtils.pAbs)}
        onAnimationEndCapture={onAnimationEnd}
      >
        {toasts.map((toast, index) => {
          return <Toast key={index} toast={toast} />;
        })}
      </ul>

      {/* Toast Master.dev with Context Provider */}
      <div id="toast-container-example" style={TOAST_CONTAINER_STYLES}></div>
      <ToastProvider target="#toast-container-example">
        <InnerToastExample />
      </ToastProvider>
    </>
  );
};
