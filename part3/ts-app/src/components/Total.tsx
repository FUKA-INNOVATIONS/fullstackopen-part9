import React from "react";

interface TotalProps {
    exerciseSum: number
}


const Total = ({ exerciseSum }: TotalProps) => {
    return (
        <>
            <p style={{ marginTop: 40 }}>Number of exercises {exerciseSum}</p>
        </>
    )
}

export default Total