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
            unit: "MeV",
            required: "number"
        },
        {
            label: "Elevel",
            name: "e_level",
            disabled: true
        },
        {
            label: "wg",
            name: "w_g",
            unit: "eV",
            required: "number"
        },
    ],
    BeamRow: [
        {
            label: "Name",
            name: "name",
            disabled: true
        },
        {
            label: "Symbol",
            name: "symbol",
            disabled: true
        },
        {
            label: "Mass Number",
            name: "mass_number",
            disabled: true
        },
        {
            label: "Atomic Number",
            name: "atomic_number",
            disabled: true
        },
        {
            label: "Mass",
            name: "mass",
            unit: "amu",
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
            name: "symbol",
            disabled: true
        },
        {
            label: "Mass Number",
            name: "mass_number",
            disabled: true
        },
        {
            label: "Atomic Number",
            name: "atomic_number",
            disabled: true
        },
        {
            label: "Mass",
            name: "mass",
            unit: "amu",
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
            name: "symbol",
            disabled: true
        },
        {
            label: "Mass Number",
            name: "mass_number",
            disabled: true
        },
        {
            label: "Atomic Number",
            name: "atomic_number",
            disabled: true
        },
        {
            label: "Mass",
            name: "mass",
            unit: "amu",
            disabled: true
        },
        {
            label: "Q-val",
            name: "q_val",
            unit: "MeV",
            disabled: true
        }
    ],
    DefaultAtom: {
        "name": "",
        "symbol": "",
        "atomic_number": "",
        "mass_number": "",
        "mass": ""
    },
    DefaultOutputAtom: {
        "name": "",
        "symbol": "",
        "atomic_number": "",
        "mass_number": "",
        "mass": ""
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