// src/components/ChangeVideo.js
import React, { useState } from 'react';

const ChangeVideo = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      // Logika untuk mengunggah file dan mengganti video
      console.log('Video baru: ', selectedFile);
      alert('Video telah diubah!');
    } else {
      alert('Pilih file video terlebih dahulu!');
    }
  };

  return (
    <div>
      <h2>Ubah Video</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Ubah Video</button>
    </div>
  );
};

export default ChangeVideo;
