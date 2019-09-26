import { getIsotopeObject } from "../helper/isotopes";
import data from "./data";
import Big from "big.js";

// import global variables
const DefaultAtom = data.DefaultAtom;
const DefaultRecoilAtom = data.DefaultRecoilAtom;
const DefaultResonance = data.DefaultResonance;
const DefaultKinematics = data.DefaultKinematics;
const DefaultSeparator = data.DefaultSeparator;

function computeResult(input) {
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
    if (!(mass_number && atomic_number)) { return false; }

    return getIsotopeObject(mass_number, atomic_number);
}

function getRecoil(beam, target) {
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

function getResonance(e_res, q_val) {
    if (!(e_res && q_val)) { return false; }

    if (isNaN(e_res) || +e_res === 0) { return false; }

    const e_lvl = computeElevel(e_res, q_val);

    return {
        "e_lvl": e_lvl,
    }
}

function getKinematics(beam, target, recoil, resonance, e_res) {
    if (!(beam && target && recoil && resonance && e_res)) { return false; }

    if (isNaN(e_res) || +e_res === 0) { return false; }

    const reduced_mass_mev = computeReducedMass(beam.mass, target.mass);
    const reduced_mass_amu = computeReducedMass(beam.mass_amu, target.mass_amu);
    const t_lab = computeTLab(e_res, beam.mass, target.mass);
    if (!t_lab) { return false; }

    const vel_sq = computeVelSquare(t_lab, beam.mass_amu);
    if (!vel_sq) { return false; }

    const e_lab = computeELab(t_lab, beam.mass);
    if (!e_lab) { return false; }

    const p_lab = computePLab(e_lab, beam.mass);
    if (!p_lab) { return false; }

    const e_comp = computeEComp(recoil.mass, resonance.e_lvl, p_lab);
    if (!e_comp) { return false; }

    const t_comp = computeTComp(recoil.mass, resonance.e_lvl, e_comp);
    if (!t_comp) { return false; }

    const gamma_cm = computeGammaCM(recoil.mass, resonance.e_lvl, e_comp);
    if (!gamma_cm) { return false; }

    const velocity_cm = computeVelocityCM(p_lab, e_comp);
    if (!velocity_cm) { return false; }

    const recoil_p = computeRecoilMomentum(recoil.q_val, e_res);
    if (!recoil_p) { return false; }

    const recoil_v = computeRecoilVelocity(recoil_p, recoil.mass);
    if (!recoil_v) { return false; }

    const max_angle = computeMaxAngle(gamma_cm, velocity_cm, recoil_v);
    if (!max_angle) { return false; }

    const recoil_e = computeRecoilEnergy(recoil_p, recoil.mass);
    if (!recoil_e) { return false; }

    const recoil_e_neg = computeRecoilEnergyNegative(recoil_e, gamma_cm, velocity_cm, recoil_p);
    if (!recoil_e_neg) { return false; }

    const recoil_e_zero = computeRecoilEnergyZero(recoil_e, gamma_cm);
    if (!recoil_e_zero) { return false; }

    const recoil_e_pos = computeRecoilEnergyPositive(recoil_e, gamma_cm, velocity_cm, recoil_p);
    if (!recoil_e_pos) { return false; }

    const recoil_t_neg = computeRecoilKinematics(recoil_e_neg, recoil.mass);
    if (!recoil_t_neg) { return false; }

    const recoil_t_zero = computeRecoilKinematics(recoil_e_zero, recoil.mass);
    if (!recoil_t_zero) { return false; }

    const recoil_t_pos = computeRecoilKinematics(recoil_e_pos, recoil.mass);
    if (!recoil_t_pos) { return false; }

    const delta_e_neg = computeDeltaEnergyNegative(recoil_t_zero, recoil_t_neg);
    if (!delta_e_neg) { return false; }

    const delta_e_pos = computeDeltaEnergyPositive(recoil_t_pos, recoil_t_zero);
    if (!delta_e_pos) { return false; }

    return {
        "reduced_mass_mev": reduced_mass_mev,
        "reduced_mass_amu": reduced_mass_amu,
        "t_lab": t_lab,
        "vel_sq": vel_sq,
        "e_lab": e_lab,
        "p_lab": p_lab,
        "e_comp": e_comp,
        "t_comp": t_comp,
        "gamma_cm": gamma_cm,
        "velocity_cm": velocity_cm,
        "recoil_p": recoil_p,
        "recoil_v": recoil_v,
        "max_angle": max_angle,
        "recoil_e": recoil_e,
        "recoil_e_neg": recoil_e_neg,
        "recoil_e_zero": recoil_e_zero,
        "recoil_e_pos": recoil_e_pos,
        "recoil_t_neg": recoil_t_neg,
        "recoil_t_zero": recoil_t_zero,
        "recoil_t_pos": recoil_t_pos,
        "delta_e_neg": delta_e_neg,
        "delta_e_pos": delta_e_pos
    }
}

function getSeparator(beam, target, recoil, kinematics, csf) {
    if (!(beam && target && recoil && kinematics && csf)) { return false; }

    if (isNaN(csf) || +csf === 0) { return false; }

    let result = {};

    const md1 = computeMD1(beam.mass_amu, kinematics.t_lab, csf);

    if (!md1) { return false; }

    for (let type in data.MagneticFieldTable) {
        result[type] = computeMagneticField(md1, type);
    }

    const ed1_beam = computeED(md1, beam.mass_amu, csf);
    const ed2_beam = ed1_beam.times(0.8);
    const ed1_recoil = computeED(md1, recoil.mass_amu, csf);
    const ed2_recoil = ed1_recoil.times(0.8);

    if (!ed1_beam) { return false; }
    if (!ed2_beam) { return false; }
    if (!ed1_recoil) { return false; }
    if (!ed2_recoil) { return false; }

    const velocity_beam = computeVelocity(beam.mass, kinematics.t_lab);
    const velocity_recoil = computeVelocity(recoil.mass, kinematics.recoil_t_zero);

    if (!velocity_beam) { return false; }
    if (!velocity_recoil) { return false; }

    const tof_beam = computeToF(velocity_beam);
    const tof_recoil = computeToF(velocity_recoil);

    if (!tof_beam) { return false; }
    if (!tof_recoil) { return false; }

    const mcp_beam = computeMCP(velocity_beam);
    const mcp_recoil = computeMCP(velocity_recoil);

    result["ED1_beam"] = ed1_beam;
    result["ED2_beam"] = ed2_beam;
    result["ED1_recoil"] = ed1_recoil;
    result["ED2_recoil"] = ed2_recoil;
    result["ToF_beam"] = tof_beam;
    result["ToF_recoil"] = tof_recoil;
    result["MCP_beam"] = mcp_beam;
    result["MCP_recoil"] = mcp_recoil;

    return result;
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

function computeVelSquare(t_lab, beam_mass) {
    const t_lab_big = new Big(t_lab);
    const beam_mass_big = new Big(beam_mass);

    return t_lab_big.div(beam_mass_big);
}

function computeELab(t_lab, beam_mass) {
    const t_lab_big = new Big(t_lab);
    const beam_mass_big = new Big(beam_mass);

    return t_lab_big.plus(beam_mass_big);
}

function computePLab(e_lab, beam_mass) {
    const e_lab_big = new Big(e_lab);
    const beam_mass_big = new Big(beam_mass);

    return (e_lab_big.pow(2)
        .minus(beam_mass_big.pow(2)))
        .sqrt();
}

function computeEComp(recoil_mass, e_lvl, p_lab) {
    const recoil_mass_big = new Big(recoil_mass);
    const e_lvl_big = new Big(e_lvl);
    const p_lab_big = new Big(p_lab);

    return p_lab_big.pow(2)
        .plus(e_lvl_big.plus(recoil_mass_big).pow(2))
        .sqrt();
}

function computeTComp(recoil_mass, e_lvl, e_comp) {
    const recoil_mass_big = new Big(recoil_mass);
    const e_lvl_big = new Big(e_lvl);
    const e_comp_big = new Big(e_comp);

    return e_comp_big
        .minus(recoil_mass_big.plus(e_lvl_big));
}

function computeGammaCM(recoil_mass, e_lvl, e_comp) {
    const recoil_mass_big = new Big(recoil_mass);
    const e_lvl_big = new Big(e_lvl);
    const e_comp_big = new Big(e_comp);

    return e_comp_big
        .div(recoil_mass_big.plus(e_lvl_big));
}

function computeVelocityCM(p_lab, e_comp) {
    const p_lab_big = new Big(p_lab);
    const e_comp_big = new Big(e_comp);

    return p_lab_big.div(e_comp_big);
}

function computeRecoilMomentum(q_val, e_res) {
    const q_val_big = new Big(q_val);
    const e_res_big = new Big(e_res);

    return q_val_big.plus(e_res_big);
}

function computeRecoilVelocity(recoil_p, recoil_mass) {
    const recoil_p_big = new Big(recoil_p);
    const recoil_mass_big = new Big(recoil_mass);

    return recoil_p_big.div(recoil_mass_big);
}

function computeMaxAngle(gamma_cm, velocity_cm, recoil_v) {
    const one = new Big(1);
    const gamma_cm_big = new Big(gamma_cm);
    const velocity_cm_big = new Big(velocity_cm);
    const recoil_v_big = new Big(recoil_v);

    return Math.atan(one.div(gamma_cm_big).times(recoil_v_big.div(velocity_cm_big)));
}

function computeRecoilEnergy(recoil_p, recoil_mass) {
    const recoil_p_big = new Big(recoil_p);
    const recoil_mass_big = new Big(recoil_mass);

    return recoil_p_big.pow(2)
        .plus(recoil_mass_big.pow(2))
        .sqrt();
}

function computeRecoilEnergyNegative(recoil_e, gamma_cm, velocity_cm, recoil_p) {
    const recoil_e_big = new Big(recoil_e);
    const gamma_cm_big = new Big(gamma_cm);
    const velocity_cm_big = new Big(velocity_cm);
    const recoil_p_big = new Big(recoil_p);

    return gamma_cm_big.times(recoil_e_big.minus(velocity_cm_big.times(recoil_p_big)));
}

function computeRecoilEnergyZero(recoil_e, gamma_cm) {
    const recoil_e_big = new Big(recoil_e);
    const gamma_cm_big = new Big(gamma_cm);

    return gamma_cm_big.times(recoil_e_big);
}

function computeRecoilEnergyPositive(recoil_e, gamma_cm, velocity_cm, recoil_p) {
    const recoil_e_big = new Big(recoil_e);
    const gamma_cm_big = new Big(gamma_cm);
    const velocity_cm_big = new Big(velocity_cm);
    const recoil_p_big = new Big(recoil_p);

    return gamma_cm_big.times(recoil_e_big.plus(velocity_cm_big.times(recoil_p_big)));
}

function computeRecoilKinematics(recoil_e, recoil_mass) {
    const recoil_e_big = new Big(recoil_e);
    const recoil_mass_big = new Big(recoil_mass);

    return recoil_e_big.minus(recoil_mass_big);
}

function computeDeltaEnergyNegative(recoil_t_high, recoil_t_low) {
    const recoil_t_high_big = new Big(recoil_t_high);
    const recoil_t_low_big = new Big(recoil_t_low);

    return recoil_t_high_big.minus(recoil_t_low_big).div(recoil_t_high_big).times(100);
}

function computeDeltaEnergyPositive(recoil_t_high, recoil_t_low) {
    const recoil_t_high_big = new Big(recoil_t_high);
    const recoil_t_low_big = new Big(recoil_t_low);

    return recoil_t_high_big.minus(recoil_t_low_big).div(recoil_t_low).times(100);
}

function computeMD1(mass, t_lab, csf) {
    const amu_const = new Big(data.atomic_mass_unit);
    const magnet_const = new Big(data.magnet_const);
    const mass_big = new Big(mass);
    const t_lab_big = new Big(t_lab);
    const csf_big = new Big(csf);

    const ratio = t_lab_big.div(mass_big);

    return ratio.pow(2).times(amu_const.times(2).pow(-1)).plus(ratio).div(magnet_const)
        .sqrt()
        .times(mass_big.div(csf_big))
        .times(10000);
}

function computeMagneticField(val, filter) {
    const val_big = new Big(val);

    return val_big.times(data.MagneticFieldTable[filter]);
}

function computeED(md1, mass, csf) {
    const md1_big = new Big(md1);
    const mass_big = new Big(mass);
    const csf_big = new Big(csf);

    return md1_big.div(10000).pow(2)
        .times(2468)
        .times(csf_big.div(mass_big));
}

function computeVelocity(mass, val) {
    const val_big = new Big(val);
    const mass_big = new Big(mass);
    const c_big = new Big(data.c);

    return val_big.div(mass_big)
        .times(c_big.pow(2))
        .times(2)
        .sqrt();
}

function computeToF(velocity) {
    const velocity_big = new Big(velocity);
    const dragon_length = new Big(data.dragon_length);

    return dragon_length.div(velocity_big);
}

function computeMCP(velocity) {
    const velocity_big = new Big(velocity);
    const mcp_distance = new Big(data.mcp_distance);

    return mcp_distance.div(velocity_big);
}

// ------------------------------------Graph Data Calculation------------------------------------
// functions used for graph

function computeMaxAngleData(beam, target, recoil) {
    let i, start = 10, end = 200, data = [];
    let e_res, e_lvl, t_lab, e_lab, p_lab, e_comp, gamma_cm, velocity_cm, recoil_p, recoil_v;
    let max_angle, max_value, min_value = 0;

    if (!(ObjectValidationCheck(beam) && ObjectValidationCheck(target) && ObjectValidationCheck(recoil))) {
        return {
            data: [],
            max_value: 0,
            min_value: 0
        };
    }

    for (i = start; i < end; i++) {
        e_res = i / 100;
        e_lvl = computeElevel(e_res, recoil.q_val);
        t_lab = computeTLab(e_res, beam.mass, target.mass);
        e_lab = computeELab(t_lab, beam.mass);
        p_lab = computePLab(e_lab, beam.mass);
        e_comp = computeEComp(recoil.mass, e_lvl, p_lab);

        gamma_cm = computeGammaCM(recoil.mass, e_lvl, e_comp);
        velocity_cm = computeVelocityCM(p_lab, e_comp);
        recoil_p = computeRecoilMomentum(recoil.q_val, e_res);
        recoil_v = computeRecoilVelocity(recoil_p, recoil.mass);

        max_angle = computeMaxAngle(gamma_cm, velocity_cm, recoil_v);

        if (i === start || max_value < max_angle) {
            max_value = max_angle;
        }

        if (i === start || min_value > max_angle) {
            min_value = max_angle;
        }

        data.push({ x: e_res, y: max_angle });
    }

    return {
        data: data,
        max_value: max_value,
        min_value: min_value
    };
}

// ------------------------------------Convertion Function------------------------------------
// Convert variable type

function defaultConvertion(num) {
    if (Math.abs(num.e) < 4) {
        return num.toFixed(4).toString();
    } else {
        return num.toExponential(3).toString();
    }
}

function ObjectValidationCheck(obj) {
    for (let key in obj) {
        if (!obj[key]) {
            return false;
        }
    }

    return true;
}

export { computeResult, computeMaxAngleData }