import React from "react";

import { render, cleanup, getByAltText, getAllByTestId, fireEvent, prettyDOM, getByPlaceholderText, getByText, waitForElement, queryByText} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText, findByText } = render(<Application />);
  
    await findByText("Monday")
  
    fireEvent.click(getByText("Tuesday"))
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument()
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const {container, findByText, debug} = render(<Application />);

    await findByText("Archie Cohen");

    const appointment = getAllByTestId(container, "appointment")[0]

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
    });
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));

    const saving = getByText(appointment, "Saving")
    expect(saving).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    expect(getByText(day,"no spots remaining")).toBeInTheDocument();
  });
})
