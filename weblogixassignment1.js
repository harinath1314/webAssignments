const express = require('express');
const app = express();
const fs = require('fs');

// endpoint fot the file download api
app.get('/file/download', (req, res) => {
  
  const fileID = req.query.id;


  if (!fileID) {
    return res.status(400).json({ error: 'fileID parameter is required' });
  }
  fs.readFile(`path/to/files/${fileID}`, (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename="${fileID}"`);
    res.send(data);
  });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
