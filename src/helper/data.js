const data = {
    KinematicsRow: [
        [
            {
                label: "Tlab",
                name: "t_lab",
                unit: "MeV",
            },
            {
                label: "Vel-squared",
                name: "vel_sq",
                unit: "MeV/u",
            },
            {
                label: "Elab",
                name: "e_lab",
                unit: "MeV"
            },
            {
                label: "plab",
                name: "p_lab",
                unit: "MeV/c"
            },
        ],
        [
            {
                label: "Ecomp",
                name: "e_comp",
                unit: "MeV"
            },
            {
                label: "Tcomp",
                name: "t_comp",
                unit: "MeV"
            },
            {
                label: "Gamma CM",
                name: "gamma_cm",
            },
            {
                label: "Velocity CM",
                name: "velocity_cm",
                unit: "c"
            },
        ],
        [
            {
                label: "Recoil Momentum",
                name: "recoil_p",
                unit: "MeV/c"
            },
            {
                label: "Recoil Velocity",
                name: "recoil_v",
                unit: "c"
            },
            {
                label: "Max Angle",
                name: "max_angle",
                unit: "rad"
            },
            {
                label: "Recoil Energy",
                name: "recoil_e",
                unit: "MeV"
            },
        ],
        [
            {
                label: "Recoil T Backward",
                name: "recoil_t_neg",
                unit: "MeV"
            },
            {
                label: "Recoil T",
                name: "recoil_t_zero",
                unit: "MeV"
            },
            {
                label: "Recoil T Forward",
                name: "recoil_t_pos",
                unit: "MeV"
            },
            {
                label: "Delta E-",
                name: "delta_e_neg",
                unit: "%"
            },
            {
                label: "Delta E+",
                name: "delta_e_pos",
                unit: "%"
            }
        ]
    ],
    ReactionParamsRow: [
        {
            label: "Beam A",
            name: "beam_a",
            required: "number"
        },
        {
            label: "Beam Z",
            name: "beam_z",
            required: "number"
        },
        {
            label: "Target A",
            name: "target_a",
            required: "number"
        },
        {
            label: "Target Z",
            name: "target_z",
            required: "number"
        },
    ],
    ResonanceParamsRow: [
        {
            label: "Eres",
            name: "e_res",
            unit: "text(MeV)",
            required: "number"
        },
        {
            label: "Elevel",
            name: "e_lvl",
            unit: "text(MeV)",
            disabled: true
        },
        {
            label: "omegagamma",
            texLabel: true,
            name: "w_g",
            unit: "text(eV)",
            required: "number"
        },
    ],
    TargetGasParamsRow: [
        {
            label: "Pressure",
            name: "pressure",
            unit: "text(T)",
            required: "number"
        },
        {
            label: "Stopping-Power",
            name: "stopping_power",
            unit: "(text(MeV) // text(mg))/ text(cm^2)",
            required: "number"
        }
    ],
    BeamRow: [
        {
            label: "Name",
            name: "name",
            disabled: true
        },
        {
            label: "Symbol",
            name: "physics_notation",
            disabled: true
        },
        {
            label: "Mass",
            name: "mass",
            unit: "text(MeV)",
            disabled: true
        }
    ],
    TargetRow: [
        {
            label: "Name",
            name: "name",
            disabled: true
        },
        {
            label: "Symbol",
            name: "physics_notation",
            disabled: true
        },
        {
            label: "Mass",
            name: "mass",
            unit: `text(MeV)`,
            disabled: true
        }
    ],
    RecoilRow: [
        {
            label: "Name",
            name: "name",
            disabled: true
        },
        {
            label: "Symbol",
            name: "physics_notation",
            disabled: true
        },
        {
            label: "Mass",
            name: "mass",
            unit: "text(MeV)",
            disabled: true
        },
        {
            label: "Q-val",
            name: "q_val",
            unit: "text(MeV)",
            disabled: true
        }
    ],
    DefaultAtom: {
        "name": "",
        "symbol": "",
        "physics_notation": "",
        "atomic_number": "",
        "mass_number": "",
        "mass": ""
    },
    DefaultRecoilAtom: {
        "name": "",
        "symbol": "",
        "physics_notation": "",    
        "atomic_number": "",
        "mass_number": "",
        "mass": "",
        "q_val": ""
    },
    DefaultResonance: {
        "e_res": "",
        "e_lvl": "",
        "w_g": "",
    },
    DefaultKinematics: {
        "reduced_mass_amu": "",
        "reduced_mass_mev": "",
        "t_lab": ""
    },
    atomic_mass_unit: 931.494,
}
export default data;