import Header from '../../../shared/components/Header/Header';
import image from '../../../../assets/images/eating.png';

function Dashboard({ loginData }) {
	return (
		<div>
			<Header
				title={`Welcome ${loginData.userName}`}
				description='This is a welcoming screen for the entry of the application , you can now see the options'
				image={image}
			/>
			Dashboard
		</div>
	);
}

export default Dashboard;
