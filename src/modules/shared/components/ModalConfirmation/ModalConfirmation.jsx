import Modal from 'react-bootstrap/Modal';

function ModalConfirmation({ show, onSetShow, title, children, button }) {
	const handleClose = () => onSetShow(false);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title> {title} </Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
			{button && <Modal.Footer>{button}</Modal.Footer>}
		</Modal>
	);
}

export default ModalConfirmation;
