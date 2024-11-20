import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../.././.././../assets/images/logo.png';
import { toast } from 'react-toastify';
import { api, USERS_URLS } from '../../../../api';

function Verification() {
	const navigate = useNavigate();
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
	} = useForm();
	const email = useLocation().state.email;
	const password = useLocation().state.password;

	const onSubmit = async (data) => {
		try {
			const response = await api.put(USERS_URLS.verify, data);
			toast.success('Your account verified successfully');
			navigate('/login', { state: { email, password } });
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
					<h3 className='h5 fw-bold text'>Verify your account</h3>
					<span className='text-muted'>
						Please Enter Verification code or Check Your Inbox
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
							readOnly
							{...register('email')}
						/>
					</div>

					<div className='input-group mb-2'>
						<span className='input-group-text' id='basic-addon1'>
							<i className='fa-solid fa-lock'></i>
						</span>
						<input
							type='text'
							className='form-control'
							placeholder='Code'
							aria-label='code'
							aria-describedby='basic-addon1'
							{...register('code', {
								required: 'Code is required',
							})}
						/>
					</div>
					{errors.code && (
						<p className='text-danger mb-2'>{errors.code.message}</p>
					)}

					<button
						disabled={isSubmitting}
						className='btn btn-success w-100 my-2'
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default Verification;
