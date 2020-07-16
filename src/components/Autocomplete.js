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

export default ({ items, onSelect, selectedItem, children }) => {
  const [input, setInput] = React.useState("");
  const [renderedOptions, setRenderedOptions] = React.useState(items);

  React.useEffect(() => {
    if (items.length === 0) {
      setRenderedOptions(<Item disabled>No macros found</Item>);
    } else {
      if (input.length === 0) {
        setRenderedOptions(
          items.map((option) => (
            <Item key={option.id} value={option}>
              <span>{option.name}</span>
            </Item>
          ))
        );
      } else {
        const filteredItems = items.filter((item) => {
          return item.name.toLowerCase().startsWith(input.toLocaleLowerCase());
        });
        setRenderedOptions(
          filteredItems.map((option) => (
            <Item key={option.id} value={option}>
              <span>{option.name}</span>
            </Item>
          ))
        );
      }
    }
  }, [input]);

  return (
    <Dropdown
      inputValue={input}
      selectedItem={selectedItem.name}
      onSelect={onSelect}
      onInputValueChange={(value) => setInput(value)}
      downshiftProps={{
        defaultHighlightedIndex: 0,
        itemToString: (item) => item && item.name,
      }}
    >
      <Field>
        <Label>
          <MD>{children}</MD>
        </Label>
        <Autocomplete>
          <span>{selectedItem.name}</span>
        </Autocomplete>
      </Field>
      <Menu>{renderedOptions}</Menu>
    </Dropdown>
  );
};
