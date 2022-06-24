import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  id:{
    type:String,
    required:[true,'ID讀取錯誤'],
    unique:true
  },
  places:{
    type:Array,
    required:[true,'地區讀取錯誤']
  }
},{ versionKey: false }
)

export default mongoose.model('users',userSchema)
