import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import SideBar from '../Sidebar/Sidebar';

function MasterLayout({ loginData }) {
	return (
		<div className='d-flex'>
			<div className=''>
				<SideBar />
			</div>
			<div className='w-100 m-3'>
				<Navbar loginData={loginData} />
				<Outlet />
			</div>
		</div>
	);
}

export default MasterLayout;
