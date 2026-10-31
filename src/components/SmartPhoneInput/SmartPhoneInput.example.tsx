import { useState } from "react";
import { SmartPhoneInput } from "./SmartPhoneInput";

export const SmartPhoneInputExample = () => {
  const [phone, setPhone] = useState("");

  return (
    <div>
      <SmartPhoneInput value={phone} onChange={setPhone} />
      <p>Stored value: {phone || "(empty)"}</p>
    </div>
  );
};
