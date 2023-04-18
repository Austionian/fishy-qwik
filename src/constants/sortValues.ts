import type Fish from "~/types/Fish";

const SORT_VALUES = [
  "Name",
  "Protein",
  "PCB",
  "Omega_3_ratio",
  "Mercury",
  "Servings",
] as const;

const sorter = {
  Name: {
    fn: byName,
  },
  Servings: {
    fn: byProtein,
  },
  Protein: {
    fn: byProtein,
  },
  PCB: {
    fn: byPCB,
  },
  Omega_3_ratio: {
    fn: byOmega_3_ratio,
  },
  Mercury: {
    fn: byMercury,
  },
};

function byName(a: Fish, b: Fish) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function byPCB(a: Fish, b: Fish) {
  if (a.pcb < b.pcb) {
    return 1;
  }
  if (a.pcb > b.pcb) {
    return -1;
  }
  return 0;
}

function byOmega_3_ratio(a: Fish, b: Fish) {
  if (a.omega_3_ratio < b.omega_3_ratio) {
    return 1;
  }
  if (a.omega_3_ratio > b.omega_3_ratio) {
    return -1;
  }
  return 0;
}

function byProtein(a: Fish, b: Fish) {
  if (a.protein < b.protein) {
    return 1;
  }
  if (a.protein > b.protein) {
    return -1;
  }
  return 0;
}

function byMercury(a: Fish, b: Fish) {
  if (a.mercury < b.mercury) {
    return 1;
  }
  if (a.mercury > b.mercury) {
    return -1;
  }
  return 0;
}

export { sorter };
export default SORT_VALUES;
