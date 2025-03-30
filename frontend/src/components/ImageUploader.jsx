
import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = ({ studentId }) => {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewUrls);
  };

  const handleSave = async () => {
    if (images.length === 0) {
      setError('Please select at least one image.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      images.forEach((image) => formData.append('images', image));
      formData.append('studentId', studentId);
      const response = await axios.post('https://image-backed.onrender.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(response.data.message);
    } catch (error) {
      console.error(error);
      setError('Failed to save images or extract text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Images</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        disabled={loading}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
        {previewImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Preview ${index + 1}`}
            style={{ width: '150px', height: '150px', objectFit: 'cover', opacity: loading ? 0.5 : 1 }}
          />
        ))}
      </div>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <button
        onClick={handleSave}
        disabled={loading || images.length === 0}
        style={{ marginTop: '20px', padding: '10px 20px', cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? 'Processing...' : 'OK'}
      </button>
    </div>
  );
};

export default ImageUploader;