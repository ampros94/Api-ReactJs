import axios from "axios";
import { API_URL, API_KEY } from "../utils/consts";

export const getDiscoverMovies = async (page = 1) => {
  return await axios.get(`${API_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      page: page,
    }
  })
};

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

export const getGenres = async () => {
  return await axios.get(`${API_URL}/genre/movie/list`, {
    params: {
      api_key: API_KEY,
    }
  })
}
export const searchWithKeyword = async (word) => {
  return await axios.get(`${API_URL}/search/multi?query=${word}&page=1`, {
    params: {
      api_key: API_KEY
    }
  })
}