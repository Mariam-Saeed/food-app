import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from '../.././.././../assets/images/logo.png';
import axios from 'axios';
import { toast } from 'react-toastify';

function ForgetPass() {
	const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				'https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',
				data
			);
			toast.success('Check your Email');
			navigate('/reset-pass');
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
								<h3 className='h5 fw-bold text'>Forgot Your Password?</h3>
								<span className='text-muted'>
									No worries! Please enter your email and we will send a
									password reset link
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

								<button className='btn btn-success w-100 my-2'>Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ForgetPass;
