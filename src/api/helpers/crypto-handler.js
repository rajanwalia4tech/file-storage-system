const crypto = require("crypto");

class CryptoHandler{
// AES-256-CBC Encryption and Decryption
    async encryptFile(buffer){
        const cipher = await crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY), Buffer.from(process.env.IV));
        const encrypted = await Buffer.concat([cipher.update(buffer), cipher.final()]);
        return encrypted;
    };
  
    async decryptFile(buffer){
        const decipher = await crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY), Buffer.from(process.env.IV));
        const decrypted = await Buffer.concat([decipher.update(buffer), decipher.final()]);
        return decrypted;
    };
}

module.exports = new CryptoHandler();