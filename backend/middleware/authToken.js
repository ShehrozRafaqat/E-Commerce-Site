const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        // Extract the token from cookies
        const token = req.cookies?.token;
        console.log("token", token);

        if (!token) {
            return res.status(401).json({
                message: "Please Login...!",
                error: true,
                success: false
            });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error("JWT verification failed:", err);
                return res.status(403).json({
                    message: "Invalid token",
                    error: true,
                    success: false
                });
            }

            console.log("decoded", decoded);

            // Attach the user ID to the request object
            req.userId = decoded?._id;

            // Proceed to the next middleware or route handler
            next();
        });

    } catch (err) {
        console.error("Middleware error:", err);
        res.status(500).json({
            message: "Server error",
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;