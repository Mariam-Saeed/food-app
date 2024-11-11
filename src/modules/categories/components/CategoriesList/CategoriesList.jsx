import { useEffect, useState } from 'react';
import Header from '../../../shared/components/Header/Header';
import image from '.././../../../assets/images/category.png';
import CategoryData from '../CategoryData/CategoryData';
import { toast } from 'react-toastify';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import { api, CATEGORIES_URLS, HEADERS } from '../../../../api';
import { TailSpin } from 'react-loader-spinner';
import Spinner from '../../../shared/components/Spinner/Spinner';

function CategoriesList() {
	const [categories, setCategories] = useState([]);
	const [selectedId, setSelectedId] = useState(null);
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [loadingList, setLoadingList] = useState(true);

	const handleShow = (id) => {
		// console.log(id);
		setSelectedId(id);
		setShow(true);
	};

	const getCategoriesData = async () => {
		try {
			const response = await api.get(
				`${CATEGORIES_URLS.list}/?pageSize=10&pageNumber=1`,
				HEADERS
			);
			console.log(response.data.data);
			setLoadingList(false);
			setCategories(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		try {
			setIsLoading(true);
			const response = await api.delete(
				`${CATEGORIES_URLS.delete(selectedId)}`,
				HEADERS
			);
			setShow(false);
			getCategoriesData();
			toast.success('Category deleted successfully');
			setIsLoading(false);
		} catch (error) {
			toast.error("Can't delete this category");
		}
	};

	useEffect(() => {
		getCategoriesData();
	}, []);

	const categoriesList = categories.map((category) => (
		<tr key={category.id}>
			<td>{category.name}</td>
			<td>{category.creationDate}</td>
			<td>
				<button className='action-btn' onClick={() => handleShow(category.id)}>
					<i className='fa-solid fa-trash'></i>
				</button>
				<button className='action-btn'>
					<i className='fa-solid fa-pen-to-square'></i>
				</button>
			</td>
		</tr>
	));

	return (
		<>
			<Header
				title='Categories List'
				description='You can now add your items that any user can order it from the Application and you can edit'
				image={image}
			/>
			<DeleteConfirmation
				item='Category'
				onHandleDelete={handleDelete}
				show={show}
				onSetShow={setShow}
				loading={isLoading}
			/>
			<div className='d-flex justify-content-between p-4'>
				<h5>Categories Table Details</h5>
				<button className='btn btn-success'>Add New Category</button>
			</div>
			{loadingList ? (
				<Spinner />
			) : (
				<div>
					<table className='table table-striped table-borderless'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Creation date</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>{categoriesList}</tbody>
					</table>
				</div>
			)}
		</>
	);
}

export default CategoriesList;
