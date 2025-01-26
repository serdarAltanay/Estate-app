import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};
export const listPageLoader = async ({ request }) => {
  const query = request.url.split("?")[1];
  try {
    const postPromise = await apiRequest("/posts?" + query);
    console.log("API Response:", postPromise.data); // Log the data received from the API
    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to load posts");
  }
};