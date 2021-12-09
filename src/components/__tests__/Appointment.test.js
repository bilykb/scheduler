
import React from "react";

import { render, cleanup, getByAltText, getAllByTestId, fireEvent, prettyDOM, getByPlaceholderText, getByText, waitForElement, queryByText, waitForElementToBeRemoved} from "@testing-library/react";

import Application from "components/Application";
import axios from "__mocks__/axios";


afterEach(cleanup);

describe("Appointment", () => {

  it("loads data, shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const {container} = render(<Application />);

    await waitForElement(() => queryByText(container, "Archie Cohen"))

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    
    const appointment = getAllByTestId(container, "appointment")[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    await waitForElement(() => queryByText(appointment, "Error"))

    expect(getByText(appointment, "Error saving appointment. Please try again.")).toBeInTheDocument();
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("loads data, shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const {container} = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(appoint => queryByText(appoint, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, /Are you sure you would like to Delete/i)).toBeInTheDocument();
    
    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"));

    expect(getByText(appointment, "Error deleting appointment. Please try again.")).toBeInTheDocument()
  })
});