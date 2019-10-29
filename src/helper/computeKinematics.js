import Big from "big.js";

// ------------------------------------Universal Formatting------------------------------------
// Return desired output with required string format

export function getKinematics(beam, target, recoil, resonance, e_res) {
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

// ------------------------------------Computation Function------------------------------------
// Return numerical result

function computeReducedMass(beam_mass, target_mass) {
    const beam_mass_big = new Big(beam_mass);
    const target_mass_big = new Big(target_mass);

    const reduced_mass = (beam_mass_big.times(target_mass_big))
        .div(beam_mass_big.plus(target_mass_big));

    return reduced_mass;
}

export function computeTLab(e_res, beam_mass, target_mass) {
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

export function computeELab(t_lab, beam_mass) {
    const t_lab_big = new Big(t_lab);
    const beam_mass_big = new Big(beam_mass);

    return t_lab_big.plus(beam_mass_big);
}

export function computePLab(e_lab, beam_mass) {
    const e_lab_big = new Big(e_lab);
    const beam_mass_big = new Big(beam_mass);

    return (e_lab_big.pow(2)
        .minus(beam_mass_big.pow(2)))
        .sqrt();
}

export function computeEComp(recoil_mass, e_lvl, p_lab) {
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

export function computeGammaCM(recoil_mass, e_lvl, e_comp) {
    const recoil_mass_big = new Big(recoil_mass);
    const e_lvl_big = new Big(e_lvl);
    const e_comp_big = new Big(e_comp);

    return e_comp_big
        .div(recoil_mass_big.plus(e_lvl_big));
}

export function computeVelocityCM(p_lab, e_comp) {
    const p_lab_big = new Big(p_lab);
    const e_comp_big = new Big(e_comp);

    return p_lab_big.div(e_comp_big);
}

export function computeRecoilMomentum(q_val, e_res) {
    const q_val_big = new Big(q_val);
    const e_res_big = new Big(e_res);

    return q_val_big.plus(e_res_big);
}

export function computeRecoilVelocity(recoil_p, recoil_mass) {
    const recoil_p_big = new Big(recoil_p);
    const recoil_mass_big = new Big(recoil_mass);

    return recoil_p_big.div(recoil_mass_big);
}

export function computeMaxAngle(gamma_cm, velocity_cm, recoil_v) {
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