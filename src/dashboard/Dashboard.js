import React, { useState } from "react";
import styled from "styled-components";
import { ListControls } from "./ListControls";
import { compose, prop, sortBy, toUpper, filter } from "ramda";

const ListContainer = styled.div({
  alignContent: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "64px 512px"
});

const ListItem = styled.div({
  backgroundColor: "#c3c7c4",
  border: "1px solid orange",
  display: "flex",
  justifyContent: "space-between",
  margin: "4px"
});

const ListItemText = styled.p({
  margin: "0px 2px"
});

const ItemType = styled(ListItemText)({
  color: "#1f8aad"
});

const ListItemOptionsContainer = styled.div({
  display: "flex",
  alignItems: "center"
});

const StyledButton = styled.button`
  border: none;
  background-color: ${props => (props.cta ? "#00838f" : "transparent")};
  cursor: pointer;
  margin: 4px;
  padding: 4px;
  width: 56px;
  :hover {
    background-color: ${props => (props.cta ? "#006064" : "#b6bab7")};
  }
  :focus {
    outline: none;
  }
`;

const types = {
  WINDOWS_WORKSTATION: "Windows Workstation",
  WINDOWS_SERVER: "Windows Server",
  MAC: "MAC"
};

const sortOptions = {
  hdd_capacity: "HDD Capacity",
  system_name: "System Name"
};

const exampleData = [
  {
    id: "123456",
    system_name: `${types.WINDOWS_WORKSTATION} 1`,
    type: types.WINDOWS_WORKSTATION,
    hdd_capacity: 1024
  },
  {
    id: "234567",
    system_name: `${types.WINDOWS_SERVER} 1`,
    type: types.WINDOWS_SERVER,
    hdd_capacity: 128
  },
  {
    id: "345678",
    system_name: `${types.MAC} 1`,
    type: types.MAC,
    hdd_capacity: 256
  },
  {
    id: "456789",
    system_name: `${types.WINDOWS_WORKSTATION} 2`,
    type: types.WINDOWS_WORKSTATION,
    hdd_capacity: 64
  }
];

export const sortBySystemName = sortBy(compose(toUpper, prop("system_name")));
export const sortByHddCapacity = sortBy(prop("hdd_capacity"));

export const Dashboard = () => {
  const [deviceTypeFilter, setDeviceTypeFilter] = useState(
    types.WINDOWS_WORKSTATION
  );
  const [sortType, setSortType] = useState(sortOptions.system_name);
  const sortedAndFilteredData = compose(
    sortType === sortOptions.hdd_capacity
      ? sortByHddCapacity
      : sortBySystemName,
    filter(device =>
      deviceTypeFilter ? device.type === deviceTypeFilter : true
    )
  )(exampleData);

  return (
    <div>
      <ListContainer>
        <ListControls
          deviceTypeFilter={deviceTypeFilter}
          setDeviceTypeFilter={setDeviceTypeFilter}
          sortType={sortType}
          setSortType={setSortType}
        />
        {sortedAndFilteredData.map(item => (
          <ListItem key={item.id}>
            <div>
              <ListItemText>{item.system_name}</ListItemText>
              <ItemType>{item.type}</ItemType>
              <ListItemText>{`${item.hdd_capacity} GB`}</ListItemText>
            </div>
            <ListItemOptionsContainer>
              <StyledButton>Delete</StyledButton>
              <StyledButton cta>Edit</StyledButton>
            </ListItemOptionsContainer>
          </ListItem>
        ))}
      </ListContainer>
    </div>
  );
};
