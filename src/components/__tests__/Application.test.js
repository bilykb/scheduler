import React from "react";

import { render, cleanup, getByAltText, getAllByTestId, fireEvent, prettyDOM, getByPlaceholderText, getByText, waitForElement, queryByText, findByText, findByAltText, getByDisplayValue, debug} from "@testing-library/react";

import Application from "components/Application";
import axios from '__mocks__/axios'

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText, findByText } = render(<Application />);
  
    await findByText("Monday")
  
    fireEvent.click(getByText("Tuesday"))
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument()
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const {container, findByText} = render(<Application />);
    await findByText("Archie Cohen");

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
    });
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));

    const saving = getByText(appointment, "Saving");
    expect(saving).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const {container} = render(<Application />);
    await findByText(container, "Archie Cohen");

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

    const appointment = getAllByTestId(container, "appointment")[1];

    fireEvent.click(getByAltText(appointment, "Edit"))
    expect(getByDisplayValue(appointment, "Archie Cohen")).toBeInTheDocument();
    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Brett Bilyk" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    const saving = getByText(appointment, "Saving");
    expect(saving).toBeInTheDocument();

    await findByText(appointment, "Brett Bilyk");
    await findByText(appointment, "Sylvia Palmer");

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const {container} = render(<Application />);
    await findByText(container, "Archie Cohen");
    
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

    const appointment = getAllByTestId(container, "appointment")[1];
    
    fireEvent.click(getByAltText(appointment, "Delete"));
    
    const deleteOption = getByText(appointment, "Are you sure you would like to Delete?");
    expect(deleteOption).toBeInTheDocument();
    
    fireEvent.click(getByText(appointment, "Confirm"));
    await findByText(appointment, "Deleting");
    
    await findByAltText(appointment, "Add");
    
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
});
