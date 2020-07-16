import {
  Dropdown,
  Menu,
  Item,
  Label,
  Autocomplete,
  Field,
} from "@zendeskgarden/react-dropdowns";
import React from "react";
import { MD } from "@zendeskgarden/react-typography";

export default ({
  items,
  onInputChange,
  input,
  children,
  selectedItem,
  onSelect,
  required = false,
}) => {
  const [hasEdit, setHasEdit] = React.useState(false);
  const [validation, setValidation] = React.useState(null);
  React.useEffect(() => {
    setValidation(
      required && hasEdit ? (input.length > 0 ? "success" : "error") : null
    );
  });

  const renderOptions = () => {
    if (items.length === 0) {
      return <Item disabled>No matches found</Item>;
    }

    return items.slice(0, 4).map((option) => (
      <Item key={option.id} value={option}>
        <span>{option.name}</span>
      </Item>
    ));
  };

  return (
    <Dropdown
      inputValue={input}
      selectedItem={selectedItem.name}
      onSelect={onSelect}
      onInputValueChange={onInputChange}
      downshiftProps={{
        defaultHighlightedIndex: 0,
        itemToString: (item) => item && item.name,
      }}
    >
      <Field>
        <Label>
          <MD>{children}</MD>
        </Label>
        <Autocomplete validation={validation} onFocus={() => setHasEdit(true)}>
          <span>{selectedItem.name}</span>
        </Autocomplete>
      </Field>
      <Menu>{renderOptions()}</Menu>
    </Dropdown>
  );
};
