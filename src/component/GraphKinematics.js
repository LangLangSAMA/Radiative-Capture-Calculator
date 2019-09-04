import React from 'react';

// import css
import './GraphKinematics.scss';

// import images
import kinematicsGraph from "../images/kinematics_image.png";

export default class GraphKinematics extends React.Component {

    render() {

        const {
            title,
            beam,
            target,
            kinematics,
            e_res
        } = this.props;

        const beam_mass = beam.mass_amu ? beam.mass_amu : null;
        const target_mass = target.mass_amu ? target.mass_amu : null;
        const e_lab = kinematics.e_lab ? kinematics.e_lab : null;
        const p_lab = kinematics.p_lab ? kinematics.p_lab : null;
        const velocity_cm = kinematics.velocity_cm ? kinematics.velocity_cm : null;
        const max_angle = kinematics.max_angle ? kinematics.max_angle : null;

        return (
            <div className="graph-kinematics-wrapper half-width m-b-20">
                <div className="header-wrapper m-b-15">
                    <h2 className="graph-title">
                        {title}
                    </h2>
                </div>
                <div className="graph-kinematics">
                    <img className="kinematics-image" src={kinematicsGraph} alt="Kinematics Graph" />
                    {
                        beam_mass && <p className="beam-mass">{`${beam_mass} amu`}</p>
                    }
                    {
                        target_mass && <p className="target-mass">{`${target_mass} amu`}</p>
                    }
                    {
                        (e_lab && p_lab) && <p className="kinematics-vector">{`(${e_lab},0,0,${p_lab})`}</p>
                    }
                    {
                        e_res && <p className="e-res">{`${e_res} MeV`}</p>
                    }
                    {
                        velocity_cm && <p className="velocity-cm">{`${velocity_cm} c`}</p>
                    }
                    {
                        max_angle && <p className="max-angle">{`${max_angle} rad`}</p>
                    }
                </div>
            </div>
        )
    }
}