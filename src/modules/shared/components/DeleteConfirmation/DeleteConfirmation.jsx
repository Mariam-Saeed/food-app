import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import modalImage from '../../../../assets/images/confirm-modal.png';
// import { useState } from 'react';

function DeleteConfirmation({
	onHandleDelete,
	item,
	show,
	onSetShow,
	loading,
}) {
	const handleClose = () => onSetShow(false);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title></Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='text-center'>
					<img src={modalImage} alt='modal image' />
					<h4>Delete this {item} ?</h4>
					<p>
						Are you sure you want to delete this item ? if you are sure just
						click on delete it
					</p>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='outline-danger'
					disabled={loading}
					onClick={onHandleDelete}
				>
					Delete this {item}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteConfirmation;
