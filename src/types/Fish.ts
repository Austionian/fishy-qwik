type Fish = {
  fish_id: string;
  fish_type_id: string;
  name: string;
  anishinaabe_name: string;
  lake: string;
  fish_image: string;
  woodland_fish_image: string;
  protein: number;
  pcb: number;
  mercury: number;
  omega_3: number;
  omega_3_ratio: number;
  servings: string;
  about: string;
  s3_fish_image?: string;
  s3_woodland_image?: string;
};

export default Fish;
