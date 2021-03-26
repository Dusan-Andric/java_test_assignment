import React, { useRef } from 'react';

import { uniqueId } from 'lodash/fp';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { useField } from 'formik';

/**
 * Formik wrapper for material-ui TextField kinda component.
 * It uses the more basic components:
 *
 * ```
 * <FormControl>
 *   <InputLabel />
 *   <Input />
 *   <FormHelperText />
 * </FormControl>
 *
 * ```
 * @param {*} param0
 */
export default function SelectField({
  name,
  label,
  helperText,
  required = false,
  disabled = false,
  fullWidth = false,
  InputProps,
  items = [],
}) {
  const localId = useRef(uniqueId('formik-select-field-'));
  const [field, meta /*, helpers*/] = useField(name);

  const isTouched = meta.touched;
  const hasError = Boolean(meta.error);

  const helperTextDerived = isTouched && hasError ? meta.error : helperText;

  return (
    <FormControl
      error={isTouched && hasError}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {label && <InputLabel htmlFor={localId.current}>{label}</InputLabel>}
      <Select
        id={localId.current}
        labelId={localId.current}
        {...field}
        {...InputProps}
        required={required}
        disabled={disabled}
        fullWidth={fullWidth}
      >
        {items.map(({ value, label }) => (
          <MenuItem value={value} key={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {helperTextDerived && (
        <FormHelperText>{helperTextDerived}</FormHelperText>
      )}
    </FormControl>
  );
}
