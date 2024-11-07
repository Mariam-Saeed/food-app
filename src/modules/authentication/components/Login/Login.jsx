import { Link, useNavigate } from 'react-router-dom';
import logo from '../.././.././../assets/images/logo.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function Login() {
	const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [passwordType, setPasswordType] = useState('true');
	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				'https://upskilling-egypt.com:3006/api/v1/Users/Login',
				data
			);
			toast.success('Login successful');
			navigate('/dashboard');
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};
	return (
		<div className='auth-container'>
			<div className='container-fluid'>
				<div className='row vh-100 justify-content-center align-items-center'>
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

								<div className='input-group mb-2 position-relative'>
									<span className='input-group-text' id='basic-addon1'>
										<i className='fa-solid fa-lock'></i>
									</span>
									<input
										type={passwordType ? 'password' : 'text'}
										className='form-control'
										placeholder='Password'
										aria-label='password'
										aria-describedby='basic-addon1'
										{...register('password', {
											required: 'Password is required',
										})}
									/>
									<span
										role='button'
										className='position-absolute end-0 h-100 d-flex align-items-center pe-2'
										onClick={() => setPasswordType((prev) => !prev)}
									>
										<i className='fa-regular fa-eye '></i>
									</span>
								</div>
								{errors.password && (
									<p className='text-danger mb-2'>{errors.password.message}</p>
								)}
								<div className='links d-flex justify-content-between '>
									<Link
										className='text-black text-decoration-none'
										to='/register'
									>
										Register Now?
									</Link>
									<Link
										className='text-decoration-none text-success'
										to='/forget-pass'
									>
										Forgot Password?
									</Link>
								</div>
								<button className='btn btn-success w-100 my-2'>Login</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
