import { SmartPhoneInput } from "./SmartPhoneInput";

export const SmartPhoneInputExample = () => {
  function handleOnChange(val: string) {
    console.log("value: ", val);
  }
  return (
    <div>
      <SmartPhoneInput value="" onChange={handleOnChange} />
    </div>
  );
};
