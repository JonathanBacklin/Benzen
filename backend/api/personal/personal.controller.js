const express = require("express");
const router = express.Router();
const Personal = require('./personal.model');
const PersonalService = require('./personal.service');

router.post ('/', async (req, res) => {
    const newPersonal = await PersonalService.createPersonal(req.body);
    if(newPersonal){
        res.status(200).send(newPersonal);
    } else {
        res.status(401).send({error: "bad input"});
    }
});

router.get('/allPersonal', async (req, res) => {
    const showPersonal = await PersonalService.showPersonal()
    console.log(PersonalService.showPersonal)
    console.log(showPersonal)
    if(showPersonal){
        res.status(200).send(showPersonal);
    } else {
        res.status(404).send({error: 'No staff found'});
    }
});

router.get('/showOnePersonal/:id', async (req, res) => {
    const OnePersonal = await PersonalService.showOnePersonal(req.params.id);
    if(OnePersonal){
        res.status(200).send(OnePersonal);
    } else {
        res.status(404).send({error: 'No staff with that id found.'});
    }
});

router.patch('/updatePersonal/:id', async (req, res) => {
    const personal = await PersonalService.updatePersonal(req.params.id, req.body);
    if(personal){
        res.status(200).send(personal);
    } else {
        res.status(404).send({error: 'Staff with that id does not exist'});
    }
});

router.delete('/deletePersonal/:id', async (req,res) => {
    const personal = await PersonalService.deletePersonal(req.params.id);
    if(!personal.error){
        res.status(204).send();
    } else {
        res.status(404).send({error: "Staff with given id does not exist"});
    }
});

module.exports = router;