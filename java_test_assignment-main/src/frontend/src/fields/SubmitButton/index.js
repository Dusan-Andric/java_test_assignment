import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CircularProgress,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { isNil } from 'lodash/fp';
import { useFormikContext } from 'formik';

const useStyles = makeStyles(theme => ({
  progress: {
    marginRight: theme.spacing(1),
  },
}));

const propTypes = {
  submitLabel: PropTypes.node,
};

export default function SubmitButton(props) {
  const { isSubmitting } = useFormikContext();

  return <SubmitButtonWithoutFormik isSubmitting={isSubmitting} {...props} />;
}

/**
 * Do not set to type=submit and also submit form inside onClick.
 * There is a strange firefox bug, which will submit the form twice.
 *
 * @param {*} param0
 */
export function SubmitButtonWithoutFormik({
  submitLabel,
  children,
  disabled,
  isSubmitting,
  onClick,
  ...props
}) {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      onClick={onClick}
      {...props}
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? (
        <React.Fragment>
          <CircularProgress className={classes.progress} size={20} />
          {submitLabel && (
            <Typography color="textSecondary">{submitLabel}</Typography>
          )}
          {isNil(submitLabel) && children}
        </React.Fragment>
      ) : (
        children
      )}
    </Button>
  );
}

SubmitButton.propTypes = propTypes;

SubmitButtonWithoutFormik.propTypes = {
  ...propTypes,
  isSubmitting: PropTypes.bool.isRequired,
};
