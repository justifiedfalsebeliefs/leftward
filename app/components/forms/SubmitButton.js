import React from "react";
import { useFormikContext } from "formik";
import { Button } from '@ui-kitten/components';
function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return <Button onPress={handleSubmit}>{title}</Button>;
}

export default SubmitButton;
