import { Form, Formik } from "formik";
import React from "react";

const FormikStepper = ({ children, Step, SetStep, ...props }) => {
  const ChildrensArray = React.Children.toArray(children);
  const CurrentChild = ChildrensArray[Step - 1];
  const IsLastStep = () => Step === ChildrensArray.length;

  return (
    <Formik
      {...props}
      onSubmit={async (values, helpers) => {
        if (IsLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          SetStep((S) => S + 1);
        }
      }}
    >
      <Form autoComplete="off">{CurrentChild}</Form>
    </Formik>
  );
};

export default FormikStepper;
