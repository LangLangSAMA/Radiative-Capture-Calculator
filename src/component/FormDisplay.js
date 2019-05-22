import React from "react";

// import css
import "./FormDisplay.scss";

const FormDisplay = (props) => {
    return (
        <form className={"form-display-wrapper " + props.className}>
            <h2 className="form-title">
                {props.title}
            </h2>
            <table>
                <thead>
                    <tr>
                        <TableHeading Heading={props.FormRow} />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <TableValue FormRow={props.FormRow} valueList={props.valueList} />
                    </tr>
                </tbody>
            </table>
        </form>
    );
}
export default FormDisplay;

const TableHeading = (props) => {
    const {
        Heading
    } = props;

    return (
        Heading.map((item, i) => {
            return (
                <th key={i}>
                    {item.label}
                    {` `}
                    {
                        item.unit &&
                        <label className="unit-label">
                            {"(" + item.unit + ")"}
                        </label>
                    }
                </th>
            )
        })
    )
}

const TableValue = (props) => {
    const {
        FormRow, valueList
    } = props;

    return (
        FormRow.map((item, i) => {
            return (
                <td key={i}>
                    {
                        valueList[item.name] ?
                            valueList[item.name] : "N/A"
                    }
                </td>
            )
        })
    )
}