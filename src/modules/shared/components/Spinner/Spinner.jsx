import { TailSpin } from 'react-loader-spinner';

function Spinner() {
	return (
		<div className='d-flex justify-content-center'>
			<TailSpin
				visible={true}
				height='80'
				width='80'
				color='#009247'
				ariaLabel='tail-spin-loading'
				radius='1'
			/>
		</div>
	);
}

export default Spinner;
