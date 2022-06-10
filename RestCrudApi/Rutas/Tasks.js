const express = require('express')
const router = express.Router()
const tasksSchema = require('../Models/Tasks')
const jwt = require('jsonwebtoken')

const token = jwt.sign(
    {id: "b1nastic"},
    "jwtPrivateKey")

router.post('/task',
    (req, res) => {
        const verifyToken = req.header("x-auth-token")
        if(!verifyToken) return res.status(401).send({
            error:"No se dio token"
        })
        res.set('Access-Control-Allow-Origin', '*');
        const task = tasksSchema(req.body)
        task
            .save()
            .then((data) => {
                res.json(data)
            })
            .catch((error) => {
                res.json({
                    message: error
                })
            })
    }
)

router.get('/tasks',
    (req, res) => {
        const ip = req.connection.remoteAddress
        res.set('Access-Control-Allow-Origin', '*');
        tasksSchema
            .find()
            .then((data) => {
                res.send({token: token, data: data, ip: ip})
            })
            .catch((error) => {
                res.json({
                    message: error
                })
            })
    }
)

router.get('/task/:id',
    (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        const verifyToken = req.header("x-auth-token")
        if(!verifyToken) return res.status(401).send({
            error:"No se dio token"
        })
        const { id } = req.params
        tasksSchema
            .findById(id)
            .then((data) => {
                res.json(data)
            })
            .catch((error) => {
                res.json({
                    message: error
                })
            })
    }
)

router.put('/task/:id',
    (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        const verifyToken = req.header("x-auth-token")
        if(!verifyToken) return res.status(401).send({
            error:"No se dio token"
        })
        const { id } = req.params
        const { name, description } = req.body
        tasksSchema
            .updateOne({ _id: id }, { $set: { name, description } }) //Como se encuentra en la base de Mongo
            .then((data) => {
                res.json(data)
            })
            .catch((error) => {
                res.json({
                    message: error
                })
            })
    }
)

router.delete('/task/:id',
    (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        const verifyToken = req.header("x-auth-token")
        if(!verifyToken) return res.status(401).send({
            error:"No se dio token"
        })
        const { id } = req.params
        tasksSchema
            .remove({ _id: id })
            .then((data) => {
                res.json(data)
            })
            .catch((error) => {
                res.json({
                    message: error
                })
            })
    }
)

module.exports = router