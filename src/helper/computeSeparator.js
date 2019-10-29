import Big from "big.js";
import data from "./data";

// ------------------------------------Universal Formatting------------------------------------
// Return desired output with required string format

export function getSeparator(beam, target, recoil, kinematics, csf) {
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