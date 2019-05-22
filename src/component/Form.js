import React from "react";

// import css
import "./Form.scss";

const Form = (props) => {
    return (
        <form className={"form-wrapper " + props.className}>
            <h2 className="form-title">
                {props.title}
            </h2>
            <FormList
                FormRow={props.FormRow}
                valueList={props.valueList}
                fieldOnChange={props.fieldOnChange}
            />
        </form>
    );
}
export default Form;

const FormList = (props) => {
    return (
        props.FormRow.map((item, i) => {
            return (
                <FormField
                    key={i}
                    item={item}
                    value={props.valueList[item.name]}
                    fieldOnChange={props.fieldOnChange}
                />
            )
        })
    )
}

class FormField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        const {
            item, value, fieldOnChange
        } = this.props;

        const {
            label, name, unit, disabled, required
        } = item;

        let fieldClassName = "field-container";

        switch (required) {
            case "number":
                if (isNaN(value)) {
                    fieldClassName += " error"
                }
                break;
            default:
                break;
        }

        if (disabled) {
            fieldClassName += " disabled";
        } else {
            fieldClassName += " input";
        }

        return (
            <div className={fieldClassName}>
                <label className="field-label">
                    {label}
                </label>
                <div className="field">
                    <input className="field-box"
                        type="text"
                        name={name}
                        value={value}
                        disabled={disabled}
                        onChange={fieldOnChange}
                    />
                    {
                        unit &&
                        <label className="unit-label">
                            {unit}
                        </label>
                    }
                </div>
            </div>
        );
    }
}