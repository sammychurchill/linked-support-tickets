import {
  Field,
  Label,
  Hint,
  Input,
  Message,
  Textarea,
} from "@zendeskgarden/react-forms";
import React from "react";
import { MD } from "@zendeskgarden/react-typography";

export default ({ label, required = false, value, onChange }) => {
  const [hasEdit, setHasEdit] = React.useState(false);
  const [validation, setValidation] = React.useState(null);
  React.useEffect(() => {
    setValidation(
      required && hasEdit ? (value.length > 0 ? "success" : "error") : null
    );
  });

  const getValidationMessage = (value) => {
    return "Required";
  };

  return (
    <Field>
      <Label>
        <MD>{label}</MD>
      </Label>
      <Textarea
        value={value}
        onChange={onChange}
        onFocus={() => setHasEdit(true)}
        validation={validation}
        resizable
        rows="4"
      />
    </Field>
  );
};
