export default async (file) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);

	return new Promise((resolve, reject) => {
		reader.onload = e => {
			const image = new Image();
			image.src = e.target.result;
	
			image.onload = () => {
				resolve([image.width, image.height]);
			}
		}
	})
 
}