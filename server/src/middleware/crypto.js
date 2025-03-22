const keys = require('../keys.js');
const crypto = require('crypto');
const keyString = keys.CRYPTO_SECURITY_KEY; // This must be exactly 16 characters
const key = Buffer.from(keyString, 'utf-8'); 

// Function to encrypt data
const cryptoEncrypt = (data) => {
  try {
    // Convert the data to a JSON string
    const jsonString = JSON.stringify(data);
    // Generate a random 16-byte IV
    const iv = crypto.randomBytes(16);
    // Create a cipher using AES CBC mode
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    // Encrypt the data
    let encrypted = cipher.update(jsonString, 'utf-8', 'binary');
    encrypted += cipher.final('binary');
    // Encode both IV and encrypted data in Base64
    const encryptedBase64 = Buffer.from(encrypted, 'binary').toString('base64');
    const ivBase64 = iv.toString('base64');
    // Return the concatenated IV and encrypted data, separated by a colon
    return `${ivBase64}:${encryptedBase64}`;
  } catch (error) {
    console.error('Encryption error:', error.message);
    throw new Error('Encryption failed');
  }
};

// Middleware for decryption
const cryptoDecrypt = () => {
  return (req, res, next) => {
    if (req.body.payload) {
      try {
        const encryptedData =req.body.payload;
        const parts = encryptedData.split(':');
        const iv = Buffer.from(parts[0], 'base64');
        const encryptedText = Buffer.from(parts[1], 'base64');
        // Create a decipher using AES CBC mode and PKCS7 padding
        const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        // Decrypt the data
        let decrypted = decipher.update(encryptedText, 'binary', 'utf-8');
        decrypted += decipher.final('utf-8');
        // Parse the decrypted JSON string
        req.body = JSON.parse(decrypted);
        next();
      } catch (error) {
        console.error('Decryption error:', error.message);
        res.status(400).json({ error: 'Invalid payload' });
      }
    } else {
      next();
    }
  };
};

// data Object for decryption
const cryptoDecryptData = (data) => {
  try {
    const encryptedData =data;
    const parts = encryptedData.split(':');
    const iv = Buffer.from(parts[0], 'base64');
    const encryptedText = Buffer.from(parts[1], 'base64');
    // Create a decipher using AES CBC mode and PKCS7 padding
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    // Decrypt the data
    let decrypted = decipher.update(encryptedText, 'binary', 'utf-8');
    decrypted += decipher.final('utf-8');
    // Parse the decrypted JSON string
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Decryption error:', error.message);
    res.status(400).json({ error: 'Invalid payload' });
  }
};

module.exports = { cryptoEncrypt, cryptoDecrypt, cryptoDecryptData };