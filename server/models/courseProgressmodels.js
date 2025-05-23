import mongoose from 'mongoose';

const lectureProgressSchema =new mongoose.Schema({
    lectureId:{
        type:String
    },
    viewed:{
        type:Boolean
    },

});

const courseProgressSchema =new mongoose.Schema({
    userId:{
        type:String
    },
    courseId:{
        type:String
    },
    completed:{
        type:Boolean
    },
    score:{
       type:String
    },
    pass:{
        type:Boolean,
        default:false
    },
    lectureProgress:[lectureProgressSchema]
});

export const CourseProgress = mongoose.model("CourseProgress",courseProgressSchema);