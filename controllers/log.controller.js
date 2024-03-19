const fs = require("fs");
const path = require("path");

const getLogs = async (req, res) => {
 try {
  const { serialNumber } = req.params;
  const logFilePath = path.join(`./logs/${serialNumber}/app.log`);
  try {
    fs.accessSync(logFilePath, fs.constants.F_OK);
    fs.readFile(logFilePath, 'utf-8', (err, data) => {
      if (err) {
        return res.status(200).json({ msg: 'Error reading log file', logs: [], status: 200 });
      }
      if (!data.trim()) {
        return res.status(200).json({ msg: 'Log file is empty', logs: [], status: 200 });
      }
      const logEntries = data.trim().split('\n');
      const last20Logs = logEntries.slice(-40).map(entry => JSON.parse(entry));
      res.json({ msg: "logs", logs: last20Logs, status: 200 });
    });
  } catch (accessErr) {
    if (accessErr.code === 'ENOENT') {
      return res.status(200).json({ msg: 'Log file not found', logs: [], status: 200 });
    } else {
      throw accessErr; // Re-throw the error if it's not ENOENT
    }
  }
 } catch (error) {
  console.error('Error:', error);
  return res.status(400).json({ msg: error.message, status: 400 });
 }
};

module.exports = {
 getLogs
};
