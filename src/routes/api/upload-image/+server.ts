import { RAILWAY_VOLUME_MOUNT_PATH } from '$env/static/private';

import { json, type RequestHandler } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

// const uploadDir = path.join(process.cwd(), RAILWAY_VOLUME_MOUNT_PATH);
// const uploadDir = path.join(process.cwd(), '/uploads');
export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const lang = formData.get('lang');
	const file = formData.get('file') as File;

	console.log('🚀 ~ file:', file);
	// console.log('🚀 ~ lang:', lang);
	const uploadDir = RAILWAY_VOLUME_MOUNT_PATH;

	// !validate syntax
	// if (!lang || !LANGS.includes(lang)) return jsonErrGeneric(lang);

	// !save file locally
	const fileName = `primera-img${path.extname(file.name)}`;
	// const fileName = `${Date.now()}-${path.extname(file.name)}`;
	// const uploadPath = path.join(uploadDir, fileName);
	const uploadPath = RAILWAY_VOLUME_MOUNT_PATH + fileName;

	try {
		// Create the upload directory if it doesn't exist
		await fs.promises.mkdir(uploadDir, { recursive: true });

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		await fs.promises.writeFile(uploadPath, buffer);
		console.log('Archivo guardado exitosamente');
	} catch (err) {
		console.error('Error al guardar el archivo:', err);
		return json({ success: false, msg: 'Error al guardar el archivo' });
	}

	return json({ success: true });
};
