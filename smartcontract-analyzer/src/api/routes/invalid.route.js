const express = require('express');
const router = express.Router();

router.get('*', (req, res) => {
    res.status(404).send('Invalid route ');
});

router.post('*', (req, res) => {
    res.status(404).send('Invalid route ');
});

router.put('*', (req, res) => {
    res.status(404).send('Invalid route ');
});

router.delete('*', (req, res) => {
    res.status(404).send('Invalid route ');
});

module.exports = router