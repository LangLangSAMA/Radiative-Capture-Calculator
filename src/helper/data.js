const data = {
    KinematicsRow: [
        [
            {
                label: "Tlab",
                name: "t_lab",
                unit: "MeV",
            },
            {
                label: "Half Vel-squared",
                name: "vel_sq",
                unit: "MeV/a.m.u",
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
            name: "mass_amu",
            unit: "text(amu)",
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
            name: "mass_amu",
            unit: "text(amu)",
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
            name: "mass_amu",
            unit: "text(amu)",
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
    SeparatorRow: {
        label: "Tuned Charge State",
        name: "csf",
        disabled: false
    },
    DefaultAtom: {
        "name": "",
        "symbol": "",
        "physics_notation": "",
        "atomic_number": "",
        "mass_number": "",
        "mass_amu": "",
        "mass": ""
    },
    DefaultRecoilAtom: {
        "name": "",
        "symbol": "",
        "physics_notation": "",
        "atomic_number": "",
        "mass_number": "",
        "mass_amu": "",
        "mass": "",
        "q_val": ""
    },
    DefaultResonance: {
        "e_res": "",
        "e_lvl": "",
        "w_g": "",
    },
    DefaultKinematics: {
        "reduced_mass_mev": "",
        "reduced_mass_amu": "",
        "t_lab": "",
        "vel_sq": "",
        "e_lab": "",
        "p_lab": "",
        "e_comp": "",
        "t_comp": "",
        "gamma_cm": "",
        "velocity_cm": "",
        "recoil_p": "",
        "recoil_v": "",
        "max_angle": "",
        "recoil_e": "",
        "recoil_e_neg": "",
        "recoil_e_zero": "",
        "recoil_e_pos": "",
        "recoil_t_neg": "",
        "recoil_t_zero": "",
        "recoil_t_pos": "",
        "delta_e_neg": "",
        "delta_e_pos": ""
    },
    DefaultSeparator: {
        "MD1": "",
        "MD2": "",
        "Q1": "",
        "Q2": "",
        "Q3": "",
        "Q4": "",
        "Q5": "",
        "Q6": "",
        "Q7": "",
        "Q8": "",
        "Q9": "",
        "Q10": "",
        "ED1_beam": "",
        "ED2_beam": "",
        "ED1_recoil": "",
        "ED2_recoil": "",
        "ToF_beam": "",
        "ToF_recoil": "",
        "MCP_beam": "",
        "MCP_recoil": ""
    },
    MagneticFieldTable: {
        "Q1": 0.709,
        "Q2": 0.677,
        "MD1": 1,
        "Q3": 0.553,
        "Q4": 0.735,
        "Q5": 0.381,
        "Q6": 0.366,
        "Q7": 0.512,
        "MD2": 1.23,
        "Q8": 0.387,
        "Q9": 0.238,
        "Q10": 0.266
    },
    atomic_mass_unit: 931.494,
    c: 299792458,
    magnet_const: 48.15,
    dragon_length: 20.7,
    mcp_distance: 0.59
}
export default data;