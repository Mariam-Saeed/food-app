import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import SideBar from '../Sidebar/Sidebar';

function MasterLayout({ loginData }) {
	return (
		<div className='d-flex'>
			<SideBar />

			<div className='m-3 w-100'>
				<Navbar loginData={loginData} />
				<Outlet />
			</div>
		</div>
	);
}

export default MasterLayout;
