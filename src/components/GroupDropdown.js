import {
  Dropdown,
  Menu,
  Item,
  Label,
  Field,
  Select,
} from "@zendeskgarden/react-dropdowns";
import React from "react";
import { MD } from "@zendeskgarden/react-typography";

export default ({ groups, onSelect, selectedItem }) => {
  const renderOptions = () => {
    const groupArray = groups.map((option) => (
      <Item key={option.id} value={option}>
        <span>{option.name}</span>
      </Item>
    ));
    groupArray.unshift(
      <Item key={0} value={{ name: "Current Assignee" }}>
        <span>{"Current Assignee"}</span>
      </Item>
    );
    return groupArray;
  };
  return (
    <Dropdown
      selectedItem={selectedItem}
      onSelect={onSelect}
      downshiftProps={{ itemToString: (item) => item && item.name }}
    >
      <Field>
        <Label>
          <MD>Asignee</MD>
        </Label>
        <Select>{selectedItem.name || "Current Assignee"}</Select>
      </Field>
      <Menu>{renderOptions()}</Menu>
    </Dropdown>
  );
};
