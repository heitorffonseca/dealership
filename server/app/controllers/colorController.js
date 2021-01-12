const express = require('express');

const Color = require('../models/color');

const validate = require('../middlewares/validators/color');

const router = express.Router();

/**
 * list colors
 */
router.get('/list', async (req, res, next) => {
    const { filter } = req.body;

    try {

        const colors = await Color.find(filter);

        return res.status(200).send(colors);

    } catch (err) {

        console.error(err);
        return res.status(400).send({ error: 'Failed to list colors' });

    }
});

/**
 * show color
 */
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {

        const color = await Color.findOne({ _id: id });

        if (!color)
            return res.status(404).send({ error: 'Color notfound' });

        return res.status(200).send(color);
        
    } catch (err) {

        console.error(err);
        return res.status(400).send({ error: 'Failed to show color' });

    }
});

/**
 * create new color
 */
router.post('/', validate, async (req, res, next) => {
    const { hexadecimal } = req.body;

    try {

        if (await Color.findOne({ hexadecimal }))
            return res.status(400).send({ error: 'Color already exists' });

        const color = await Color.create(req.body);

        return res.status(201).send(color);

    } catch (err) {

        console.error(err);
        return res.status(400).send({ error: 'Failed to create new color' });

    }
});

/**
 * update color
 */
router.put('/:id', validate, async (req, res, next) => {
    const { id } = req.params;
    const { hexadecimal } = req.body;

    try {

        const color = await Color.findOne({ _id: id });

        if (color.hexadecimal != hexadecimal)
            if (await Color.findOne({ hexadecimal }))
                return res.status(400).send({ error: 'Color already exists' });

        return res.status(200).send(await Color.findByIdAndUpdate(id, { ...req.body, updatedAt: Date.now }, { new: true }));
  
    } catch (err) {

        console.error(err);
        return res.status(400).send({ error: 'Failed to update color' });
        
    }

});

/**
 * delete color
 */
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {

        if (!await Color.findOne({ _id: id }))
            return res.status(404).send({ error: 'Color notfound' });

        await Color.findByIdAndRemove(id, (err, docs) => {
            if (!err)
                return res.status(200).send();
                
            console.error(err);
            return res.status(400).send({ error: 'Failed to delete color' });
        })
        
    } catch (err) {
        
        console.error(err);
        return res.status(400).send({ error: 'Failed to delete color' });

    }
});

module.exports = app => app.use('/colors', router);