const data = {
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