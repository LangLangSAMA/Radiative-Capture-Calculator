import { getIsotopeObject } from "./isotopes";
import Big from "big.js";

// ------------------------------------Universal Formatting------------------------------------
// Return desired output with required string format

export function getIsotope(mass_number, atomic_number) {
    if (!(mass_number && atomic_number)) { return false; }

    return getIsotopeObject(mass_number, atomic_number);
}

export function getRecoil(beam, target) {
    if (!(beam && target)) { return false; }

    const beam_a = +beam.mass_number;
    const beam_z = +beam.atomic_number;
    const target_a = +target.mass_number;
    const target_z = +target.atomic_number;

    const recoil = getIsotope(beam_a + target_a, beam_z + target_z);

    if (!recoil) { return false; }

    const q_val = computeQval(beam.mass, target.mass, recoil.mass);

    recoil["q_val"] = q_val;

    return recoil;
}

export function getResonance(e_res, q_val) {
    if (!(e_res && q_val)) { return false; }

    if (isNaN(e_res) || +e_res === 0) { return false; }

    const e_lvl = computeElevel(e_res, q_val);

    return {
        "e_lvl": e_lvl,
    }
}

// ------------------------------------Computation Function------------------------------------
// Return numerical result

function computeQval(beam_mass, target_mass, recoil_mass) {
    const beam_mass_big = new Big(beam_mass);
    const target_mass_big = new Big(target_mass);
    const recoil_mass_big = new Big(recoil_mass);

    const q_val = beam_mass_big.plus(target_mass_big).minus(recoil_mass_big);

    return q_val;
}

export function computeElevel(e_res, q_val) {
    const e_res_big = new Big(e_res);
    const e_lvl = e_res_big.plus(q_val);

    return e_lvl;
}