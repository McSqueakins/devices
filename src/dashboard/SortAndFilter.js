import React, { useState } from "react";
import styled from "styled-components";

const ActiveOptionsBox = styled.div({
  border: "1px solid #c3c7c4",
  position: "relative",
  margin: "4px",
  padding: "4px"
});

const ListOptions = styled.div({
  display: "flex",
  flexDirection: "row"
});
const ActiveFilterOptionBox = styled(ActiveOptionsBox)({
  width: "244px"
});

const ActiveSortOptionBox = styled(ActiveOptionsBox)({
  width: "164px"
});

const OptionsMenu = styled.div({
  backgroundColor: "#303331",
  boxShadow: "0 1px 15px rgba(27, 31, 35, 0.15)",
  position: "absolute",
  top: "auto",
  zIndex: 100
});

const MenuOption = styled.li({
  display: "block",
  margin: "2px"
});

const types = {
  WINDOWS_WORKSTATION: "Windows Workstation",
  WINDOWS_SERVER: "Windows Server",
  MAC: "MAC"
};

const sortOptions = {
  hddCapacity: "HDD Capacity",
  systemName: "System Name"
};

export const SortAndFilter = ({
  deviceTypeFilter,
  setDeviceTypeFilter,
  sortType,
  setSortType
}) => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  return (
    <ListOptions>
      <ActiveFilterOptionBox
        onClick={() => {
          setFilterMenuOpen(!filterMenuOpen);
        }}
      >
        Device Type: {deviceTypeFilter || "All"}
        {filterMenuOpen && (
          <OptionsMenu>
            {Object.values(types).map(type => (
              <MenuOption
                key={type}
                onClick={() => {
                  setDeviceTypeFilter(type);
                }}
              >
                {type}
              </MenuOption>
            ))}
          </OptionsMenu>
        )}
      </ActiveFilterOptionBox>
      <ActiveSortOptionBox
        onClick={() => {
          setSortMenuOpen(!sortMenuOpen);
        }}
      >
        Sort by: {sortType}
        {sortMenuOpen && (
          <OptionsMenu>
            {Object.values(sortOptions).map(sortOption => (
              <MenuOption
                key={sortOption}
                onClick={() => {
                  setSortType(sortOption);
                }}
              >
                {sortOption}
              </MenuOption>
            ))}
          </OptionsMenu>
        )}
      </ActiveSortOptionBox>
    </ListOptions>
  );
};
