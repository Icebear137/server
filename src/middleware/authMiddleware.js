const jwt = require('jsonwebtoken');

exports.requireAuth = (req, res, next) => {
    // Lấy token từ header, query string hoặc cookie
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Giải mã token để lấy thông tin người dùng
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // Gán userId vào req để các middleware và hàm xử lý tiếp theo có thể truy cập
        req.userId = decodedToken.userId;
        next();
    });
};