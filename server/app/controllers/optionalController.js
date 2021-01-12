const express = require('express');

const Optional = require('../models/optional');

const validate = require('../middlewares/validators/optional');

const router = express.Router();

/**
 * list optionals
 */
router.get('/list', async (req, res, next) => {
    const { filter } = req.body;

    try {

        const optionals = await Optional.find(filter);

        return res.status(200).send(optionals);

    } catch (err) {

        console.error(err);
        return res.status(400).send({ error: 'Failed to list optionals' });

    }
});

/**
 * show optional
 */
router.get('/:id', async (req, res, next) => {
    const { id } = (req.params);

    try {

        const optional = await Optional.findOne({ _id: id });

        if (!optional)
            return res.status(404).send({ error: 'Optional notfound' });

        return res.status(200).send(optional);

    } catch (err) {

        console.error(err);
        return res.status(400).send({ error: 'Failed to show optional' });

    }
});

/**
 * create new optional
 */
router.post('/', validate, async (req, res, next) => {
   try {

       const optional = await Optional.create(req.body);

       return res.status(201).send(optional);

   } catch (err) {

       console.error(err);
       return res.status(400).send({ error: 'Failed to create new optional' });

   }
});

/**
 * update optional
 */
router.put('/:id', validate, async (req, res, next) => {
    const { id } = req.params;

    try {

        if (!await Optional.findOne({ _id: id }))
            return res.status(404).send({ error: 'Optional notfound' });

        return res.status(200).send(await Optional.findByIdAndUpdate(id, { ...req.body, updatedAt: Date.now }, { new: true }));

    } catch (err) {

        console.error(err);
        return res.status(400).send({ error: 'Failed to update optional' });

    }
});

/**
 * delete optional
 */
router.delete('/:id', async (req, res, next) => {
   const { id } = req.params;

   try {

       if (!await Optional.findOne({ _id: id }))
           return res.status(404).send({ error: 'Optional notfound' });

       await Optional.findByIdAndRemove(id, (err, docs) => {

           if (!err)
               return res.status(200).send();

           console.error(err);
           return res.status(400).send({ error: 'Failed to delete optional' });

       });

   } catch (err) {

       console.error(err);
       return res.status(400).send({ error: 'Failed to delete optional' });

   }
});

module.exports = app => app.use('/optionals', router);