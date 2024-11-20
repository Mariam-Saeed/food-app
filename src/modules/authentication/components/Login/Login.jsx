import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../.././.././../assets/images/logo.png';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { api, USERS_URLS } from '../../../../api';
import TogglePassword from '../../../shared/components/TogglePassword/TogglePassword';
import { emailValidation } from '../../../../validations';

function Login({ onSaveLoginData }) {
	const email = useLocation().state?.email || '';
	const password = useLocation().state?.password || '';

	const navigate = useNavigate();
	const {
		register,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm({
		defaultValues: {
			email,
			password,
		},
	});

	useEffect(() => {
		setValue('email', email);
		setValue('password', password);
	}, [setValue, email, password]);

	const onSubmit = async (data) => {
		try {
			const response = await api.post(USERS_URLS.login, data);

			localStorage.setItem('token', response.data.token);
			onSaveLoginData();
			toast.success('Login successful');
			navigate('/dashboard');
		} catch (error) {
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
					<h3 className='h5 fw-bold text'>Login</h3>
					<span className='text-muted'>
						Welcome Back! Please enter your details
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
							{...register('email', emailValidation)}
						/>
					</div>
					{errors.email && (
						<p className='text-danger mb-2'>{errors.email.message}</p>
					)}

					<div className='input-group mb-2 position-relative'>
						<TogglePassword
							register={register('password', {
								required: 'Password is required',
							})}
							placeholder='Password'
						/>
					</div>
					{errors.password && (
						<p className='text-danger mb-2'>{errors.password.message}</p>
					)}
					<div className='links d-flex justify-content-between '>
						<Link className='text-black text-decoration-none' to='/register'>
							Register Now?
						</Link>
						<Link
							className='text-decoration-none text-success'
							to='/forget-password'
						>
							Forgot Password?
						</Link>
					</div>
					<button className='btn btn-success w-100 my-2'>Login</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
