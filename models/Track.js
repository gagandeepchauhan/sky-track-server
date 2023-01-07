const { Schema, model } = require('mongoose')

const LocationSchema = new Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        heading: Number,
        accuracy: Number,
        altitudeAccuracy: Number,
        speed: Number
    }
})

const TrackSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        locations: {
            type: [LocationSchema],
            required: true
        }
    },
    {
        timestamps: true
    }
)

model('Track', TrackSchema)