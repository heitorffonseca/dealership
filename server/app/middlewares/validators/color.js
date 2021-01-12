module.exports = async (req, res, next) => {
    const { name, hexadecimal } = req.body;

    if (!name) 
        return res.status(403).send({ error: 'Name is required', var: 'name', typeError: 'required' });

    if (!hexadecimal) 
        return res.status(403).send({ error: 'Hexadecimal is required', var: 'hexadecimal', typeError: 'required' });
    
    if (hexadecimal.length != 6) 
        return res.status(403).send({ error: 'Hexadecimal must be 6 characters', var: 'hexadecimal', typeError: 'length' })

    next();
}