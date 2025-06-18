const File = require('../models/file');

const loginCode = (req, res) => {
  res.send("Login PAGE");
};

const registerCode = (req, res) => {
  res.send("registerr page");
};

const uploadImage = async (request, response) => {
  if (!request.file) {
    return response.status(400).json({ error: 'No file uploaded' });
  }

  // Create file object with path and original name
  const fileObj = {
    path: request.file.path,
    name: request.file.originalname,
  }

  try {
    // Save file metadata to database
    const file = await File.create(fileObj);

    // Return download link with file ID
    response.status(200).json({
      path: `http://localhost:${process.env.PORT}/file/${file._id}`,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
};

/**
 * Handles file download requests
 * Increments download count and serves the file
 */

const getImage = async (request, response) => {
  try {
    // Find file by ID from URL parameters
    const file = await File.findById(request.params.fileId);

    // Check if file exists
    if (!file) {
      return response.status(404).json({ error: 'File not found' });
    }

    // Increment download counter
    file.downloadCount++;
    await file.save();

    // Send file to client for download
    response.download(file.path, file.name);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ msg: error.message });
  }
};

module.exports = { registerCode, loginCode, uploadImage, getImage };

