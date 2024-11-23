const getAllJobs = (req, res) => {
    res.send('All jobs')
}

const getJob = (req, res) => {
    res.send('Get a job')
}

const createJob = (req, res) => {
    res.send('Job created successfully')
}

const updateJob = (req,res) => {
    res.send('Update job')
}

const deleteJob = (req, res) => {
    res.send('Delete job')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}