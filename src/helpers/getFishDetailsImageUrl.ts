import type Fish from "~/types/Fish";
import getWoodlandFishImageUrl from "./getWoodlandfishImageUrl";
import getFishImageUrl from "./getFishImageUrl";

export default (fish: Fish) => {
  const woodland_url = getWoodlandFishImageUrl(fish);
  if (woodland_url) {
    return woodland_url;
  }
  return getFishImageUrl(fish);
};
