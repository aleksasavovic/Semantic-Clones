import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    },
    startedReviews:Array,
    finishedReviews:Array,
    activeCodesProgress:Array
})

export default mongoose.model('User', User, 'users');