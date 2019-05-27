import { getIsotope } from "../helper/isotopes";
import data from "./data";
import Big from "big.js";

function computeResult(input) {
    const DefaultAtom = data.DefaultAtom;
    const DefaultRecoilAtom = data.DefaultRecoilAtom;
    const DefaultResonance = data.DefaultResonance;
    const amu = data.atomic_mass_unit;
    const {
        beam_a,
        beam_z,
        target_a,
        target_z,
        e_res
    } = input;

    let result = {};

    // Compute Beam Atom
    const resultBeam = computeIsotope(+beam_a, +beam_z);
    result["beam"] = resultBeam ? resultBeam : DefaultAtom;

    // Compute Target Atom
    const resultTarget = computeIsotope(+target_a, +target_z);
    result["target"] = resultTarget ? resultTarget : DefaultAtom;

    // Compute Result Atom
    const resultAtom = computeIsotope(+beam_a + +target_a, +beam_z + +target_z);
    const Qval = computeQval(resultBeam.mass, resultTarget.mass, resultAtom.mass);
    const resultRecoil = computeRecoil(resultAtom, Qval);
    result["recoil"] = resultRecoil ? resultRecoil : DefaultRecoilAtom;

    // Compute Resonance Value
    const Elevel = computeElevel(e_res, Qval);
    const resultResonance = computeResonance(Elevel);
    result["resonance"] = resultResonance ? resultResonance : DefaultResonance;

    return result;
}

// ------------------------------------Universal Formatting------------------------------------
// Return desired output with required string format

function computeIsotope(mass_number, atomic_number) {
    if (!(mass_number && atomic_number)) {
        return false;
    }

    return getIsotope(mass_number, atomic_number);
}

function computeRecoil(recoil, q_val) {
    if (!(recoil && q_val)) {
        return false;
    }

    recoil["q_val"] = defaultConvertion(q_val);

    return recoil;
}

function computeResonance(e_level) {
    if (!e_level) {
        return false;
    }

    return {
        e_level: defaultConvertion(e_level)
    }
}

// ------------------------------------Computation Function------------------------------------
// Return numerical result

function computeQval(beam_mass, target_mass, recoil_mass) {
    if (!(beam_mass && target_mass && recoil_mass)) {
        return false;
    }

    const beamMass = new Big(beam_mass);
    const targetMass = new Big(target_mass);
    const recoilMass = new Big(recoil_mass);

    const q_val = beamMass.plus(targetMass).minus(recoilMass).times(data.atomic_mass_unit);

    return q_val;
}

function computeElevel(e_res, q_val) {
    if (!(e_res && q_val)) {
        return false;
    }

    if (isNaN(e_res)) {
        return false;
    }

    const e_res_big = new Big(e_res);
    const e_level = e_res_big.plus(q_val);

    return e_level;
}

function defaultConvertion(num) {
    return num.toFixed(4).toString();
}

export { computeResult }