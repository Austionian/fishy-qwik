import type Fish from "~/types/Fish";

export default (
  age: string | undefined,
  weight: string | undefined,
  portion: string | undefined,
  plan_to_get_pregnant: string | undefined,
  fishData: Fish
) => {
  const [mult, coeficient] = getCoeficient(
    age,
    weight,
    portion,
    plan_to_get_pregnant
  );

  if (typeof mult === "string" || typeof coeficient === "string") {
    return mult || coeficient;
  }

  const rawValue = getCalculation(coeficient, mult, fishData);

  return getString(rawValue);
};

export const getRawValue = (
  age: string | undefined,
  weight: string | undefined,
  portion: string | undefined,
  plan_to_get_pregnant: string | undefined,
  fishData: Fish
) => {
  const [mult, coeficient] = getCoeficient(
    age,
    weight,
    portion,
    plan_to_get_pregnant
  );

  if (typeof mult === "string" || typeof coeficient === "string") {
    return mult || coeficient;
  }

  return getCalculation(coeficient, mult, fishData);
};

const getCoeficient = (
  age: string | undefined,
  weight: string | undefined,
  portion: string | undefined,
  plan_to_get_pregnant: string | undefined
) => {
  const uncalculated = "? servings per month";
  const age_p = parseInt(age || "");
  const weight_p = parseInt(weight || "");
  const portion_p = parseInt(portion || "");

  if (isNaN(portion_p) || isNaN(age_p) || isNaN(weight_p)) return uncalculated;

  let mult: number;
  if (age_p <= 18 || plan_to_get_pregnant === "true") {
    mult = 1;
  } else {
    mult = 3;
  }

  const onza = portion_p * 28.35;

  const coeficient = onza / (weight_p * 0.454);

  return [mult, coeficient];
};

function getCalculation(coeficiente: number, mult: number, fish: Fish) {
  const a = (0.7 / (coeficiente * fish.mercury)) * mult;
  const b = 0.35 / (coeficiente * fish.pcb);
  if (a <= b) {
    return a;
  }
  return b;
}

function getString(a: number): string {
  if (a <= 0.24) {
    return "None, ever";
  } else if (a > 0.25 && a <= 0.5) {
    return "1 meal per month";
  } else if (a > 0.5 && a <= 0.75) {
    return "2 meals per month";
  } else if (a > 0.75 && a <= 1) {
    return "3 meals per month";
  } else if (a > 1 && a <= 14) {
    return `${Math.round(a * 1) / 1} meals per week`;
  } else if (a > 14) {
    return "Unrestricted";
  } else {
    return "? servings per month";
  }
}
