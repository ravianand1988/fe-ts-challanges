import { cx } from "src/utilities";
import css from "./Toast.module.css";

export interface IToastItem {
  id: string;
  text: string;
  removed: boolean;
}

export const Toast = ({ toast }: { toast: IToastItem }) => {
  return (
    <li
      role="status"
      aria-atomic="true"
      aria-live="polite"
      key={toast.id}
      data-removed={toast.removed}
      data-id={toast.id}
      className={toast.removed ? css.fadeOut : css.fadeIn}
    >
      <div className={cx(css.toast)}>
        <section>
          <p>{toast.text}</p>
        </section>
      </div>
    </li>
  );
};
