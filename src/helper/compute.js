import { getIsotope, getRecoil, getResonance } from "./computeAtoms";
import { getKinematics } from "./computeKinematics";
import { getSeparator } from "./computeSeparator"
import { resultFormatter } from "./resultFormatter"
import data from "./data";

// import global variables
const DefaultAtom = data.DefaultAtom;
const DefaultRecoilAtom = data.DefaultRecoilAtom;
const DefaultResonance = data.DefaultResonance;
const DefaultKinematics = data.DefaultKinematics;
const DefaultSeparator = data.DefaultSeparator;

export function computeResult(input) {
    const {
        beam_a,
        beam_z,
        target_a,
        target_z,
        e_res,
        csf
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
    const kinematics = getKinematics(beam, target, recoil, resonance, e_res);
    result["kinematics"] = kinematics ? kinematics : DefaultKinematics;

    // Compute Recoil Separator
    const separator = getSeparator(beam, target, recoil, kinematics, csf);
    result['separator'] = separator ? separator : DefaultSeparator;

    result = resultFormatter(result);

    return result;
}