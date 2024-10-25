const Task = require('../models/Task')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        if(!tasks) {
            return next(createCustomError("No tasks available", 404))
        }
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const createTask = async(req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const getTask = async(req, res, next) => {
    try {
        const {id:taskID} = req.params  
        const task = await Task.findOne({_id:taskID})
        if(!task) {
            return next(createError(`No task with id: ${taskID} exist`, 404))
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const updateTask = async(req, res) => {
    try {
        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {new:true, runValidators:true})
        if(!task) {
            return next(createError(`No task with id: ${taskID} exist`, 404))
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg: error})
    }}

const deleteTask = async (req, res) => {
    try {
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if(!task) {
            return next(createError(`No task with id: ${taskID} exist`, 404))
        }
        res.status(200).json({status:"success"})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}
