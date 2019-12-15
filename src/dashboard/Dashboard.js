import React, { useState } from "react";
import styled from "styled-components";
import { SortAndFilter } from "./SortAndFilter";
import { compose, prop, sortBy, toUpper, filter } from "ramda";

const ListContainer = styled.div({
  alignContent: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "64px"
});

const ListItem = styled.div({
  backgroundColor: "#c3c7c4",
  border: "1px solid orange",
  margin: "4px"
});

const ListItemText = styled.p({
  margin: "0px 2px"
});

const ItemType = styled(ListItemText)({
  color: "#1f8aad"
});

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
    hdd_capacity: 64
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
    hdd_capacity: 1024
  }
];

export const sortBySystemName = sortBy(compose(toUpper, prop("system_name")));
export const sortByHddCapacity = sortBy(prop("hdd_capacity"));

export const Dashboard = () => {
  const [deviceTypeFilter, setDeviceTypeFilter] = useState([
    types.WINDOWS_WORKSTATION
  ]);
  const [sortType, setSortType] = useState(sortOptions.system_name);
  const sortedData =
    sortType === sortOptions.hdd_capacity
      ? sortByHddCapacity(exampleData)
      : sortBySystemName(exampleData);

  return (
    <div>
      <ListContainer>
        <SortAndFilter
          deviceTypeFilter={deviceTypeFilter}
          setDeviceTypeFilter={setDeviceTypeFilter}
          sortType={sortType}
          setSortType={setSortType}
        />
        {sortedData.map(item => (
          <ListItem key={item.id}>
            <ListItemText>{item.system_name}</ListItemText>
            <ItemType>{item.type}</ItemType>
            <ListItemText>{`${item.hdd_capacity} GB`}</ListItemText>
          </ListItem>
        ))}
      </ListContainer>
    </div>
  );
};
