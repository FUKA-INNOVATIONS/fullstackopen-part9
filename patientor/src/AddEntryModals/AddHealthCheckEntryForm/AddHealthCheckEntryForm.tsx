import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { DiagnosisSelection, TextField, SelectField, healthCheckRatingOption } from "./FormFields";
import { HealthCheckEntry, HealthCheckRating } from "../../types";
import { useStateValue } from "../../state";


export type HealthCheckFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
    onSubmit: (values: HealthCheckFormValues) => void;
    onCancel: () => void;
}

const healthCheckRatingOptions: healthCheckRatingOption[] = [
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.LowRisk, label: "Low Risk" },
    { value: HealthCheckRating.HighRisk, label: "High Risk" },
    { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" }
];

const isDate = ( date: string ): boolean => {
    return Boolean( Date.parse( date ) );
};

export const AddHealthCheckEntryForm = ( { onSubmit, onCancel } : Props ) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: "HealthCheck",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                healthCheckRating: 0
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
                /*if (!values.discharge.date || !isDate(values.discharge.date)) {
                    errors.dischargeDate = requiredError;
                }
                if (!values.discharge.criteria) {
                    errors.dischargeCriteria = requiredError;
                }*/
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

                        <SelectField
                            label="Health check rating"
                            name="healthCheckRating"
                            options={healthCheckRatingOptions}
                        />
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

export default AddHealthCheckEntryForm;
