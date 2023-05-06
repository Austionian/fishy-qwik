const dataPoints = {
  protein: {
    title: "Protein",
    query: "protein",
    about: [
      `Protein is a key nutrient and an important part of a healthy diet.
Dietary protein is necessary for building and repairing your body’s tissues including muscle and blood.
Lean protein sources, like fish, are especially healthy choices.`,
    ],
    postfix: "g per 100g",
    link: "https://www.cdc.gov/nchs/fastats/diet.htm",
  },
  pcb: {
    title: "PCB",
    query: "pcb",
    about: [
      "PCBs stands for Polychorinated Biphenyls. They are chemicals that were banned years ago that persist in food today. If too much builds up in your body you could have health problems.",
      "If you get pregnant, high levels of PCBs in your body may hurt the baby. Most fish are safe to eat even with some PCBs in them, ask your doctor if this worries you.",
    ],
    moreInfo:
      "Avoid PCBs by trimming away fat, eating smaller fish of the same species, and cooking in a way that allows fat to drip off. Trimming fat under the skin can remove a lot of PCB from the fish. It's also best if you don't eat the skin.",
    postfix: " ppm",
    link: "https://www.atsdr.cdc.gov/csem/polychlorinated-biphenyls/what_are.html",
  },
  omega_3_ratio: {
    title: "Omega 3/6 Ratio",
    query: "omega_3_ratio",
    about: [
      `Omega-3 fatty acids are what are commonly called “good fats.” Omega-3 fatty acids from fish include DHA and EPA which may reduce the risk of heart disease and depression. DHA and EPA are also important nutrients for pregnant mothers.`,
      `A high ratio of Omega 3 fatty acids to Omega 6 fatty acids suggests that there are substantially more Omega 3 fatty acids than Omega 6 fatty acids.
          A high ratio may be beneficial in reducing the risk of inflammation and associated disease such as cardiovascular disease and cancer.
          Fish generally have positive ratios while many other meat sources or fried foods have poor ratios`,
    ],
    postfix: "",
    link: "https://www.cdc.gov/nutritionreport/pdf/second-nutrition-report-fatty-acids-factsheet.pdf",
  },
  mercury: {
    title: "Mercury",
    query: "mercury",
    about: [
      `Human activity, especially coal-fired power plants, is the main source of mercury in the environment. Fish that are higher on the food chain, like tuna, tend to have more mercury than fish lower on the food chain, like herring.`,
      `Mercury is a heavymetal toxicthat harms the brain and nervous system development of children and fetuses. Mercury is also associated with higher rates of cardiovascular disease and cognitive impairment. Smaller fish may have less mercury than larger fishfrom the same species.`,
    ],
    moreInfo:
      "Avoid mercury by eating smaller fish of the same species. Bigger fish are higher in mercury.",
    postfix: " ppm",
    link: "https://www.cdc.gov/biomonitoring/Mercury_FactSheet.html",
  },
};

export { dataPoints };
