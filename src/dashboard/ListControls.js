import React, { useState } from "react";
import styled from "styled-components";
import { SvgIcon } from "@material-ui/core";
import { OutsideClickHandler } from "./OutsideClickHandler";
import { AddDevice } from "./AddDevice";
import { types, sortOptions } from "./constants";
import Typography from "@material-ui/core/Typography";

const ActiveOptionsBox = styled.div({
  alignItems: "center",
  border: "1px solid #c3c7c4",
  borderRadius: "4px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  position: "relative",
  marginRight: "4px",
  padding: "4px"
});

const ListOptions = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between"
});

const SortAndFilterContainer = styled.div({
  display: "flex",
  flexDirection: "row"
});

const filterOptionsBoxWidth = 288;
const ActiveFilterOptionBox = styled(ActiveOptionsBox)({
  width: `${filterOptionsBoxWidth}px`
});

const sortOptionsBoxWidth = 200;
const ActiveSortOptionBox = styled(ActiveOptionsBox)({
  width: `${sortOptionsBoxWidth}px`
});

const OptionsMenu = styled.div`
  background-color: #ffffff;
  border-left: 1px solid #c3c7c4;
  border-right: 1px solid #c3c7c4;
  border-bottom: 1px solid #c3c7c4;
  border-radius: 0 0 4px 4px;
  display: block;
  position: absolute;
  top: 31px;
  left: -1px;
  width: ${props => props.width}px;
  z-index: 100;
`;

const MenuOption = styled.li({
  display: "block",
  margin: "2px",
  ":hover": {
    backgroundColor: "#e0e0e0"
  }
});

export const ListControls = ({
  deviceTypeFilter,
  setGetDataIndicator,
  setDeviceTypeFilter,
  sortType,
  setSortType
}) => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  return (
    <ListOptions>
      <SortAndFilterContainer>
        <OutsideClickHandler callBack={() => setFilterMenuOpen(false)}>
          <ActiveFilterOptionBox
            onClick={() => {
              setFilterMenuOpen(!filterMenuOpen);
            }}
          >
            <Typography>
              Device Type: {deviceTypeFilter?.displayValue ?? "All"}
            </Typography>
            <SvgIcon>
              <path
                fill="#000000"
                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
              />
            </SvgIcon>
            {filterMenuOpen && (
              <OptionsMenu width={filterOptionsBoxWidth}>
                <MenuOption
                  onClick={() => {
                    setDeviceTypeFilter(null);
                  }}
                >
                  <Typography>All</Typography>
                </MenuOption>
                {Object.values(types).map(type => (
                  <MenuOption
                    key={type.typeName}
                    onClick={() => {
                      setDeviceTypeFilter(type);
                    }}
                  >
                    <Typography>{type.displayValue}</Typography>
                  </MenuOption>
                ))}
              </OptionsMenu>
            )}
          </ActiveFilterOptionBox>
        </OutsideClickHandler>
        <OutsideClickHandler callBack={() => setSortMenuOpen(false)}>
          <ActiveSortOptionBox
            onClick={() => {
              setSortMenuOpen(!sortMenuOpen);
            }}
          >
            <Typography>Sort by: {sortType} </Typography>
            <SvgIcon>
              <path
                fill="#000000"
                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
              />
            </SvgIcon>
            {sortMenuOpen && (
              <OptionsMenu width={sortOptionsBoxWidth}>
                {Object.values(sortOptions).map(sortOption => (
                  <MenuOption
                    key={sortOption}
                    onClick={() => {
                      setSortType(sortOption);
                    }}
                  >
                    <Typography>{sortOption}</Typography>
                  </MenuOption>
                ))}
              </OptionsMenu>
            )}
          </ActiveSortOptionBox>
        </OutsideClickHandler>
      </SortAndFilterContainer>
      <div>
        <AddDevice setGetDataIndicator={setGetDataIndicator} />
      </div>
    </ListOptions>
  );
};
