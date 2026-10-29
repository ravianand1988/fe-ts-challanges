import { cx } from "src/utilities";
import cssUtils from "../../utilities/styles.module.css";
import { CountrySelect } from "./CountrySelect";

export const CountrySelectExample = () => {
  function handleOnSelect(value: string | string[]) {
    console.log("on country select: ", value);
  }
  return (
    <div className={cx(cssUtils.flexRowStart, cssUtils.flexGap24)}>
      <CountrySelect key={1} onSelect={handleOnSelect} />
      <CountrySelect key={2} onSelect={handleOnSelect} multi={true} />
    </div>
  );
};
