# File Storage System

## Objective

The goal of this project is to build a secure file storage system where files are encrypted using AES-256-CBC encryption before being stored on the server and decrypted when retrieved by the client. The system will ensure that files are securely stored and accessible only by authorized users.

## Tech Stack
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Encryption**: AES-256-CBC

## Features

1. **User Signup/login** : Users can signup and login on the application.
2. **File Upload**: Users can securely upload files, which will be encrypted before being saved to the server.
3. **File Download**: Users can download files, which will be decrypted on the server before being sent to the client.
4. **Authentication**: Only authenticated users can upload and download files.
5. **Security**: Files are encrypted and decrypted using AES-256-CBC, and security best practices are followed to protect encryption keys and prevent malicious uploads.

## Requirements

### 1. Setup

- Create a Node.js application using Express.js to handle server-side operations.
- Use MongoDB to store metadata related to the files (e.g., filename, file size, upload date, encrypted file path).

### 2. File Upload Endpoint

- **Endpoint**: `POST api/file/upload`
- **Functionality**:
  - Handle file uploads from the client.
  - Encrypt the file using AES-256-CBC encryption before saving it to the server's file system.
  - Save the file metadata (filename, file size, upload date, encrypted file path, etc.) in MongoDB.

### 3. File Download Endpoint

- **Endpoint**: `GET api/file/download/:fileId`
- **Functionality**:
  - Handle file download requests from the client.
  - Decrypt the file on the server before sending it back to the client.
  - Ensure the client receives the original file (not the encrypted version).

### 4. Encryption and Decryption

- **Encryption Method**: AES-256-CBC
- **Key Management**:
  - Store the encryption key and initialization vector (IV) securely.
  - Do not hardcode the encryption key and IV in the source code.
- **Error Handling**:
  - Implement proper error handling for encryption and decryption failures.

### 5. Authentication

- **Mechanism**: Implement basic authentication using JWT (JSON Web Token).
- **Purpose**: Ensure that only authorized users can upload and download files.

### 6. Security Considerations

- **Key and IV Protection**:
  - Ensure that the encryption key and IV are not exposed in logs or error messages.
- **File Validation**:
  - Validate file types and sizes to prevent malicious file uploads.
- **Rate Limiting**:
  - Implement rate limiting to prevent abuse of the upload and download endpoints.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running
- Basic understanding of Node.js, Express.js, Crypto, streams and MongoDB

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd file-storage-system
   ```

2. **Install server dependencies**:
   ```bash
   npm install
   ```
3. **Create the mongodb database**
   ```
   file_storage_db
   ```
4. **Configure Environment Variables**:
   - Create a `.env` file at the root of the project and add the necessary environment variables (e.g., MongoDB URI, encryption key, IV, JWT secret).

5. **Run the server**:
   ```bash
   npm start:dev // please add the .env.dev file by referring the .env.example file
   ```

### API Endpoints

1. **POST api/user/signup**:
   - Signup using name, email and password.

2. **POST api/user/login**:
   - login using email and password and return the accessToken.

1. **POST api/file/upload**:
   - Upload a file in documentFile key using form/multipart. The file is encrypted and stored on the server, and metadata is saved in MongoDB.

2. **GET file/download/:fileId**:
   - Download a file by `fileId`. The file is decrypted on the server before being sent to the client.


## Security Best Practices

- **Do not hardcode sensitive data** (e.g., encryption keys, IVs) in the codebase.
- **Ensure strong validation** on file types and sizes to prevent uploading malicious files.
- **Implement rate limiting** to protect the API from abuse.
- **Use HTTPS** to secure the communication between the client and the server.

## Conclusion

This Secure File Storage System provides a robust solution for securely uploading and downloading files with encryption. By following the above steps and best practices, you can ensure that files are stored securely and only accessible by authorized users.