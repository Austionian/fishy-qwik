import type Fish from "~/types/Fish";
// import jquery from "jquery";
// import _ from "lodash";
// import {
//   getMaxMercury,
//   getMinMercury,
//   getMaxPCB,
//   getMinPCB,
//   getMaxProtein,
//   getMinProtein,
//   getMaxFat,
//   getMinFat,
// } from "../utils/fish";

// export function getFishesForAllCategory(coeficiente, mult, fishes) {
//   const fishesGroupedByName = _.groupBy(fishes, "fish_data.name");
//   const allFish: Fish[] = new Array();
//   _.forEach(fishesGroupedByName, function (value, key) {
//     let fishMercury = 0;
//     let fishProtein = 0;
//     let fishOmega3 = 0;
//     let fishOmega3Ratio = 0;
//     let fishPcb = 0;
//     value.forEach((fish) => {
//       fishMercury += fish.mercury;
//       fishProtein += fish.protein;
//       fishOmega3 += fish.omega_3;
//       fishOmega3Ratio += fish.omega_3_ratio;
//       fishPcb += fish.pcb;
//     });
//     fishData.mercury = fishMercury / value.length;
//     fishData.protein = fishProtein / value.length;
//     fishData.omega_3 = fishOmega3 / value.length;
//     fishData.omega_3_ratio = fishOmega3Ratio / value.length;
//     fishData.pcb = fishPcb / value.length;
//     getCalculation(coeficiente, mult, fishData);
//     allFish.push(fishData);
//   });
//   return _.reverse(_.sortBy(allFish, ["calculation"]));
// }

export default (
  age: string,
  weight: string,
  portion: string,
  sex: string,
  plan_to_get_pregnant: string,
  fishData: Fish
) => {
  const age_p = parseInt(age);
  const weight_p = parseInt(weight);
  const portion_p = parseInt(portion);

  let mult: number;
  if (age_p <= 18 || (sex === "Female" && plan_to_get_pregnant === "Yes")) {
    mult = 1;
  } else {
    mult = 3;
  }

  const onza = portion_p * 28.35;

  const coeficient = onza / (weight_p * 0.454);

  return getCalculation(coeficient, mult, fishData);
  // const em = document.getElementById("emb").value;
  // const sex = document.getElementById("genero").value;
  // const peso1 = document.getElementById("peso").value * 0.454; // pasamos el peso de lbs a kg
  // const edad = document.getElementById("edad").value;
  // validamos si los valores peso y edad se encuentran dentro del rango 0 - 100
  //   if (edad <= 18 || (sex == "M" && em == "Y")) {
  //     var mult = 1;
  //   } else {
  //     var mult = 3;
  //   }
  //
  //   for (let i = 0, length = portion.length; i < length; i++) {
  //     if (portion[i].checked) {
  //       var onza = portion[i].value * 28.35; // hacemos la conversion de onzas a gramos
  //       break;
  //     }
  //   }
  //   const coeficiente = onza / peso1; // sacamos el calculo de meal ratio
  //
  //   if (!fishes) {
  //     fishes = await getFishList();
  //   }
  //
  //   if (recipes.length === 0) {
  //     collectRecipes(fishes);
  //   }
  //
  //   fishes.forEach((fish) => {
  //     getCalculation(coeficiente, mult, fish);
  //   });
  //
  //   return [fishes, coeficiente, mult];
  // }
};

function getCalculation(coeficiente: number, mult: number, fish: Fish) {
  const a = (0.7 / (coeficiente * fish.mercury)) * mult;
  const b = 0.35 / (coeficiente * fish.pcb);
  if (a <= b) {
    return getString(a);
  } else {
    return getString(b);
  }
}

function getString(a: number): string {
  if (a < 0.24) {
    return "None, ever";
  } else if (a > 0.25 && a <= 0.49) {
    return "1 meal per month";
  } else if (a > 0.5 && a <= 0.74) {
    return "2 meals per month";
  } else if (a > 0.75 && a <= 1) {
    return "3 meals per month";
  } else if (a > 1 && a <= 14) {
    return `${Math.round(a * 1) / 1} meal(s) per week`;
  } else if (a > 14) {
    return "Unrestricted";
  } else {
    return "? per month";
  }
}
