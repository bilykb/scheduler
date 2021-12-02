import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import {Form} from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  
  it("renders without student name if not provider", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers} student="" />)
    
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });
  
  it("renders with initial student name", () => {
    const { getByTestId } = render(<Form interviewers={interviewers} student="Lydia Miller-Jones" />)

    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {

    const onSave = jest.fn()

    
    const { getByText } = render(
    <Form 
      interviewers={interviewers} 
      onSave={onSave} 
      student="" 
    />)
    
    fireEvent.click(getByText("Save"))

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    expect(onSave).not.toHaveBeenCalled();
  })

  it("calls onSave function when the name is defined", () => {
    const onSave = jest.fn();
  
    const { getByText, queryByText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
        student="Lydia Miller-Jones"
      />
    );
  
    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  if("submits the name entered by the user", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    const input = getByPlaceholderText("Enter Student Name");

    fireEvent.change(input, { target: {value: "Lydia Miller-Jones"}});
    fireEvent.click(getByText("Save"));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
});