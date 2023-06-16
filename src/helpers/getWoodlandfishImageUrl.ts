import type Fish from "~/types/Fish";

export default (fish: Fish) =>
  fish.s3_woodland_image
    ? fish.s3_woodland_image
    :
    fish.woodland_fish_image ? 
    `/images/${fish.woodland_fish_image}` : undefined;
