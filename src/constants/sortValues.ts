import type Fish from "~/types/Fish";
import { calculateServings, getCookie } from "~/helpers";

const SORT_VALUES = [
  "Name",
  "Servings",
  "Protein",
  "PCB",
  "Omega_3_ratio",
  "Mercury",
] as const;

const sorter = {
  Name: {
    fn: byName,
  },
  Servings: {
    fn: byServings,
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

function getName(fish: Fish) {
  if (fish.anishinaabe_name) {
    return fish.anishinaabe_name;
  }
  return fish.name;
}

export function byName(a: Fish, b: Fish) {
  const aName = getName(a);
  const bName = getName(b);
  if (aName < bName) {
    return -1;
  }
  if (aName > bName) {
    return 1;
  }
  return 0;
}

function getServingVal(v: string) {
  let result;
  const matches = v.match("([0-9]+).*|(Unrestricted)|(None).*");
  if (matches) {
    result = matches[1] || matches[2] || matches[3];
  }
  if (v.match(".*(week)")) {
    result = Number(result) * 4;
  }
  if (result === "Unrestricted") {
    result = 99;
  }
  if (result === "None") {
    result = 0;
  }
  return result;
}

function byServings(a: Fish, b: Fish) {
  const weight = getCookie("weight");
  const age = getCookie("age");
  const portion = getCookie("portion");
  const sex = getCookie("sex");
  const plan_to_get_pregnant = getCookie("plan_to_get_pregnant");

  const a_val = getServingVal(
    calculateServings(age, weight, portion, sex, plan_to_get_pregnant, a)
  );
  const b_val = getServingVal(
    calculateServings(age, weight, portion, sex, plan_to_get_pregnant, b)
  );

  if (a.name === "Tilapia") {
    return 1;
  }
  if (b.name === "Tilapia") {
    return -1;
  }

  if (Number(a_val) < Number(b_val)) {
    return 1;
  }
  if (Number(a_val) > Number(b_val)) {
    return -1;
  }
  return 0;
}

function byPCB(a: Fish, b: Fish) {
  if (a.pcb < b.pcb) {
    return -1;
  }
  if (a.pcb > b.pcb) {
    return 1;
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
    return -1;
  }
  if (a.mercury > b.mercury) {
    return 1;
  }
  return 0;
}

export { sorter };
export default SORT_VALUES;
