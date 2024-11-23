import { useEffect } from 'react';

function UseBeforeUnload() {
	useEffect(() => {
		const beforeUnloadHandler = (e) => {
			e.preventDefault();
		};
		window.addEventListener('beforeunload', beforeUnloadHandler);

		return () =>
			window.removeEventListener('beforeunload', beforeUnloadHandler);
	}, []);
}

export default UseBeforeUnload;
