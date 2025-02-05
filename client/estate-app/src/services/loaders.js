import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ params }) => {
  return defer({
    post: apiRequest("/posts/" + params.id).then((res) => res.data),
  });
};

export const listPageLoader = async ({ request }) => {
  const query = request.url.split("?")[1];
  return defer({
    postResponse: apiRequest("/posts?" + query).then((res) => res.data),
  });
};