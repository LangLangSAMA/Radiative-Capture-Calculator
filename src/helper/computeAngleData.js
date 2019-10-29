import { computeElevel } from "./computeAtoms";
import {
    computeTLab, computeELab, computePLab, computeEComp, computeGammaCM,
    computeVelocityCM, computeRecoilMomentum, computeRecoilVelocity, computeMaxAngle
} from "./computeKinematics";
// ------------------------------------Graph Data Calculation------------------------------------
// functions used for graph

export function computeMaxAngleData(beam, target, recoil) {
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

function ObjectValidationCheck(obj) {
    for (let key in obj) {
        if (!obj[key]) {
            return false;
        }
    }

    return true;
}