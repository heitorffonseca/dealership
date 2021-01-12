module.exports = (req, res, next) => {
    const { name } = req.body;
    const errors = {};

    if (!name) errors['name'].push('required');

    if (errors)
        return res.status(403).send({ error: 'Field validation failure', errors });

    next();
}