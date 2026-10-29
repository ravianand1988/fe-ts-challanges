import { CountrySelect } from "./CountrySelect";

export const CountrySelectExample = () => {
  function handleOnSelect(value: string | string[]) {
    console.log("on country select: ", value);
  }
  return <CountrySelect onSelect={handleOnSelect} />;
};
