import { useEffect, useState } from 'react';
import avatar from '../../../../assets/images/avatar.png';

function Navbar({ loginData }) {
	console.log(loginData);

	return (
		<nav
			className='py-2 d-flex justify-content-end align-items-center  rounded-4'
			style={{ background: ' #F8F9FB' }}
		>
			<img className='mx-2' src={avatar} alt='avatar' />
			<div>{loginData.userName}</div>
		</nav>
	);
}

export default Navbar;
