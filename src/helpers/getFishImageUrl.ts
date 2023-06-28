import type FishType from "~/types/FishType";
import type Fish from "~/types/Fish";

export default (fish: Fish | FishType) =>
  fish.s3_fish_image ? fish.s3_fish_image : `/images/${fish.fish_image}`;
