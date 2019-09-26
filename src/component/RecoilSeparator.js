import React from 'react';

// import css
import './RecoilSeparator.scss';

// import images
import md1Calibration from "../images/md1_calibration.png";
import recoilSeparator from "../images/recoil_separator.png";

export default class RecoilSeparator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            name: "csf",
            label: "CSF",
            value: ""
        }
    };

    inputOnChange = (e) => {
        const target = e.target;
        const value = target.value;

        this.setState({
            value: value
        })
    }

    fieldOnFocus = () => {
        this.setState({
            active: true
        })
    }

    fieldOnBlur = () => {
        this.setState({
            active: false
        })
    }

    render() {

        const {
            title,
        } = this.props;

        const {
            name,
            value,
            label,
            active
        } = this.state;

        let fieldClassName = "field-container input";

        if (active) {
            fieldClassName += " active";
        }

        return (
            <div className="recoil-separator-wrapper full-width">
                <div className="header-wrapper m-b-15">
                    <h2 className="title">
                        {title}
                    </h2>
                </div>
                <div className="left-control-panel">
                    <div className={fieldClassName}>
                        <div className="field">
                            <input className="field-box"
                                type="text"
                                name={name}
                                value={value}
                                onChange={this.inputOnChange}
                                onFocus={this.fieldOnFocus}
                                onBlur={this.fieldOnBlur}
                            />
                            <label className="field-label">
                                {label}
                            </label>
                        </div>
                    </div>
                    <img className="md1-calibration" src={md1Calibration} alt="MD1 Calibration" />
                </div>
                <div className="right-panel">
                    <img className="recoil-separator" src={recoilSeparator} alt="Recoil Separator" />
                </div>
            </div>
        )
    }
}