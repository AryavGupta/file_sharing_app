import { useEffect, useRef, useState } from 'react'
import { uploadFile } from './service/api';
import './App.css'

function App() {

  const fileInputRef = useRef();

  const [file, setFile] = useState('');

  const [result, setResult] = useState('');
  // State for loading indicator
  const [loading, setLoading] = useState(false);
  // State for error messages
  const [error, setError] = useState('');

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        setLoading(true);
        setError('');
        setResult('');

        try {
          // Create FormData object to send file to server
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);

          // Upload file and get response
          const response = await uploadFile(data);
          setResult(response.path);
        } catch (err) {
          // Handle upload errors
          setError(err.message || 'Upload failed. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    // console.log("Button pressed");
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Basic file validation
    if (selectedFile) {
      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
    }
  }

  return (
    // <div className='main-wrapper' style={{ backgroundImage: `url('https://images.pexels.com/photos/23547/pexels-photo.jpg')` }}>
    <div className='main-wrapper' style={{ backgroundImage: `url('/background.jpg')` }}>
      <div className='container'>
        <div className='wrapper'>
          <h1>File Sharing!</h1>
          <p>Upload and share the download link!</p>

          {/* Upload button */}
          <button onClick={onUploadClick} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* Display error message if any */}
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          {/* Display download link when upload is successful */}
          {result && (
            <a href={result} target='_blank' rel="noopener noreferrer" style={{ marginTop: '20px', display: 'block' }}>
              {result}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default App
