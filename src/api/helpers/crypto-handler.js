const crypto = require("crypto");

class CryptoHandler{
    constructor(){
        this.algorithm = "aes-256-cbc"
        this.key = process.env.ENCRYPTION_KEY
        this.iv = process.env.ENCRYPTION_IV
    }

    async encryptFile(buffer){
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
        return encrypted.toString('hex');
    };
  
    async decryptFile(encryptedText){
        try {
            const encryptedBuffer = Buffer.from(encryptedText, 'hex'); // Convert encrypted data back to a Buffer
            const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
            const decrypted = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
            return decrypted;
        } catch (err) {
            throw new Error(`Decryption failed: ${err.message}`);
        }
    };
}

module.exports = new CryptoHandler();