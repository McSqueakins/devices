import React, { useState } from "react";
import styled from "styled-components";
import { SvgIcon } from "@material-ui/core";
import { OutsideClickHandler } from "./OutsideClickHandler";
import { AddDevice } from "./AddDevice";
import { types, sortOptions } from "./constants";

const ActiveOptionsBox = styled.div({
  alignItems: "center",
  border: "1px solid #c3c7c4",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  position: "relative",
  margin: "4px",
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

const filterOptionsBoxWidth = 272;
const ActiveFilterOptionBox = styled(ActiveOptionsBox)({
  width: `${filterOptionsBoxWidth}px`
});

const sortOptionsBoxWidth = 192;
const ActiveSortOptionBox = styled(ActiveOptionsBox)({
  width: `${sortOptionsBoxWidth}px`
});

const OptionsMenu = styled.div`
  background-color: #303331;
  box-shadow: 0 1px 15px rgba(27, 31, 35, 0.15);
  display: block;
  position: absolute;
  top: 32px;
  left: 0px;
  width: ${props => props.width}px;
  z-index: 100;
`;

const MenuOption = styled.li({
  display: "block",
  margin: "2px"
});

export const ListControls = ({
  deviceTypeFilter,
  setDevicesData,
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
            Device Type: {deviceTypeFilter?.displayValue ?? "All"}
            <SvgIcon>
              <path
                fill="#000000"
                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
              />
            </SvgIcon>
            {filterMenuOpen && (
              <OptionsMenu width={filterOptionsBoxWidth - 2}>
                <MenuOption
                  onClick={() => {
                    setDeviceTypeFilter(null);
                  }}
                >
                  All
                </MenuOption>
                {Object.values(types).map(type => (
                  <MenuOption
                    key={type.typeName}
                    onClick={() => {
                      setDeviceTypeFilter(type);
                    }}
                  >
                    {type.displayValue}
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
            Sort by: {sortType}
            <SvgIcon>
              <path
                fill="#000000"
                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
              />
            </SvgIcon>
            {sortMenuOpen && (
              <OptionsMenu width={sortOptionsBoxWidth - 2}>
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
        </OutsideClickHandler>
      </SortAndFilterContainer>
      <div>
        <AddDevice setDevicesData={setDevicesData} />
      </div>
    </ListOptions>
  );
};
