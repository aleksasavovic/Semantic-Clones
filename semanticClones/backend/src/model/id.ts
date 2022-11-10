import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Id = new Schema({
    nextId:Number,
    nextIdCode:Number
})

export default mongoose.model('Id', Id, 'id');