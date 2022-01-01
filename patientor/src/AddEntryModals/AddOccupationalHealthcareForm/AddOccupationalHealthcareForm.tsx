import React from "react";
import { Grid, Button, Label } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { DiagnosisSelection, TextField } from "./FormFields";
import { OccupationalHealthcareEntry } from "../../types";
import { useStateValue } from "../../state";


export type OccupationalHealthcareFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
    onSubmit: (values: OccupationalHealthcareFormValues) => void;
    onCancel: () => void;
}


const isDate = ( date: string ): boolean => {
    return Boolean( Date.parse( date ) );
};

export const AddOccupationalHealthcareForm = ( { onSubmit, onCancel } : Props ) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: "OccupationalHealthcare",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                employerName: "",
                sickLeave: {startDate: "", endDate: ""}
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date || !isDate(values.date)) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.employerName) {
                    errors.employerName = requiredError;
                }

                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />

                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />

                        <Field
                            label="Employer name"
                            placeholder="Loma oy"
                            name="employerName"
                            component={TextField}
                        />

                        <Grid columns={3} >
                            <Grid.Column>
                                <Field
                                    label="Start date"
                                    placeholder="YYYY-MM-DD"
                                    name="sickLeave.startDate"
                                    component={TextField}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Field
                                    label="End date"
                                    placeholder="YYYY-MM-DD"
                                    name="sickLeave.endDate"
                                    component={TextField}
                                />
                            </Grid.Column>

                            <Grid.Column>
                                <Label as='a' color={'teal'}  tag>
                                    Sick leave ?
                                </Label>
                            </Grid.Column>
                        </Grid>

                        {/*<SelectField
                            label="Health check rating"
                            name="healthCheckRating"
                            options={healthCheckRatingOptions}
                        />*/}
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddOccupationalHealthcareForm;
