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

router.delete('/tracks/:id', authenticate, async (req,res) => {
    const { user } = req
    const { id } = req.params
    try{
        const track = await Track.findOne({
            userId: user._id
        })
        if(!track){
            return res.status(403).json({
                data: {
                    message: "Unauthorized action"
                }
            })
        }
        await Track.findByIdAndRemove(id)
        return res.status(200).json({
            data: {
                message: "Track deleted successfully"
            }
        })
    }catch(err){
        res.status(504).json({
            error: 'Unable to delete track'
        })
    }
})

module.exports = router