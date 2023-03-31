import type { RequestHandler } from "@builder.io/qwik-city";
// import getAPIKey from "~/helpers/getAPIKey";
import type Fish from "~/types/Fish";

export const onGet: RequestHandler<Fish[]> = async ({ json }) => {
  // const apiKey = "c0934beac2979a5740b175d96aeff4ed4b057860";
  // const res = await fetch("https://mcwfishapp.com/fishs/", {
  //   headers: {
  //     Authorization: `Token ${apiKey}`,
  //   },
  // });
  json(200, {
    test: "test",
  });
};
