const PORTION_VALUES = ["4", "6", "8"] as const;

const PORTIONS = [
  { label: "4oz", value: PORTION_VALUES[0] },
  { label: "6oz", value: PORTION_VALUES[1] },
  { label: "8oz", value: PORTION_VALUES[2] },
];

export default PORTIONS;
export { PORTION_VALUES };
