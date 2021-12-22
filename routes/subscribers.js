const express = require('express');
const router = express.Router();

const Subscriber = require('../models/subscriber'); //load the subscriber model

//get all the subscribers
router.get('/', async(req, res) => {
    try {
        const subscriber = await Subscriber.find();
        if (!subscriber) return res.status(400).json({ message: 'An error occured' });
        res.json(subscriber);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get one subscriber based on ID
router.get('/:id', getSubscriber, (req, res) => {
    res.send(res.subscriber);
});

//create a subscriber
router.post('/', async(req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscriberToChannel: req.body.subscriberToChannel
    });
    const result = await subscriber.save();
    try {
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//modify a subscriber
router.patch('/:id', getSubscriber, async(req, res) => {
    try {
        if (req.body.name != null) res.subscriber.name = req.body.name;
        if (req.body.subscriberToChannel != null) res.subscriber.subscriberToChannel = req.body.subscriberToChannel;

        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

//delete a subscriber
router.delete('/:id', getSubscriber, async(req, res) => {
    try {
        const deletedSubscriber = await Subscriber.findByIdAndDelete(res.subscriber);
        if (!deletedSubscriber) return res.status(400).json({ message: 'No subscriber has been found' });
        res.send(deletedSubscriber);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//create a middleware to retrieve a subscriber based on ID
async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) res.status(404).json({ message: "Cannot find subscriber" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
    res.subscriber = subscriber;
    next();
}

module.exports = router;