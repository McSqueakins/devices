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
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const DashboardContainer = styled.div({
  alignContent: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "64px 408px"
});

const ListContainer = styled(Paper)({
  height: "70vh",
  padding: "16px",
  overflowY: "scroll",
  marginTop: "8px"
});

const ListItem = styled(Card)({
  backgroundColor: "#c3c7c4",
  border: "1px solid orange",
  display: "flex",
  justifyContent: "space-between",
  margin: "4px 0px"
});

export const sortBySystemName = sortBy(compose(toUpper, prop("system_name")));
export const sortByHddCapacity = sortWith([
  ascend(compose(Number, prop("hdd_capacity"))),
  ascend(prop("system_name"))
]);

export const Dashboard = () => {
  const [deviceTypeFilter, setDeviceTypeFilter] = useState();
  const [sortType, setSortType] = useState(sortOptions.system_name);
  const [devicesData, setDevicesData] = useState([]);
  const [getDataIndicator, setGetDataIndicator] = useState(true);
  const [deviceTypeEditInput, setDeviceTypeEditInput] = useState("");
  const [systemNameEditInput, setSystemNameEditInput] = useState("");
  const [hddCapacityEditInput, setHddCapacityEditInput] = useState("");

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
      <DashboardContainer>
        <Typography component="h2" variant="h3">
          Devices
        </Typography>
        <Typography variant="subtitle1">
          View, add, edit, and delete devices
        </Typography>
        <ListControls
          setGetDataIndicator={setGetDataIndicator}
          deviceTypeFilter={deviceTypeFilter}
          setDeviceTypeFilter={setDeviceTypeFilter}
          sortType={sortType}
          setSortType={setSortType}
        />
        <ListContainer>
          {sortedAndFilteredData.map(device => {
            return (
              <ListItem key={device.id} raised>
                <CardContent>
                  <Typography color="primary">{device.system_name}</Typography>
                  <Typography color="textPrimary" variant="body2">
                    {types[device.type].displayValue}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >{`${device.hdd_capacity} GB`}</Typography>
                </CardContent>
                <CardActions>
                  <DeleteDevice
                    id={device.id}
                    systemName={device.system_name}
                    setGetDataIndicator={setGetDataIndicator}
                  />
                  <EditDevice
                    device={device}
                    setGetDataIndicator={setGetDataIndicator}
                    setSystemNameInput={setSystemNameEditInput}
                    systemNameInput={systemNameEditInput}
                    setDeviceTypeInput={setDeviceTypeEditInput}
                    deviceTypeInput={deviceTypeEditInput}
                    setHddCapacityInput={setHddCapacityEditInput}
                    hddCapacityInput={hddCapacityEditInput}
                  />
                </CardActions>
              </ListItem>
            );
          })}
        </ListContainer>
      </DashboardContainer>
    </div>
  );
};
