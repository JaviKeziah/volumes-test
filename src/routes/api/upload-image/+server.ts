import { RAILWAY_VOLUME_MOUNT_PATH } from '$env/static/private';

import { json, type RequestHandler } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const file = formData.get('file') as File;

	console.log('🚀 ~ file:', file);
	const uploadDir = RAILWAY_VOLUME_MOUNT_PATH;

	// !save file locally
	const fileName = `primera-img${path.extname(file.name)}`;
	const uploadPath = RAILWAY_VOLUME_MOUNT_PATH + fileName;

	try {
		// Create the upload directory if it doesn't exist
		await fs.promises.mkdir(uploadDir, { recursive: true });

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		await fs.promises.writeFile(uploadPath, buffer);
		// await fs.promises.writeFile(uploadPath, file);
		console.log('Archivo guardado exitosamente');
	} catch (err) {
		console.error('Error al guardar el archivo:', err);
		return json({ success: false, msg: 'Error al guardar el archivo' });
	}

	return json({ success: true });
};
