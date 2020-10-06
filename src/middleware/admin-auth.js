const adminAuth = (req, res, next) => {
    try {
        if (req.user.user_role !== 'administrator') {
            throw new Error;
        };
        next();
    } catch (e) {
        res.status(401).send( 'Unauthorized access.' )
    };
};

module.exports = adminAuth