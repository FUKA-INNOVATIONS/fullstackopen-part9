import React from "react";
import { CoursePart } from "../types";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = ( value: never ): never => {
    throw new Error(
        `Unhandled discriminated union member: ${ JSON.stringify( value ) }`
    );
};


const Part = ( props: CoursePart ) => {
    switch ( props.type ) {
        case 'normal':
            return (
                <>
                    <b>{ props.name } { props.exerciseCount }</b>
                    <p>{ props.description }</p>
                </>
            )
        case "groupProject":
            //const { name, exerciseCount, groupProjectCount, type } = props
            return (
                <>
                    <b>{ props.name } { props.exerciseCount }</b>
                    <p>Project exercises { props.groupProjectCount } </p>
                </>
            )
        case "submission":
            //const { name, exerciseCount, groupProjectCount, type } = props
            return (
                <>
                    <b>{ props.name } { props.exerciseCount } </b>
                    <p>{ props.description }</p>
                    <p>
                        Submit to:
                        <a href={ props.exerciseSubmissionLink }>{ props.exerciseSubmissionLink }</a>
                    </p>

                </>
            )
        case "special":
            return (
                <>
                    <b>{ props.name } { props.exerciseCount }</b>
                    <p>{ props.description }</p>
                    <p>Required skills: { props.requirements.map( r => `${ r },` ) }</p>
                </>
            )
        default:
            assertNever(props)
            return (
                <p>unknown part found</p>
            )
    }
}

export default Part;