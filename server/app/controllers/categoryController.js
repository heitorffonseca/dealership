const express = require('express');

const Category = require('../models/category');

const validate = require('../middlewares/validators/category');

const router = express.Router();

/**
 * list categories
 */
router.get('/list', async (req, res, next) => {
    const { filter } = req.body;

    try {

        const categories = await Category.find(filter);

        return res.status(200).send(categories);

    } catch (err) {

        console.error(err);
        return res.status(400).send({ error: 'Failed to list categories' });

    }
});

/**
 * show category
 */
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {

        const category = await Category.findOne({ _id: id });

        if(!category)
            return res.status(404).send({ error: 'Category notfound' });

        return res.status(200).send(category);

    } catch (err) {

        console.error(err);
        return res.status(400).send({ error: 'Failed to show category' });

    }
});

/**
 * create new category
 */
router.post('/', validate, async (req, res, next) => {
    try {

        const category = await Category.create(req.body);

        return res.status(201).send(category);

    } catch (err) {

        console.error(err);
        return res.status(400).send({ error: 'Failed to create new category' });

    }
});

/**
 * update category
 */
router.put('/:id', validate, async (req, res, next) => {
    const { id } = req.params;

    try {

        if (!await Category.findOne({ _id: id }))
            return res.status(404).send({ error: 'Category notfound' });

        return res.status(200).send(await Category.findByIdAndUpdate(id, { ...req.body, updatedAt: Date.now }, { new: true }));

    } catch (err) {

        console.error(err);
        return res.status(400).send({ error: 'Failed to update category' });

    }
});

/**
 * delete category
 */
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {

        if (!await Category.findOne({ _id: id }))
            return res.status(404).send({ error: 'Category notfound' });

        await Category.findByIdAndRemove(id, (err, docs) => {

            if (!err)
                return res.status(200).send();

            console.error(err);
            return res.status(400).send({ error: 'Failed to delete category' });

        });
        
    } catch (err) {
        
        console.error(err);
        return res.status(400).send({ error: 'Failed to delete category' });

    }
});

module.exports = app => app.use('/categories', router);