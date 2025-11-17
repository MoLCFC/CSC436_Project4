module.exports = (req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    details: `Route ${req.originalUrl} does not exist`
  });
};

