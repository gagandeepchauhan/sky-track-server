const express   = require('express')
const router    = express.Router()
const { model } = require('mongoose')
const authenticate = require('../middlewares/authenticate')
const Track      = model('Track')

router.get('/tracks', authenticate, async (req,res) => {
    const { user } = req
    try{
        const tracks = await Track.find({ userId: user._id })
        res.status(200).json({
            count: tracks && tracks.length,
            data: tracks
        })
    }catch(err){
        res.status(504).json({
            error: 'Unable to find tracks'
        })
    }
})

router.post('/tracks', authenticate, async (req,res) => {
    const { user } = req
    const { name, locations } = req.body
    try{
        const track = await Track.create({
            userId: user._id,
            name,
            locations
        })
        res.status(200).json({
            data: track
        })
    }catch(err){
        res.status(504).json({
            error: 'Unable to create track'
        })
    }
})

module.exports = router