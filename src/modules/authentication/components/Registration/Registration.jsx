import { Link, useNavigate } from 'react-router-dom';
import logo from '../.././.././../assets/images/logo.png';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { api, USERS_URLS } from '../../../../api';
import { emailValidation, PasswordValidation } from '../../../../validations';
import TogglePassword from '../../../shared/components/TogglePassword/TogglePassword';
import UseBeforeUnload from '../../../../hooks/UseBeforeUnload';

function Registration() {
	const navigate = useNavigate();
	const {
		register,
		watch,
		formState: { errors, isSubmitting },
		handleSubmit,
	} = useForm();
	UseBeforeUnload();

	const onSubmit = async (data) => {
		const formData = new FormData();

		for (let key of Object.keys(data)) {
			if (key === 'profileImage') formData.append(key, data[key][0]);
			else formData.append(key, data[key]);
		}
		try {
			const response = await api.post(USERS_URLS.signup, formData);
			toast.success('Check your email');
			navigate('/verify-user', {
				state: { email: data.email, password: data.password },
			});
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		<div className='col-lg-8 col-md-6 bg-white rounded rounded-2 px-5 py-3'>
			<div>
				<div className='logo-container text-center'>
					<img className='w-50' src={logo} alt='logo' />
				</div>
				<div className='title my-4'>
					<h3 className='h5 fw-bold text'>Register</h3>
					<span className='text-muted'>
						Welcome Back! Please enter your details
					</span>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='d-flex flex-wrap justify-content-between align-items-start'
				>
					<div className='input-container'>
						<div className='input-group mb-2 '>
							<span className='input-group-text' id='basic-addon1'>
								<i className='fa-solid fa-mobile-screen-button'></i>
							</span>
							<input
								type='text'
								className='form-control'
								placeholder='User Name'
								aria-label='username'
								aria-describedby='basic-addon1'
								{...register('userName', { required: 'Username is required' })}
							/>
						</div>
						{errors.userName && (
							<p className='text-danger mb-2'>{errors.userName.message}</p>
						)}
					</div>

					<div className='input-container'>
						<div className='input-group mb-2 '>
							<span className='input-group-text' id='basic-addon1'>
								<i className='fa-solid fa-mobile-screen-button'></i>
							</span>
							<input
								type='text'
								className='form-control'
								placeholder='Enter your E-mail'
								aria-label='email'
								aria-describedby='basic-addon1'
								{...register('email', emailValidation)}
							/>
						</div>
						{errors.email && (
							<p className='text-danger mb-2'>{errors.email.message}</p>
						)}
					</div>

					<div className='input-container'>
						<div className='input-group mb-2 '>
							<span className='input-group-text' id='basic-addon1'>
								<i className='fa-solid fa-mobile-screen-button'></i>
							</span>
							<input
								type='text'
								className='form-control'
								placeholder='Country'
								aria-label='country'
								aria-describedby='basic-addon1'
								{...register('country', { required: 'Country is required' })}
							/>
						</div>
						{errors.country && (
							<p className='text-danger mb-2'>{errors.country.message}</p>
						)}
					</div>

					<div className='input-container'>
						<div className='input-group mb-2 '>
							<span className='input-group-text' id='basic-addon1'>
								<i className='fa-solid fa-mobile-screen-button'></i>
							</span>
							<input
								type='text'
								className='form-control'
								placeholder='Phone Number'
								aria-label='phoneNumber'
								aria-describedby='basic-addon1'
								{...register('phoneNumber', {
									required: 'Phonenumber is required',
								})}
							/>
						</div>
						{errors.phoneNumber && (
							<p className='text-danger mb-2'>{errors.phoneNumber.message}</p>
						)}
					</div>

					<div className='input-container'>
						<div className='input-group mb-2 position-relative '>
							<TogglePassword
								register={register('password', PasswordValidation)}
								placeholder='Password'
							/>
						</div>
						{errors.password && (
							<p className='text-danger mb-2 block'>
								{errors.password.message}
							</p>
						)}
					</div>

					<div className='input-container'>
						<div className='input-group mb-2 position-relative '>
							<TogglePassword
								register={register('confirmPassword', {
									validate: (value) =>
										value === watch('password') || 'Passwords didnot match',
								})}
								placeholder='Confirm Password'
							/>
						</div>
						{errors.confirmPassword && (
							<p className='text-danger mb-2'>
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					<div className='input-group mb-2'>
						<input
							type='file'
							className='form-control img-input'
							aria-label='profile image'
							aria-describedby='basic-addon1'
							{...register('profileImage')}
						/>
					</div>
					{errors.profileImage && (
						<p className='text-danger mb-2'>{errors.profileImage.message}</p>
					)}

					<div className='links d-flex justify-content-end w-100'>
						<Link
							className='text-decoration-none text-success w-fit'
							to='/login'
						>
							Login Now?
						</Link>
					</div>
					<button
						disabled={isSubmitting}
						className='btn btn-success my-2 mx-auto w-50'
					>
						Register
					</button>
				</form>
			</div>
		</div>
	);
}

export default Registration;
