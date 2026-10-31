import { useLayoutEffect, useRef, useState } from "react";

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

const DEFAULT_COUNTRY = COUNTRY_REGISTRY.DE;

interface SmartPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const toDigits = (str: string) => str.replace(/\D/g, "");

const cleanDialOf = (country: ICountryConfig) => toDigits(country.dialCode);

const maxDigitsOf = (mask: string) => mask.split("X").length - 1;

// Pick the country whose dial code prefixes the value (longest match wins)
function inferCountry(value: string): ICountryConfig {
  const matches = Object.values(COUNTRY_REGISTRY)
    .filter((country) => value.startsWith(cleanDialOf(country)))
    .sort((a, b) => b.dialCode.length - a.dialCode.length);
  return matches[0] ?? DEFAULT_COUNTRY;
}

// Extract local digits from the stored "<dial><local>" value
function toLocalDigits(value: string, country: ICountryConfig): string {
  const digits = toDigits(value);
  const cleanDial = cleanDialOf(country);
  return digits.startsWith(cleanDial) ? digits.slice(cleanDial.length) : digits;
}

function applyMask(digits: string, mask: string): string {
  let result = "";
  let digitIdx = 0;

  for (let i = 0; i < mask.length && digitIdx < digits.length; i++) {
    result += mask[i] === "X" ? digits[digitIdx++] : mask[i];
  }
  return result;
}

// Position in the formatted string right after the n-th digit
function caretAfterDigits(formatted: string, digitCount: number): number {
  if (digitCount <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i]) && ++seen === digitCount) return i + 1;
  }
  return formatted.length;
}

const SmartPhoneInput = ({ value, onChange }: SmartPhoneInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState<ICountryConfig>(() =>
    inferCountry(value),
  );
  const caretRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const localDigits = toLocalDigits(value, selectedCountry);
  const displayValue = applyMask(localDigits, selectedCountry.mask);
  const isInvalid =
    localDigits.length > 0 && !selectedCountry.regex.test(localDigits);

  // Restore caret after React re-renders the controlled value (which moves it to the end)
  useLayoutEffect(() => {
    if (inputRef.current && caretRef.current !== null) {
      inputRef.current.setSelectionRange(caretRef.current, caretRef.current);
      caretRef.current = null;
    }
  });

  const emit = (digits: string, country: ICountryConfig) => {
    onChange(digits ? `${cleanDialOf(country)}${digits}` : "");
  };

  const handleCountrySelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const nextCountry = COUNTRY_REGISTRY[e.target.value];
    setSelectedCountry(nextCountry);
    emit(localDigits.slice(0, maxDigitsOf(nextCountry.mask)), nextCountry);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const inputType = (e.nativeEvent as InputEvent).inputType;
    let rawInput = input.value;
    let caret = input.selectionStart ?? rawInput.length;

    // Pasted numbers with the international prefix, e.g. "+49 1512 ..."
    const trimmed = rawInput.trimStart();
    if (trimmed.startsWith(selectedCountry.dialCode)) {
      const cut =
        rawInput.length - trimmed.length + selectedCountry.dialCode.length;
      rawInput = rawInput.slice(cut);
      caret = Math.max(0, caret - cut);
    }

    let digits = toDigits(rawInput);
    let digitsBeforeCaret = toDigits(rawInput.slice(0, caret)).length;

    // Only a delimiter was deleted: remove the adjacent digit instead,
    // otherwise the mask re-inserts the delimiter and the key appears dead
    if (digits === localDigits && rawInput.length < displayValue.length) {
      if (inputType === "deleteContentBackward" && digitsBeforeCaret > 0) {
        digits =
          digits.slice(0, digitsBeforeCaret - 1) +
          digits.slice(digitsBeforeCaret);
        digitsBeforeCaret -= 1;
      } else if (inputType === "deleteContentForward") {
        digits =
          digits.slice(0, digitsBeforeCaret) +
          digits.slice(digitsBeforeCaret + 1);
      }
    }

    digits = digits.slice(0, maxDigitsOf(selectedCountry.mask));
    digitsBeforeCaret = Math.min(digitsBeforeCaret, digits.length);

    caretRef.current = caretAfterDigits(
      applyMask(digits, selectedCountry.mask),
      digitsBeforeCaret,
    );
    emit(digits, selectedCountry);
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <select
        name="countrySelect"
        id="countrySelect"
        aria-label="Select Country Code"
        value={selectedCountry.code}
        style={{ padding: "8px", borderRadius: "4px" }}
        onChange={handleCountrySelectChange}
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
        inputMode="tel"
        autoComplete="tel-national"
        name="phoneNumber"
        id="phoneNumber"
        className="phoneNumber"
        value={displayValue}
        onChange={handleInputChange}
        aria-label="Phone Number Input"
        aria-invalid={isInvalid}
        placeholder={selectedCountry.mask}
        style={{
          flex: 1,
          padding: "8px",
          borderRadius: "4px",
          border: `1px solid ${isInvalid ? "#d32f2f" : "#ccc"}`,
        }}
      />
    </div>
  );
};

export { COUNTRY_REGISTRY, SmartPhoneInput };
export type { ICountryConfig, SmartPhoneInputProps };
