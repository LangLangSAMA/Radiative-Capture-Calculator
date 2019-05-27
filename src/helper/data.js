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
            name: "e_level",
            unit: "text(MeV)",
            disabled: true
        },
        {
            label: "wg",
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
            unit: "text(amu)",
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
            unit: `text(amu)`,
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
            unit: "text(amu)",
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
        "q_val": "",
        "e_level": "",
        "wg": "",
    },
    atomic_mass_unit: 931.494,
}
export default data;