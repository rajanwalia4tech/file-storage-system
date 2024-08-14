const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const { Readable } = require('stream');

class FileHandler{

    writeFile(filePath, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, data, (err) => {
                if (err) {
                    return reject(`Error writing file: ${err.message}`);
                }
                resolve(`File written successfully to ${filePath}`);
            });
        });
    }

    readFile(filePath, encoding = 'utf8') {
        return new Promise((resolve, reject) => {
            this.fileExists(filePath)
            .then((exists) => {
                if (!exists) {
                    return reject(`File does not exist: ${filePath}`);
                }

                fs.readFile(filePath, encoding, (err, data) => {
                    if (err) {
                        return reject(`Error reading file: ${err.message}`);
                    }
                    resolve(data); // Resolve with the file content
                });
            })
            .catch((err) => {
                reject(`Error checking file existence: ${err.message}`)
            });;
        });
    }

    fileExists(filePath) {
        return new Promise((resolve, reject) => {
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    return resolve(false);
                }
                resolve(true);
            });
        });
    }

    readFileStream(res, encryptedFileName, decryptedBuffer){
        const fileType = path.extname(encryptedFileName).substring(1); 
        const contentType = {
            txt: 'text/plain',
            pdf: 'application/pdf',
            jpg: 'image/jpeg',
            png: 'image/png',
            mp4: 'video/mp4',
            // Add more as needed
        }[fileType] || 'application/octet-stream';

        const randomFileName = `${crypto.randomBytes(8).toString('hex')}.${fileType}`;

        res.setHeader('Content-Disposition', `attachment; filename="${randomFileName}"`);
        res.setHeader('Content-Type', contentType);

        // Create a readable stream from the decrypted buffer
        const stream = Readable.from(decryptedBuffer);
        stream.pipe(res);

        stream.on('end', () => {
            console.log('Stream finished');
        });

        stream.on('error', (err) => {
            console.error('Stream error:', err);
            res.status(500).send('Something went wrong while downloading the file');
        });
    }
}

module.exports = new FileHandler();