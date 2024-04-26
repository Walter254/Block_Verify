import React, { useState } from 'react';

function ContentUpload() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', text);

    try {
      const response = await fetch('/api/upload', { //  {config_description: "Ensure the API endpoint matches the backend configuration"}
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Content uploaded successfully:', data);
      alert('Content uploaded successfully');
    } catch (error) {
      console.error('Error uploading content:', error);
      alert('Error uploading content');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="file">Upload Image: </label>
        <input type="file" id="file" onChange={handleFileChange} />
      </div>
      <div>
        <label htmlFor="text">Text Content: </label>
        <textarea id="text" value={text} onChange={handleTextChange} />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
}

export default ContentUpload;