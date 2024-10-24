/* eslint-disable react/button-has-type */
import React, { useState, ChangeEvent } from 'react';

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file as File);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('No file selected!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('File uploaded successfully:', data);
        alert('File uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        alert('Error uploading file!');
      });
  };

  return (
    <div>
      <h2>File Uploader</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUploader;
