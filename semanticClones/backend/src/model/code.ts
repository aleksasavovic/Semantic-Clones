import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Code = new Schema({
    id:Number,
    wholeCode:String,
    methodsCombinations:Array,
    methods:Array,
    status:String,
    name:String
})

export default mongoose.model('Code', Code, 'codes');