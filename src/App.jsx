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

function App() {
	const routes = createBrowserRouter([
		{
			path: '',
			element: <AuthLayout />,
			errorElement: <NotFound />,
			children: [
				{ index: true, element: <Login /> },
				{ path: 'login', element: <Login /> },
				{ path: 'register', element: <Registration /> },
				{ path: 'forget-pass', element: <ForgetPass /> },
				{ path: 'reset-pass', element: <ResetPass /> },
			],
		},
		{
			path: 'dashboard',
			element: <MasterLayout />,
			errorElement: <NotFound />,
			children: [
				{ index: true, element: <Dashboard /> },
				{ path: 'recipes', element: <RecipesList /> },
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
