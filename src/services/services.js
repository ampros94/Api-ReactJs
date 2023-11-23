import axios from "axios";
import { API_URL, API_KEY } from "../utils/consts";

export const getMoviesService = async (search, page = 1) => {
  return await axios.get(`${API_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: search,
      page: page,
    },
  });
};

export const getMovieService = async (id) => {
  return await axios.get(`${API_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
      append_to_response: "videos",
    },
  });
};
