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
        const data = {
            iv: this.iv.toString('hex'),
            encryptedData: encrypted.toString('hex')
        };
        console.log(data);
        return data.encryptedData;

        // const cipher = crypto.createCipheriv("aes-256-cbc", this.key, this.iv);
        // let encrypted = cipher.update(Buffer.from(buffer, 'utf8'));
        // encrypted = Buffer.concat([encrypted, cipher.final()]);
        // console
        // const data = {
        //     iv: this.iv.toString('hex'),
        //     encryptedData: encrypted.toString('hex')
        // };
        // console.log(data);
        // return data.encryptedData;
    };
  
    async decryptFile(encryptedText){
        try {
            const iv = Buffer.from(this.iv, 'hex');             // Convert IV back to a Buffer
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