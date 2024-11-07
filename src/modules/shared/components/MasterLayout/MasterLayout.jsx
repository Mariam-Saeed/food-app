import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

function MasterLayout() {
	return (
		<div className='d-flex'>
			<div className='w-25 bg-info'>
				<Sidebar />
			</div>
			<div className='w-100 bg-success'>
				<Navbar />
				<Header />
				<Outlet />
			</div>
		</div>
	);
}

export default MasterLayout;
