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
            active: this.props.csf ? true : false
        }
    };

    fieldOnFocus = () => {
        this.setState({
            active: true
        })
    }

    fieldOnBlur = () => {
        if (!this.props.csf) {
            this.setState({
                active: false
            })
        }
    }

    render() {

        const {
            title,
            SeparatorRow,
            csf,
            separator
        } = this.props;

        const {
            label,
            name,
            disabled
        } = SeparatorRow;

        const {
            active
        } = this.state;

        const {
            MD1,
            MD2,
            Q1,
            Q2,
            Q3,
            Q4,
            Q5,
            Q6,
            Q7,
            Q8,
            Q9,
            Q10,
            ED1_beam,
            ED2_beam,
            ED1_recoil,
            ED2_recoil,
            ToF_beam,
            ToF_recoil,
            MCP_beam,
            MCP_recoil
        } = separator;

        let fieldClassName = "field-container input";

        if (active) {
            fieldClassName += " active";
        }

        if (disabled) {
            fieldClassName += " disabled";
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
                                value={csf}
                                disabled={disabled}
                                onChange={this.props.inputOnChange}
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
                    {
                        MD1 && <p className="md1">{`${MD1} G`}</p>
                    }
                    {
                        MD2 && <p className="md2">{`${MD2} G`}</p>
                    }
                    {
                        ED1_beam && <p className="ed1-beam">{`Beam: ${ED1_beam} kV`}</p>
                    }
                    {
                        ED1_recoil && <p className="ed1-recoil">{`Recoil: ${ED1_recoil} kV`}</p>
                    }
                    {
                        ED2_beam && <p className="ed2-beam">{`Beam: ${ED2_beam} kV`}</p>
                    }
                    {
                        ED2_recoil && <p className="ed2-recoil">{`Recoil: ${ED2_recoil} kV`}</p>
                    }
                    {
                        ToF_beam && <p className="tof-beam">{`ToF Beam: ${ToF_beam} s`}</p>
                    }
                    {
                        ToF_recoil && <p className="tof-recoil">{`ToF Recoil: ${ToF_recoil} s`}</p>
                    }
                    {
                        MCP_beam && <p className="mcp-beam">{`MCP Beam: ${MCP_beam} s`}</p>
                    }
                    {
                        MCP_recoil && <p className="mcp-recoil">{`MCP Beam: ${MCP_recoil} s`}</p>
                    }
                    {
                        Q1 && <p className="q1">{`Q1: ${Q1} G`}</p>
                    }
                    {
                        Q2 && <p className="q2">{`Q2: ${Q2} G`}</p>
                    }
                    {
                        Q3 && <p className="q3">{`Q3: ${Q3} G`}</p>
                    }
                    {
                        Q4 && <p className="q4">{`Q4: ${Q4} G`}</p>
                    }
                    {
                        Q5 && <p className="q5">{`Q5: ${Q5} G`}</p>
                    }
                    {
                        Q6 && <p className="q6">{`Q6: ${Q6} G`}</p>
                    }
                    {
                        Q7 && <p className="q7">{`Q7: ${Q7} G`}</p>
                    }
                    {
                        Q8 && <p className="q8">{`Q8: ${Q8} G`}</p>
                    }
                    {
                        Q9 && <p className="q9">{`Q9: ${Q9} G`}</p>
                    }
                    {
                        Q10 && <p className="q10">{`Q10: ${Q10} G`}</p>
                    }
                </div>
            </div>
        )
    }
}