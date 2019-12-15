import React, { useState, useEffect } from "react";

import axios from "axios";
import { ListControls } from "./ListControls";
import { DeleteDevice } from "./DeleteDevice";
import {
  compose,
  ascend,
  prop,
  sortWith,
  sortBy,
  toUpper,
  filter
} from "ramda";
import styled from "styled-components";
import { EditDevice } from "./EditDevice";
import { sortOptions, types } from "./constants";

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

export const sortBySystemName = sortBy(compose(toUpper, prop("system_name")));
export const sortByHddCapacity = sortWith([
  ascend(compose(Number, prop("hdd_capacity"))),
  ascend(prop("system_name"))
]);

export const Dashboard = () => {
  const [deviceTypeFilter, setDeviceTypeFilter] = useState(
    types.WINDOWS_WORKSTATION
  );
  const [sortType, setSortType] = useState(sortOptions.system_name);
  const [devicesData, setDevicesData] = useState([]);
  const [getDataIndicator, setGetDataIndicator] = useState(true);

  useEffect(() => {
    if (getDataIndicator) {
      const getData = async () => {
        const { data } = await axios("http://localhost:3000/devices");
        setDevicesData(data);
      };
      getData();
      setGetDataIndicator(false);
    }
  }, [getDataIndicator]);

  const sortedAndFilteredData = compose(
    sortType === sortOptions.hdd_capacity
      ? sortByHddCapacity
      : sortBySystemName,
    filter(device =>
      deviceTypeFilter ? device.type === deviceTypeFilter?.typeName : true
    )
  )(devicesData);

  return (
    <div>
      <ListContainer>
        <ListControls
          setGetDataIndicator={setGetDataIndicator}
          deviceTypeFilter={deviceTypeFilter}
          setDeviceTypeFilter={setDeviceTypeFilter}
          sortType={sortType}
          setSortType={setSortType}
        />
        {sortedAndFilteredData.map(item => {
          return (
            <ListItem key={item.id}>
              <div>
                <ListItemText>{item.system_name}</ListItemText>
                <ItemType>{types[item.type].displayValue}</ItemType>
                <ListItemText>{`${item.hdd_capacity} GB`}</ListItemText>
              </div>
              <ListItemOptionsContainer>
                <DeleteDevice
                  id={item.id}
                  systemName={item.system_name}
                  setGetDataIndicator={setGetDataIndicator}
                />
                <EditDevice
                  id={item.id}
                  systemName={item.system_name}
                  deviceType={item.type}
                  hddCapacity={item.hdd_capacity}
                />
              </ListItemOptionsContainer>
            </ListItem>
          );
        })}
      </ListContainer>
    </div>
  );
};
