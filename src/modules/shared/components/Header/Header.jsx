function Header({ title, description, image }) {
	return (
		<div className='header-container p-5 mt-4 d-flex justify-content-between align-items-center'>
			<div className='caption w-50 text-white'>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
			<div className='header-img'>
				<img src={image} alt='eating' />
			</div>
		</div>
	);
}

export default Header;
