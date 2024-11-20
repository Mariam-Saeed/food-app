import { Link, useParams } from 'react-router-dom';
import styles from './RecipeForm.module.css';
import { useForm } from 'react-hook-form';
import {
	api,
	CATEGORIES_URLS,
	HEADERS,
	RECIPES_URLS,
	TAGS_URL,
} from '../../../../api';
import { useEffect, useState } from 'react';

function RecipeForm() {
	const [categories, setCategories] = useState([]);
	const [tags, setTags] = useState([]);
	const params = useParams();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({ mode: 'onChange' });

	useEffect(() => {
		(async () => {
			try {
				const response = await api.get(TAGS_URL.list);
				console.log(response);
				setTags(response?.data);
			} catch (error) {
				console.log(error);
			}
		})();

		(async () => {
			try {
				const response = await api.get(
					`${CATEGORIES_URLS.category}?pageSize=10&pageNumber=1`,
					HEADERS
				);
				console.log(response.data.data);
				setCategories(response.data.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const onSubmit = async (data) => {
		const formData = new FormData();

		// formData.append('name', data?.name);
		// formData.append('price', data?.price);
		// formData.append('description', data?.description);
		// formData.append('recipeImage', data?.recipeImage[0]);
		// formData.append('tagId', data?.tagId);
		// formData.append('categoriesIds', data?.categoriesIds);

		for (const key of Object.keys(data)) {
			if (key === 'recipeImage') formData.append(key, data[key][0]);
			else formData.append(key, data[key]);
		}
		console.log(data);
		try {
			const response = await api.post(RECIPES_URLS.recipe, formData, HEADERS);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<main>
			<header className={styles['header-wrapper']}>
				<div>
					<h3>
						Fill the <span>Recipes</span> !
					</h3>
					<p className={styles['content-wrapper']}>
						you can now fill the meals easily using the table and form , click
						here and sill it with the table !
					</p>
				</div>
				<Link className={styles['btn-primary']} to={-1}>
					All Recipes 􀄪
				</Link>
			</header>
			<form
				className={styles['form-wrapper']}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={styles['input-wrapper']}>
					<input
						{...register('name', { required: 'This field is required' })}
						placeholder='Recipe Name'
						className='form-control'
					/>
					{errors.name?.message && (
						<div className='text-danger'>{errors?.name?.message}</div>
					)}
				</div>

				<div className={styles['input-wrapper']}>
					<select
						className='form-control'
						{...register('tagId', { required: 'This field is required' })}
					>
						<option value=''>tag</option>
						{tags.map((tag) => (
							<option key={tag.id} value={tag.id}>
								{tag.name}
							</option>
						))}
					</select>
					{errors.tagId?.message && (
						<div className='text-danger'>{errors?.tagId?.message}</div>
					)}
				</div>

				<div className={styles['input-wrapper']}>
					<input
						type='number'
						{...register('price', {
							required: 'This field is required',
							min: 0,
						})}
						className='form-control'
						placeholder='Price'
					/>
					{errors.price?.message && (
						<div className='text-danger'>{errors?.price?.message}</div>
					)}
				</div>

				<div className={styles['input-wrapper']}>
					<select
						{...register('categoriesIds', {
							required: 'This field is required',
						})}
						className='form-control'
					>
						<option value=''>Category</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
					{errors.categoriesIds?.message && (
						<div className='text-danger'>{errors?.categoriesIds?.message}</div>
					)}
				</div>

				<div className={styles['input-wrapper']}>
					<textarea
						{...register('description', { required: 'This field is required' })}
						className='form-control'
						placeholder='Description'
					/>
					{errors.description?.message && (
						<div className='text-danger'>{errors?.description?.message}</div>
					)}
				</div>

				<div className={styles['input-wrapper']}>
					<input
						{...register('recipeImage', { required: 'This field is required' })}
						className='form-control'
						type='file'
					/>
					{errors.recipeImage?.message && (
						<div className='text-danger'>{errors?.recipeImage?.message}</div>
					)}
				</div>

				<div className={styles['actions-wrapper']}>
					<button>Cancel</button>
					<button disabled={isSubmitting} className={styles['btn-primary']}>
						{isSubmitting ? 'Saving' : 'Save'}
					</button>
				</div>
			</form>
		</main>
	);
}

export default RecipeForm;