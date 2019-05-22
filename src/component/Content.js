import React from "react";
// import { isotopes } from "../helper/isotopes"

// import components
import Form from "./Form";

// import data
import data from "../helper/data";
import { computeResult } from "../helper/compute";

// import css
import "./Content.scss";
import FormDisplay from "./FormDisplay";

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beam_a: "",
            beam_z: "",
            target_a: "",
            target_z: "",
            e_res: "",
            w_g: "",
        };
    }

    inputOnChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        // TODO:: Update Regular Expression Check
        this.setState({
            [name]: value
        })
    }

    render() {

        const {
            beam_a,
            beam_z,
            target_a,
            target_z,
            e_res,
            w_g,
        } = this.state;

        const result = computeResult(this.state);

        const {
            beam,
            target,
            recoil,
            resonance,
        } = result;

        const reaction_params = {
            beam_a: beam_a,
            beam_z: beam_z,
            target_a: target_a,
            target_z: target_z,
        };

        const resonance_params = {
            e_res: e_res,
            e_level: resonance.e_level,
            w_g: w_g,
        }

        // For Test Only
        // console.log(this.state);

        return (
            <div className="component-content">
                <div className="content-container">
                        <Form
                            className="reaction-params-form const-width m-r-20 m-b-20"
                            FormRow={data.ReactionParamsRow}
                            title="Reaction Parameters"
                            valueList={reaction_params}
                            fieldOnChange={this.inputOnChange}
                        />
                        <Form
                            className="resonance-params-form const-width m-b-20"
                            FormRow={data.ResonanceParamsRow}
                            title="Resonance Params"
                            valueList={resonance_params}
                            fieldOnChange={this.inputOnChange}
                        />
                        <Form
                            className="beam-form const-width m-r-20 m-b-20"
                            FormRow={data.BeamRow}
                            title="Beam Atom"
                            valueList={beam}
                        />
                        <Form
                            className="target-form const-width m-b-20"
                            FormRow={data.TargetRow}
                            title="Target Atom"
                            valueList={target}
                        />
                        <FormDisplay
                            className="recoil-form full-width"
                            FormRow={data.RecoilRow}
                            title="Recoil Atom"
                            valueList={recoil}
                        />
                </div>
            </div>
        );
    }
}
export default Content;