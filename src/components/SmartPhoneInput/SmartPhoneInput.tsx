import { useEffect, useRef, useState } from "react";

interface ICountryConfig {
  code: string;
  dialCode: string;
  mask: string; // e.g. 'XXXX XXXXX'
  regex: RegExp;
}

const COUNTRY_REGISTRY: Record<string, ICountryConfig> = {
  DE: { code: "DE", dialCode: "+49", mask: "XXXX XXXXXXX", regex: /^\d{11}$/ },
  UK: { code: "UK", dialCode: "+44", mask: "XXXXX XXXXXX", regex: /^\d{11}$/ },
  US: { code: "US", dialCode: "+1", mask: "XXX-XXX-XXXX", regex: /^\d{10}$/ },
};

interface SmartPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SmartPhoneInput = ({ value, onChange }: SmartPhoneInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState<ICountryConfig>(
    COUNTRY_REGISTRY.DE,
  );
  const [displayValue, setDisplayValue] = useState("");
  const selectionRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Extract numbers matching current dial code
    const cleanDial = selectedCountry.dialCode.replace("+", "");
    let localDigits = value.startsWith(cleanDial)
      ? value.slice(cleanDial.length)
      : value;

    // Format local digits to match specific country visual masks
    setDisplayValue(applyMask(localDigits, selectedCountry.mask));
  }, [value, selectedCountry]);

  // Adjust cursor memory positions to avoid jumping text selection artifacts on-type
  useEffect(() => {
    if (inputRef.current && selectionRef.current !== null) {
      inputRef.current.setSelectionRange(
        selectionRef.current,
        selectionRef.current,
      );
      selectionRef.current = null;
    }
  }, [displayValue]);

  function applyMask(digits: string, mask: string): string {
    const raw = digits.replace(/\D/g, "");
    let result = "";
    let digitIdx = 0;

    for (let i = 0; i < mask.length && digitIdx < raw.length; i++) {
      if (mask[i] === "X") {
        result += raw[digitIdx++];
      } else {
        result += mask[i];
        // If user typed a delimiter character explicitly, advance past it
        if (raw[digitIdx] === mask[i]) digitIdx++;
      }
    }
    return result;
  }

  const handleCountrySelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    console.log("country changed: ", e);
    const nextCountry = COUNTRY_REGISTRY[e.target.value];
    setSelectedCountry(nextCountry);

    const prevDial = selectedCountry.dialCode.replace("+", "");
    const cleanDigits = value.slice(prevDial.length);
    const newDial = nextCountry.dialCode.replace("+", "");
    onChange(`${newDial}${cleanDigits}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("input value changed: ", e);
    const input = e.target;
    const rawInput = input.value;
    const cleanDigits = rawInput.replace(/\D/g, "");

    // Track cursor offset ahead of state commit
    const selectionStart = input.selectionStart;
    selectionRef.current = selectionStart;

    const cleanDial = selectedCountry.dialCode.replace("+", "");

    onChange(`${cleanDial}${cleanDigits}`);
  };

  return (
    <div>
      <select
        name="countrySelect"
        id="countrySelect"
        aria-label="Select Country Code"
        value={selectedCountry.code}
        style={{ padding: "8px", borderRadius: "4px" }}
        onChange={(e) => handleCountrySelectChange(e)}
      >
        {Object.values(COUNTRY_REGISTRY).map((country) => {
          return (
            <option key={country.code} value={country.code}>
              {country.code} ({country.dialCode})
            </option>
          );
        })}
      </select>
      <input
        ref={inputRef}
        type="tel"
        name="phoneNumber"
        id="phoneNumber"
        className="phoneNumber"
        value={displayValue}
        onChange={(e) => handleInputChange(e)}
        aria-label="Phone Number INput"
        placeholder={selectedCountry.mask}
        style={{
          flex: 1,
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export { COUNTRY_REGISTRY, SmartPhoneInput };
export type { ICountryConfig, SmartPhoneInputProps };
