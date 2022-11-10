import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let randomList = new Schema({
    randomList:Array
})

export default mongoose.model('randomList', randomList, 'randomList');