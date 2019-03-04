const express = require('express');
const router = express.Router();

router.get('/createTask', (req, res) => {
    const newTask = new Task();

    newTask.save(function (err, data) {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/task/' + data._id);
        }
    })
});

router.get('/task/:id', (req, res) => {
    if (req.params.id) {
        Task.findOne({_id: req.params.id}, (err, data) => {
            if (err) {
                console.log(err);
                res.render('error');
            }

            if (data) {
                res.render('task', {content: data.content, roomId: data.id});
            } else {
                res.render('error');
            }
        });
    } else {
        res.render('error');
    }
});

module.exports = router;
