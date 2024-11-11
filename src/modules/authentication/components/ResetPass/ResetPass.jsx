import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../.././.././../assets/images/logo.png';
import { useState } from 'react';

function ResetPass() {
	const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [passwordType, setPasswordType] = useState(true);
	const [confirmPasswordType, setConfirmPasswordType] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const email = useLocation().state.email;
	const onSubmit = async (data) => {
		try {
			setIsLoading(true);
			const response = await axios.post(
				'https://upskilling-egypt.com:3006/api/v1/Users/Reset',
				data
			);
			toast.success('Password changed successfully');
			navigate('/login');
		} catch (error) {
			setIsLoading(false);
			toast.error(error.response.data.message);
		}
	};
	return (
		<div className='col-lg-4 col-md-6 bg-white rounded rounded-2 px-5 py-3'>
			<div>
				<div className='logo-container text-center'>
					<img className='w-75' src={logo} alt='logo' />
				</div>
				<div className='title my-4'>
					<h3 className='h5 fw-bold text'>Reset Password</h3>
					<span className='text-muted'>
						Please Enter Your Otp or Check Your Inbox
					</span>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='input-group mb-2'>
						<span className='input-group-text' id='basic-addon1'>
							<i className='fa-solid fa-mobile-screen-button'></i>
						</span>
						<input
							type='text'
							className='form-control'
							placeholder='Enter your E-mail'
							aria-label='email'
							aria-describedby='basic-addon1'
							value={email}
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Invalid Email',
								},
							})}
						/>
					</div>
					{errors.email && (
						<p className='text-danger mb-2'>{errors.email.message}</p>
					)}

					<div className='input-group mb-2'>
						<span className='input-group-text' id='basic-addon1'>
							<i className='fa-solid fa-lock'></i>
						</span>
						<input
							type='text'
							className='form-control'
							placeholder='OTP'
							aria-label='otp'
							aria-describedby='basic-addon1'
							{...register('seed', {
								required: 'OTP is required',
							})}
						/>
					</div>
					{errors.seed && (
						<p className='text-danger mb-2'>{errors.seed.message}</p>
					)}

					<div className='input-group mb-2'>
						<span className='input-group-text' id='basic-addon1'>
							<i className='fa-solid fa-lock'></i>
						</span>
						<input
							type={passwordType ? 'password' : 'text'}
							className='form-control'
							placeholder='New Password'
							aria-label='password'
							aria-describedby='basic-addon1'
							{...register('password', {
								required: 'Password is required',
							})}
						/>
						<button
							className='position-absolute end-0 h-100 d-flex align-items-center pe-2 border-0 bg-transparent'
							style={{ zIndex: 10 }}
							onClick={(e) => {
								e.preventDefault();
								setPasswordType((prev) => !prev);
							}}
						>
							<i className='fa-regular fa-eye '></i>
						</button>
					</div>
					{errors.password && (
						<p className='text-danger mb-2'>{errors.password.message}</p>
					)}

					<div className='input-group mb-2'>
						<span className='input-group-text' id='basic-addon1'>
							<i className='fa-solid fa-lock'></i>
						</span>
						<input
							type={confirmPasswordType ? 'password' : 'text'}
							className='form-control'
							placeholder='Confirm New Password'
							aria-label='confirmPassword'
							aria-describedby='basic-addon1'
							{...register('confirmPassword', {
								required: 'Confirm Password is required',
							})}
						/>
						<button
							className='position-absolute end-0 h-100 d-flex align-items-center pe-2 border-0 bg-transparent'
							style={{ zIndex: 10 }}
							onClick={(e) => {
								e.preventDefault();
								setConfirmPasswordType((prev) => !prev);
							}}
						>
							<i className='fa-regular fa-eye'></i>
						</button>
					</div>
					{errors.confirmPassword && (
						<p className='text-danger mb-3'>{errors.confirmPassword.message}</p>
					)}

					<button disabled={isLoading} className='btn btn-success w-100 my-2'>
						Reset Password
					</button>
				</form>
			</div>
		</div>
	);
}

export default ResetPass;
