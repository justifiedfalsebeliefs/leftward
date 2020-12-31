import React from "react";
import { useFormikContext } from "formik";
import { Button } from "@ui-kitten/components";
function SubmitButton({ title, style }) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button onPress={handleSubmit} style={style}>
      {title}
    </Button>
  );
}

export default SubmitButton;
