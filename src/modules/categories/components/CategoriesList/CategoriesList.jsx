import { useEffect, useState } from 'react';
import Header from '../../../shared/components/Header/Header';
import modalImage from '../../../../assets/images/confirm-modal.png';
import image from '.././../../../assets/images/category.png';
import CategoryData from '../CategoryData/CategoryData';
import { toast } from 'react-toastify';
import ModalConfirmation from '../../../shared/components/ModalConfirmation/ModalConfirmation';
import { api, CATEGORIES_URLS, HEADERS } from '../../../../api';
import { TailSpin } from 'react-loader-spinner';
import Spinner from '../../../shared/components/Spinner/Spinner';
import NoData from '../../../shared/components/NoData/NoData';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function CategoriesList() {
	const [categories, setCategories] = useState([]);
	const [selectedId, setSelectedId] = useState(null);
	const [editItem, setEditItem] = useState(null);
	const [showDelete, setShowDelete] = useState(false);
	const [showAdd, setShowAdd] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [loadingList, setLoadingList] = useState(true);
	const {
		register,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm({
		defaultValues: {
			name: editItem?.name || '',
		},
	});

	const handleShow = () => {
		setShowDelete(true);
	};

	const getCategoriesData = async () => {
		try {
			const response = await api.get(
				`${CATEGORIES_URLS.category}?pageSize=10&pageNumber=1`,
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
			setShowDelete(false);
			getCategoriesData();
			toast.success('Category deleted successfully');
			setIsLoading(false);
		} catch (error) {
			toast.error("Can't delete this category");
		}
	};

	const handleAdd = async (data) => {
		console.log(data);
		try {
			setIsLoading(true);
			const response = await api.post(CATEGORIES_URLS.category, data);
			setShowAdd(false);
			getCategoriesData();
			toast.success('Category added successfully');
		} catch (error) {
			toast.error("Can't add this category");
		} finally {
			setIsLoading(false);
		}
	};

	const handleEdit = async (data) => {
		try {
			setIsLoading(true);
			const response = await api.put(
				CATEGORIES_URLS.edit(editItem.id),
				data,
				HEADERS
			);
			setShowEdit(false);
			getCategoriesData();
			toast.success('Category updated successfully');
		} catch (error) {
			toast.error("Can't edit this category");
		} finally {
			setEditItem(null);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (editItem?.name) {
			setValue('name', editItem.name);
		} else {
			setValue('name', '');
		}
	}, [editItem, setValue]);

	useEffect(() => {
		getCategoriesData();
	}, []);

	const categoriesList = categories.map((category) => (
		<tr key={category.id}>
			<td>{category.name}</td>
			<td>{category.creationDate}</td>
			<td>
				<button
					className='action-btn text-danger'
					onClick={() => {
						handleShow();
						setSelectedId(category.id);
					}}
				>
					<i className='fa-solid fa-trash'></i>
				</button>
				<button
					className='action-btn'
					onClick={() => {
						setShowEdit(true);
						setEditItem({ id: category.id, name: category.name });
					}}
				>
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
			<ModalConfirmation
				show={showDelete}
				onSetShow={setShowDelete}
				button={
					<Button
						variant='outline-danger'
						disabled={isLoading}
						onClick={handleDelete}
					>
						Delete this category
					</Button>
				}
			>
				<div className='text-center'>
					<img src={modalImage} alt='modal image' />
					<h4>Delete this category ?</h4>
					<p>
						Are you sure you want to delete this item ? if you are sure just
						click on delete it
					</p>
				</div>
			</ModalConfirmation>
			<ModalConfirmation
				title='Edit Category'
				show={showEdit}
				onSetShow={setShowEdit}
			>
				<div className=''>
					<form onSubmit={handleSubmit(handleEdit)}>
						<input
							type='text'
							className='form-control'
							placeholder='Category Name'
							aria-label='name'
							aria-describedby='basic-addon1'
							{...register('name', {
								required: 'Category name is required',
								validate: (value) =>
									value.trim() !== editItem?.name ||
									'Please change the category name to edit it',
							})}
						/>
						{errors.name && (
							<p className='text-danger my-2'>{errors.name.message}</p>
						)}
						<div className='d-flex justify-content-end'>
							<button disabled={isLoading} className='btn btn-success my-2'>
								Save
							</button>
						</div>
					</form>
				</div>
			</ModalConfirmation>
			<ModalConfirmation
				title='Add Category'
				show={showAdd}
				onSetShow={setShowAdd}
			>
				<div className=''>
					<form onSubmit={handleSubmit(handleAdd)}>
						<input
							type='text'
							className='form-control'
							placeholder='Category Name'
							aria-label='name'
							aria-describedby='basic-addon1'
							{...register('name', {
								required: 'Category name is required',
							})}
						/>
						{errors.name && (
							<p className='text-danger my-2'>{errors.name.message}</p>
						)}
						<div className='d-flex justify-content-end'>
							<button disabled={isLoading} className='btn btn-success my-2'>
								Save
							</button>
						</div>
					</form>
				</div>
			</ModalConfirmation>
			<div className='d-flex justify-content-between p-4'>
				<h5>Categories Table Details</h5>
				<button
					className='btn btn-success'
					onClick={() => {
						setShowAdd(true);
						setEditItem(null);
					}}
				>
					Add New Category
				</button>
			</div>
			{loadingList ? (
				<Spinner />
			) : categories.length > 0 ? (
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
			) : (
				<NoData />
			)}
		</>
	);
}

export default CategoriesList;
