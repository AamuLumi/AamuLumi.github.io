import sharp from 'sharp';

export default function createOptimizedImage(
	src: string,
	dest: string,
	options?: {
		width: number;
		height: number;
	},
) {
	return new Promise((resolve, reject) => {
		const isGif = src.indexOf('.gif') !== -1;
		let s = sharp(src, { animated: isGif });

		if (options?.width && options.height) {
			s = s.resize(options.width, options.height, {
				fit: 'inside',
				withoutEnlargement: true,
			});
		}

		if (isGif) {
			return s.webp({ quality: 80 }).toFile(dest, (err, info) => {
				if (err) {
					reject(err);
				}

				resolve(info);
			});
		}

		s.webp({ quality: 80 }).toFile(dest, (err, info) => {
			if (err) {
				reject(err);
			}

			resolve(info);
		});
	});
}
