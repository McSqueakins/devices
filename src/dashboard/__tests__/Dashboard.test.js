import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import App from "../../App";
import nock from "nock";

describe("The Dashboard", () => {
  beforeEach(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  const mockDevices = [
    {
      id: "e8okoP2l5",
      system_name: "DESKTOP-SMART",
      type: "WINDOWS_WORKSTATION",
      hdd_capacity: "10"
    },
    {
      id: "Th3ngERn9",
      system_name: "MAC-LEADER",
      type: "MAC",
      hdd_capacity: "2048"
    },
    {
      id: "Q1JdBnE12",
      system_name: "ARMANDO-SERVER",
      type: "WINDOWS_SERVER",
      hdd_capacity: "256"
    },
    {
      id: "e7ocoQ2n3",
      system_name: "MIGUEL-PC",
      type: "WINDOWS_WORKSTATION",
      hdd_capacity: "500"
    }
  ];

  it("displays all data by default", async () => {
    nock("http://localhost:3000")
      .get("/devices")
      .reply(200, mockDevices);

    const { getByText } = render(<App />);
    const device1 = await waitForElement(() => getByText("DESKTOP-SMART"));
    const device2 = await waitForElement(() => getByText("MAC-LEADER"));
    const device3 = await waitForElement(() => getByText("ARMANDO-SERVER"));
    const device4 = await waitForElement(() => getByText("MIGUEL-PC"));

    expect(device1).toBeInTheDocument();
    expect(device2).toBeInTheDocument();
    expect(device3).toBeInTheDocument();
    expect(device4).toBeInTheDocument();
  });
  it("will filter by device type windows workstation", async () => {
    nock("http://localhost:3000")
      .get("/devices")
      .reply(200, mockDevices);

    const { getByTestId, getByText, queryByText } = render(<App />);

    await waitForElement(() => getByText("ARMANDO-SERVER"));

    fireEvent.click(getByTestId("filter-option-dropdown"));
    fireEvent.click(getByTestId("filter-WINDOWS_WORKSTATION"));

    expect(getByText("DESKTOP-SMART")).toBeInTheDocument();
    expect(getByText("MIGUEL-PC")).toBeInTheDocument();
    expect(queryByText("MAC-LEADER")).not.toBeInTheDocument();
    expect(queryByText("ARMANDO-SERVER")).not.toBeInTheDocument();
  });
  it("will filter by device type windows server", async () => {
    nock("http://localhost:3000")
      .get("/devices")
      .reply(200, mockDevices);

    const { getByTestId, getByText, queryByText } = render(<App />);

    await waitForElement(() => getByText("ARMANDO-SERVER"));

    fireEvent.click(getByTestId("filter-option-dropdown"));
    fireEvent.click(getByTestId("filter-WINDOWS_SERVER"));

    expect(getByText("ARMANDO-SERVER")).toBeInTheDocument();
    expect(queryByText("MIGUEL-PC")).not.toBeInTheDocument();
    expect(queryByText("MAC-LEADER")).not.toBeInTheDocument();
    expect(queryByText("DESKTOP-SMART")).not.toBeInTheDocument();
  });
  it("will filter by device type mac", async () => {
    nock("http://localhost:3000")
      .get("/devices")
      .reply(200, mockDevices);

    const { getByTestId, getByText, queryByText } = render(<App />);

    await waitForElement(() => getByText("ARMANDO-SERVER"));

    fireEvent.click(getByTestId("filter-option-dropdown"));
    fireEvent.click(getByTestId("filter-MAC"));

    expect(getByText("MAC-LEADER")).toBeInTheDocument();
    expect(queryByText("ARMANDO-SERVER")).not.toBeInTheDocument();
    expect(queryByText("MIGUEL-PC")).not.toBeInTheDocument();
    expect(queryByText("DESKTOP-SMART")).not.toBeInTheDocument();
  });

  it("sorts the data alphabetically by system name by default", async () => {
    nock("http://localhost:3000")
      .get("/devices")
      .reply(200, mockDevices);

    const { getAllByTestId } = render(<App />);

    const displayedDevices = await waitForElement(() =>
      getAllByTestId("device-name")
    );

    expect(displayedDevices[0]).toHaveTextContent("ARMANDO-SERVER");
    expect(displayedDevices[1]).toHaveTextContent("DESKTOP-SMART");
    expect(displayedDevices[2]).toHaveTextContent("MAC-LEADER");
    expect(displayedDevices[3]).toHaveTextContent("MIGUEL-PC");
  });

  it("sorts the data by hdd capacity when instructed", async () => {
    nock("http://localhost:3000")
      .get("/devices")
      .reply(200, mockDevices);

    const { getByText, getByTestId, getAllByTestId } = render(<App />);

    await waitForElement(() => getAllByTestId("device-name"));

    fireEvent.click(getByTestId("sort-option-dropdown"));
    fireEvent.click(getByText("HDD Capacity"));

    const displayedDevices = getAllByTestId("device-name");

    expect(displayedDevices[0]).toHaveTextContent("DESKTOP-SMART");
    expect(displayedDevices[1]).toHaveTextContent("ARMANDO-SERVER");
    expect(displayedDevices[2]).toHaveTextContent("MIGUEL-PC");
    expect(displayedDevices[3]).toHaveTextContent("MAC-LEADER");
  });
});
