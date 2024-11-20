import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from '../.././.././../assets/images/logo.png';
// import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { api, USERS_URLS } from '../../../../api';
import { emailValidation } from '../../../../validations';

function ForgetPass() {
	const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [isLoading, setIsLoading] = useState(false);
	const onSubmit = async (data) => {
		try {
			setIsLoading(true);
			const response = await api.post(USERS_URLS.forget, data);
			toast.success('Check your Email');
			navigate('/reset-password', { state: { email: data.email } });
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
					<h3 className='h5 fw-bold text'>Forgot Your Password?</h3>
					<span className='text-muted'>
						No worries! Please enter your email and we will send a password
						reset link
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

					<button disabled={isLoading} className='btn btn-success w-100 my-2'>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default ForgetPass;
