import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './modules/authentication/components/Login/Login';
import Registration from './modules/authentication/components/Registration/Registration';
import CategoriesList from './modules/categories/components/CategoriesList/CategoriesList';
import RecipesList from './modules/recipes/components/RecipesList/RecipesList';
import UsersList from './modules/users/components/UsersList/UsersList';
import ChangePass from './modules/authentication/components/ChangePass/ChangePass';
import ForgetPass from './modules/authentication/components/ForgetPass/ForgetPass';
import ResetPass from './modules/authentication/components/ResetPass/ResetPass';
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout';
import NotFound from './modules/shared/components/NotFound/NotFound';
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout';
import Dashboard from './modules/dashboard/components/Dashboard/Dashboard';
import RecipeData from './modules/recipes/components/RecipeData/RecipeData';
import CategoryData from './modules/categories/components/CategoryData/CategoryData';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './modules/categories/components/ProtectedRoute/ProtectedRoute';
import RecipeForm from './modules/recipes/components/RecipeForm/RecipeForm';
import Verification from './modules/authentication/components/Verification/Verification';

function App() {
	const initalState = () => {
		const encodedToken = localStorage.getItem('token');
		if (encodedToken) {
			return jwtDecode(encodedToken);
		}
		return null;
	};
	const [loginData, setLoginData] = useState(initalState);
	console.log(loginData);
	const saveLoginData = () => {
		const encodedToken = localStorage.getItem('token');
		const decodedToken = jwtDecode(encodedToken);
		setLoginData(decodedToken);
	};
	// saveLoginData();

	const routes = createBrowserRouter([
		{
			path: '',
			element: <AuthLayout />,
			errorElement: <NotFound />,
			children: [
				{ index: true, element: <Login onSaveLoginData={saveLoginData} /> },
				{ path: 'login', element: <Login onSaveLoginData={saveLoginData} /> },
				{ path: 'register', element: <Registration /> },
				{ path: 'verify-user', element: <Verification /> },
				{ path: 'forget-password', element: <ForgetPass /> },
				{ path: 'reset-password', element: <ResetPass /> },
			],
		},
		{
			path: 'dashboard',
			element: (
				<ProtectedRoute loginData={loginData}>
					<MasterLayout loginData={loginData} />
				</ProtectedRoute>
			),
			errorElement: <NotFound />,
			children: [
				{ index: true, element: <Dashboard loginData={loginData} /> },
				{ path: 'recipes', element: <RecipesList /> },
				{ path: 'recipes/new-recipe', element: <RecipeForm /> },
				{ path: 'recipes/:recipeId', element: <RecipeForm /> },
				{ path: 'recipe-data', element: <RecipeData /> },
				{ path: 'categories', element: <CategoriesList /> },
				{ path: 'category-data', element: <CategoryData /> },
				{ path: 'users', element: <UsersList /> },
			],
		},
	]);

	return (
		<>
			<ToastContainer />
			<RouterProvider router={routes} />
		</>
	);
}

export default App;
