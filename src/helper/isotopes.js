import elements from './elementsAndIsotopes';
import data from './data';

const isotopes = getElementsObject();
const amu = data.atomic_mass_unit;

function getElementsObject() {
    var object = {};
    elements.forEach((e) => {
        object[e.number] = e;
    });
    return object;
}

function getIsotopeObject(mass_number, atomic_number) {
    const atom = isotopes[atomic_number];

    if (!atom) {
        return false;
    }

    let isotope = null;

    if (atom) {
        atom.isotopes.forEach((i) => {
            if (i.nominal === mass_number) {
                isotope = {
                    "name": atom.name,
                    "symbol": atom.symbol,
                    "physics_notation": `text(${atom.symbol})_${atom.number}^${mass_number}`,
                    "atomic_number": atom.number,
                    "mass_number": mass_number,
                    "mass": i.mass * amu,
                    "mass_amu": i.mass
                }
            }
        })
    }

    return isotope ? isotope : false;
}

function getAllElements() {
    return isotopes;
}

export { getIsotopeObject, getAllElements }