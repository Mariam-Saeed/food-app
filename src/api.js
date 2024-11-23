// axiosInstance
import axios from 'axios';

const BASE_URL = 'https://upskilling-egypt.com:3006/api/v1';

export const api = axios.create({
	baseURL: BASE_URL,
});

export const HEADERS = {
	headers: { Authorization: localStorage.getItem('token') },
};

//* USER AUTHENTICATION
const BASE_USERS = `${BASE_URL}/Users`;
export const USERS_URLS = {
	login: `${BASE_USERS}/Login`,
	signup: `${BASE_USERS}/Register`,
	verify: `${BASE_USERS}/verify`,
	forget: `${BASE_USERS}/Reset/Request`,
	reset: `${BASE_USERS}/Reset`,
	getById: (id) => `${BASE_USERS}/${id}`,
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
	recipe: `${BASE_RECIPE}`,
	getRecipe: (id) => `${BASE_RECIPE}/${id}`,
	delete: (id) => `${BASE_RECIPE}/${id}`,
	update: (id) => `${BASE_RECIPE}/${id}`,
};

//* TAGS
const BASE_TAG = `${BASE_URL}/tag/`;
export const TAGS_URL = {
	list: `${BASE_TAG}`,
};
