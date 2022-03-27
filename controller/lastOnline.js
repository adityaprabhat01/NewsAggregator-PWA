const lastOnline = (req, res) => {
  res.json({
    timestamp: new Date().valueOf().toString()
  })
}

const verifyCache = (req, res) => {
  console.log(req.body)
  const { timestamp } = req.body;
  function isExpired(lastOnline) {
    if (!lastOnline) return true;
    if ((1000 * 60 * 60 * 1) + parseFloat(lastOnline) > new Date().getTime()) return false;
    return true;
  };
  const status = isExpired(timestamp);
  res.json({
    isExpired: status
  })
}

module.exports = {
  lastOnline,
  verifyCache
}