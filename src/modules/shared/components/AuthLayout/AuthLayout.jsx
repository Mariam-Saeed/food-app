import { Outlet } from 'react-router-dom';

function AuthLayout() {
	return (
		<div className='auth-container'>
			<div className='container-fluid'>
				<div className='row vh-100 justify-content-center align-items-center'>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default AuthLayout;
