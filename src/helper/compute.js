import { getIsotopeObject } from "../helper/isotopes";
import data from "./data";
import Big from "big.js";

// import global variables
// const amu = data.atomic_mass_unit;
const DefaultAtom = data.DefaultAtom;
const DefaultRecoilAtom = data.DefaultRecoilAtom;
const DefaultResonance = data.DefaultResonance;
const DefaultKinematics = data.DefaultKinematics;

function computeResult(input) {
    const {
        beam_a,
        beam_z,
        target_a,
        target_z,
        e_res
    } = input;

    let result = {};

    // Compute Beam Atom
    const beam = getIsotope(+beam_a, +beam_z);
    result["beam"] = beam ? beam : DefaultAtom;

    // Compute Target Atom
    const target = getIsotope(+target_a, +target_z);
    result["target"] = target ? target : DefaultAtom;

    // Compute Result Atom
    const recoil = getRecoil(beam, target);
    result["recoil"] = recoil ? recoil : DefaultRecoilAtom;

    // Compute Resonance Value
    const resonance = getResonance(e_res, recoil.q_val);
    result["resonance"] = resonance ? resonance : DefaultResonance;

    // Compute Kinematics
    const kinematics = getKinematics(beam, target, e_res);
    result["kinematics"] = kinematics ? kinematics : DefaultKinematics;

    Object.keys(result).forEach(function (field) {
        Object.keys(result[field]).forEach(function (entry) {
            if (result[field][entry] && !isNaN(result[field][entry])) {
                result[field][entry] = defaultConvertion(result[field][entry]);
            }
        })
    });

    return result;
}

// ------------------------------------Universal Formatting------------------------------------
// Return desired output with required string format

function getIsotope(mass_number, atomic_number) {
    if (!(mass_number && atomic_number)) {
        return false;
    }

    return getIsotopeObject(mass_number, atomic_number);
}

function getRecoil(beam, target) {
    if (!(beam && target)) {
        return false;
    }

    const beam_a = +beam.mass_number;
    const beam_z = +beam.atomic_number;
    const target_a = +target.mass_number;
    const target_z = +target.atomic_number;

    const recoil = getIsotope(beam_a + target_a, beam_z + target_z);

    if (!recoil) {
        return false;
    }

    const q_val = computeQval(beam.mass, target.mass, recoil.mass);

    recoil["q_val"] = q_val;

    return recoil;
}

function getResonance(e_res, q_val) {
    if (!(e_res && q_val)) {
        return false;
    }

    if (isNaN(e_res)) {
        return false;
    }

    const e_lvl = computeElevel(e_res, q_val);

    return {
        "e_lvl": e_lvl,
    }
}

function getKinematics(beam, target, e_res) {
    if (!(e_res && beam && target)) {
        return false;
    }

    if (isNaN(e_res)) {
        return false;
    }

    const reduced_mass_mev = computeReducedMass(beam.mass, target.mass);
    const reduced_mass_amu = computeReducedMass(beam.mass_amu, target.mass_amu);
    const t_lab = computeTLab(e_res, beam.mass, target.mass);

    return {
        "reduced_mass_mev": reduced_mass_mev,
        "reduced_mass_amu": reduced_mass_amu,
        "t_lab": t_lab
    }
}

// ------------------------------------Computation Function------------------------------------
// Return numerical result

function computeQval(beam_mass, target_mass, recoil_mass) {
    const beamMass = new Big(beam_mass);
    const targetMass = new Big(target_mass);
    const recoilMass = new Big(recoil_mass);

    const q_val = beamMass.plus(targetMass).minus(recoilMass);

    return q_val;
}

function computeElevel(e_res, q_val) {
    const e_res_big = new Big(e_res);
    const e_lvl = e_res_big.plus(q_val);

    return e_lvl;
}

function computeReducedMass(beam_mass, target_mass) {
    const beam_mass_big = new Big(beam_mass);
    const target_mass_big = new Big(target_mass);

    const reduced_mass = (beam_mass_big.times(target_mass_big))
        .div(beam_mass_big.plus(target_mass_big));

    return reduced_mass;
}

function computeTLab(e_res, beam_mass, target_mass) {
    const e_res_big = new Big(e_res);
    const beam_mass_big = new Big(beam_mass);
    const target_mass_big = new Big(target_mass);

    const t_lab = (((e_res_big.plus(beam_mass_big).plus(target_mass_big)).pow(2)
        .minus(beam_mass_big.pow(2))
        .minus(target_mass_big.pow(2)))
        .div(target_mass_big.times(2)))
        .minus(beam_mass_big);

    return t_lab;
}

// ------------------------------------Convertion Function------------------------------------
// Convert variable type

function defaultConvertion(num) {
    return num.toFixed(4).toString();
}

export { computeResult }