// axiosInstance
import axios from 'axios';

const BASE_URL = 'https://upskilling-egypt.com:3006/api/v1';

export const api = axios.create({
	baseURL: BASE_URL,
});

export const HEADERS = {
	headers: { Authorization: localStorage.getItem('token') },
};

//* Categories
const BASE_CATEGORY = `${BASE_URL}/Category`;
export const CATEGORIES_URLS = {
	category: `${BASE_CATEGORY}/`,
	delete: (id) => `${BASE_CATEGORY}/${id}`,
	edit: (id) => `${BASE_CATEGORY}/${id}`,
};

//* Recipes
const BASE_RECIPE = `${BASE_URL}/Recipe`;
export const RECIPES_URLS = {
	list: `${BASE_RECIPE}`,
	delete: (id) => `${BASE_RECIPE}/${id}`,
};
