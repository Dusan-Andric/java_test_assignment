import React, { useRef } from 'react';

import { uniqueId } from 'lodash/fp';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
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
export default function TextField({
  name,
  label,
  helperText,
  type = 'text',
  required = false,
  disabled = false,
  fullWidth = false,
  InputProps,
}) {
  const localId = useRef(uniqueId('formik-text-field-'));
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
      <Input
        {...field}
        {...InputProps}
        id={localId.current}
        type={type}
        required={required}
        disabled={disabled}
        fullWidth={fullWidth}
      />
      {helperTextDerived && (
        <FormHelperText>{helperTextDerived}</FormHelperText>
      )}
    </FormControl>
  );
}
