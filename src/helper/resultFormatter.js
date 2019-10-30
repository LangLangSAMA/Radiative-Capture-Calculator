import Big from "big.js";

// ------------------------------------Convertion Function------------------------------------
// Convert variable type

export function resultFormatter(result) {
    Object.keys(result).forEach(function (field) {
        Object.keys(result[field]).forEach(function (entry) {
            if (result[field][entry] && !isNaN(result[field][entry])) {
                result[field][entry] = valueFormatter(result[field][entry], field, entry);
            }
        })
    });
    return result;
}

function valueFormatter(val, field, entry) {
    switch (field) {
        case "separator":
            val = separatorFormatter(val, entry);
            break;
        case "kinematics":
            val = kinematicsFormatter(val, entry);
            break;
        default:
            val = formatConvertion(val, 4, 3);
            break;
    }
    return val;
}

function kinematicsFormatter(val, entry) {
    switch (entry) {
        case "max_angle":
            val = new Big(val);
            val = formatConvertion(val.times(Math.pow(10, 3)), 3, 3);
            break;
        default:
            val = formatConvertion(val, 4, 3);
            break;
    }
    return val;
}

function separatorFormatter(val, entry) {
    switch (entry) {
        case "ToF_beam":
            val = formatConvertion(val.times(Math.pow(10, 6)), 3, 3);
            break;
        case "ToF_recoil":
            val = formatConvertion(val.times(Math.pow(10, 6)), 3, 3);
            break;
        case "MCP_beam":
            val = formatConvertion(val.times(Math.pow(10, 9)), 3, 3);
            break;
        case "MCP_recoil":
            val = formatConvertion(val.times(Math.pow(10, 9)), 3, 3);
            break;
        default:
            val = formatConvertion(val, 2, 3);
    }
    return val;
}

function formatConvertion(num, fixed, exp) {
    if (Math.abs(num.e) < 4) {
        return num.toFixed(fixed).toString();
    } else {
        return num.toExponential(exp).toString();
    }
}