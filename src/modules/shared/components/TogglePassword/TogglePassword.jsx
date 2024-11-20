import { useState } from 'react';

function TogglePassword({ register, placeholder, value }) {
	const [passwordType, setPasswordType] = useState(true);
	const [showIcon, setShowIcon] = useState(false);
	return (
		<>
			<span className='input-group-text' id='basic-addon1'>
				<i className='fa-solid fa-lock'></i>
			</span>
			<input
				type={passwordType ? 'password' : 'text'}
				className='form-control'
				placeholder={placeholder}
				value={value}
				aria-label='password'
				aria-describedby='basic-addon1'
				{...register}
			/>
			<button
				className='position-absolute end-0 h-100 d-flex align-items-center pe-2 border-0 bg-transparent'
				style={{ zIndex: 10 }}
				onClick={(e) => {
					e.preventDefault();
					setPasswordType((prev) => !prev);
					setShowIcon((prev) => !prev);
				}}
			>
				<i className={`fa-regular ${showIcon ? 'fa-eye-slash' : 'fa-eye'}`}></i>
			</button>
		</>
	);
}

export default TogglePassword;
