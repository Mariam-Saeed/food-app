import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/images/side-logo.png';
import { useState } from 'react';

function SideBar() {
	const [collapsed, setCollapsed] = useState(false);
	const toggleCollapsed = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<div className='sidebar-container'>
			<Sidebar collapsed={collapsed}>
				<Menu>
					<MenuItem
						icon={<img className='mx-auto' src={logo} alt='logo' />}
						className='my-5 mx-auto logo-menu-item'
						onClick={toggleCollapsed}
					></MenuItem>
					<MenuItem
						icon={<i className='fa-solid fa-house mx-3'></i>}
						component={<Link to='/dashboard' />}
					>
						Home
					</MenuItem>
					<MenuItem
						icon={<i className='fa-solid fa-users mx-3'></i>}
						component={<Link to='users' />}
					>
						Users
					</MenuItem>
					<MenuItem
						icon={<i className='fa-solid fa-house mx-3'></i>}
						component={<Link to='recipes' />}
					>
						Recipes
					</MenuItem>
					<MenuItem
						icon={<i className='fa-solid fa-calendar-days mx-3'></i>}
						component={<Link to='categories' />}
					>
						Categories
					</MenuItem>
					<MenuItem icon={<i className='fa-solid fa-lock mx-3'></i>}>
						Change Password
					</MenuItem>
					<MenuItem
						icon={<i className='fa-solid fa-right-from-bracket mx-3'></i>}
						component={
							<Link
								onClick={() => {
									localStorage.removeItem('token');
								}}
								to='/login'
							/>
						}
					>
						Logout
					</MenuItem>
				</Menu>
			</Sidebar>
		</div>
	);
}

export default SideBar;
