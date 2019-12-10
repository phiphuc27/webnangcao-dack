const functions = require('firebase-functions');
const { tmpdir } = require('os');
const { dirname, join } = require('path');
const sharp = require('sharp');
const fs = require('fs-extra');
const cors = require('cors')({ origin: true });
const Busboy = require('busboy');

const UUID = require('uuid-v4');

const { Storage } = require('@google-cloud/storage');
let gcs = new Storage({
	projectId: 'carovn-v2',
	keyFilename: 'carovn-v2-firebase-adminsdk-ao4p6-b72e611ed4.json'
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileChange = functions.storage.object().onFinalize(async event => {
	const bucket = event.bucket;
	const destBucket = gcs.bucket(bucket);

	const contentType = event.contentType;
	const metadata = { contentType: contentType };

	const filePath = event.name;
	const fileName = filePath.split('/').pop();
	const bucketDir = dirname(filePath);

	const workingDir = join(tmpdir(), 'resize');
	const tmpFilePath = join(workingDir, 'source.png');

	console.log(`Got ${fileName} file`);

	if (event.resourceState === 'not_exists') {
		console.log(`File is not existed. Exiting function`);
		return false;
	}

	if (fileName.includes('@s_') || !contentType.includes('image')) {
		console.log(`Already resized. Exiting function`);
		return false;
	}

	await fs.ensureDir(workingDir);
	await destBucket.file(filePath).download({ destination: tmpFilePath });

	console.log(`Resizing ${fileName} at size 180px`);

	const ext = fileName.split('.').pop();
	const imgName = fileName.replace(`.${ext}`, '');
	const newImgName = `${imgName}@s_180.${ext}`;
	const imgPath = join(workingDir, newImgName);
	await sharp(tmpFilePath)
		.resize({ width: 180 })
		.toFile(imgPath);

	console.log(`Just resized ${newImgName} at size 180px`);

	destBucket.upload(imgPath, {
		destination: join(bucketDir, newImgName),
		metadata: metadata
	});

	return fs.remove(workingDir);
});

exports.uploadFile = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		if (req.method !== 'POST') {
			return res.status(500).json({ message: 'Not allowed!' });
		}

		let uuid = UUID();

		const busboy = new Busboy({ headers: req.headers });
		let uploadData = {};

		busboy.on('file', (fieldName, file, fileName, encoding, mimetype) => {
			const filePath = join(tmpdir(), fileName);
			uploadData = { file: filePath, fileName, type: mimetype };
			file.pipe(fs.createWriteStream(filePath));
		});

		busboy.on('finish', async () => {
			const bucket = gcs.bucket('carovn-v2.appspot.com');
			try {
				const file = await bucket.upload(uploadData.file, {
					uploadType: 'media',
					metadata: {
						contentType: uploadData.type,
						metadata: { firebaseStorageDownloadTokens: uuid }
					}
				});
				console.log(file[0]);
				return res.status(200).json({
					message: 'Success!',
					downloadUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${file[0].name}?alt=media&token=${uuid}`
				});
			} catch (err) {
				return res.status(200).send(err);
			}
		});

		busboy.end(req.rawBody);

		return res.status(200);
	});
});
