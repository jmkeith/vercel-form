"use client";

import {
  chakra,
  Field,
  Input,
  NativeSelect,
  useSlotRecipe,
  type InputProps,
} from "@chakra-ui/react";
import { useState, type ReactNode } from "react";
import { LuGlobe } from "react-icons/lu";
import { countries, INTERNATIONAL } from "./countries";
import { phoneFieldSlotRecipe } from "./PhoneField.recipe";

export interface PhoneFieldProps {
  /** Submitted form key; the country is submitted as `${name}_country`. */
  name: string;
  label: ReactNode;
  placeholder?: string;
  /** ISO 3166-1 alpha-2 code; "ZZ" means international. */
  defaultCountry?: string;
  /** Controlled country code. Leave unset to let the field manage it. */
  country?: string;
  onCountryChange?: (country: string) => void;
  required?: boolean;
  invalid?: boolean;
  errorText?: ReactNode;
  /** Extra props for the number `<input>`, e.g. a form library's value, handlers and ref. */
  inputProps?: InputProps & { ref?: React.Ref<HTMLInputElement> };
}

const flagUrl = (code: string) =>
  `https://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`;

export function PhoneField({
  name,
  label,
  placeholder,
  defaultCountry = "US",
  country: countryProp,
  onCountryChange,
  required,
  invalid,
  errorText,
  inputProps,
}: PhoneFieldProps) {
  const [ownCountry, setOwnCountry] = useState(defaultCountry);
  const country = countryProp ?? ownCountry;
  const recipe = useSlotRecipe({ recipe: phoneFieldSlotRecipe });
  const styles = recipe();
  const countryName = countries.find((item) => item.code === country)?.name ?? country;

  const handleCountryChange = (next: string) => {
    setOwnCountry(next);
    onCountryChange?.(next);
  };

  return (
    // `target` points the label at the number input rather than the country select.
    <Field.Root unstyled css={styles.root} required={required} invalid={invalid} target="number">
      <Field.Label css={styles.label}>{label}</Field.Label>
      <chakra.div css={styles.control} data-invalid={invalid ? "" : undefined}>
        <chakra.div css={styles.country}>
          <Field.Item value="country">
            <NativeSelect.Root unstyled>
              <NativeSelect.Field
                css={styles.countrySelect}
                name={`${name}_country`}
                aria-label="Phone number country"
                value={country}
                onChange={(event) => handleCountryChange(event.currentTarget.value)}
              >
                {countries.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </NativeSelect.Field>
            </NativeSelect.Root>
          </Field.Item>
          {country === INTERNATIONAL ? (
            <LuGlobe size={16} />
          ) : (
            <chakra.img css={styles.flag} src={flagUrl(country)} alt={countryName} />
          )}
        </chakra.div>
        <Field.Item value="number">
          <Input
            unstyled
            css={styles.input}
            name={name}
            type="tel"
            placeholder={placeholder}
            autoComplete="tel-national"
            {...inputProps}
          />
        </Field.Item>
      </chakra.div>
      <Field.ErrorText css={styles.errorText}>{errorText}</Field.ErrorText>
    </Field.Root>
  );
}
