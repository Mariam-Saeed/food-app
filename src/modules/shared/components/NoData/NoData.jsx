import img from '../../../../assets/images/confirm-modal.png';

function NoData() {
	return (
		<div className='text-center'>
			<img src={img} alt='No data image' />
			<h3>No Data!</h3>
		</div>
	);
}

export default NoData;
