import { useEffect, useState } from 'react';
import Header from '../../../shared/components/Header/Header';
import image from '.././../../../assets/images/category.png';
import modalImage from '../../../../assets/images/confirm-modal.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import { api, HEADERS, RECIPES_URLS } from '../../../../api';
import Spinner from '../../../shared/components/Spinner/Spinner';
import NoData from '../../../shared/components/NoData/NoData';
import ModalConfirmation from '../../../shared/components/ModalConfirmation/ModalConfirmation';
import { Button } from 'react-bootstrap';

function RecipesList() {
	const [recipes, setRecipes] = useState([]);
	const [selectedId, setSelectedId] = useState(null);
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [loadingList, setLoadingList] = useState(true);

	const handleShow = (id) => {
		// console.log(id);
		setSelectedId(id);
		setShow(true);
	};

	const getRecipesData = async () => {
		try {
			const response = await axios.get(
				`${RECIPES_URLS.list}/?pageSize=10&pageNumber=1`,
				HEADERS
			);
			console.log(response.data.data);
			setRecipes(response.data.data);
			setLoadingList(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		try {
			setIsLoading(true);
			const response = await api.delete(
				`${RECIPES_URLS.delete(selectedId)}`,
				HEADERS
			);
			setShow(false);
			getRecipesData();
			toast.success('Recipe deleted successfully');
			setIsLoading(false);
		} catch (error) {
			toast.error("Can't delete this Recipe");
		}
	};

	useEffect(() => {
		getRecipesData();
	}, []);

	const recipesList = recipes.map((recipe) => (
		<tr key={recipe.id}>
			<td>{recipe.name}</td>
			<td className=''>
				<img
					className='recipe-img'
					src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
					alt='recipe-photo'
				/>
			</td>
			<td>{recipe.price}</td>
			<td>{recipe.description}</td>
			<td>{recipe.tag.name}</td>
			<td>{recipe.category[0]}</td>

			<td>
				<button
					className='action-btn text-danger'
					onClick={() => handleShow(recipe.id)}
				>
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
				title='Recipes Items'
				description='You can now add your items that any user can order it from the Application and you can edit'
				image={image}
			/>

			<ModalConfirmation
				show={show}
				onSetShow={setShow}
				button={
					<Button
						variant='outline-danger'
						disabled={isLoading}
						onClick={handleDelete}
					>
						Delete this recipe
					</Button>
				}
			>
				<div className='text-center'>
					<img src={modalImage} alt='modal image' />
					<h4>Delete this Recipe ?</h4>
					<p>
						Are you sure you want to delete this item ? if you are sure just
						click on delete it
					</p>
				</div>
			</ModalConfirmation>
			<div className='d-flex justify-content-between p-4'>
				<h5>Recipe Table Details</h5>
				<button className='btn btn-success'>Add New Recipe</button>
			</div>
			{loadingList ? (
				<Spinner />
			) : recipes.length > 0 ? (
				<div>
					<table className='table table-striped table-borderless'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Image</th>
								<th>Price</th>
								<th>Description</th>
								<th>Tag</th>
								<th>Category</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>{recipesList}</tbody>
					</table>
				</div>
			) : (
				<NoData />
			)}
		</>
	);
}

export default RecipesList;
