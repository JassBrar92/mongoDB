const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('connected to database'))
.catch(err=>console.error('Not connected to mongo database',err));
// creating schema 
const courseSchema=new mongoose.Schema({
 name:String,
 author:String,
 tags:[String],
 date:{ type: Date,default: Date.now},
 isPublished:Boolean
});
//use model to create class for schema
const Course=mongoose.model('Course',courseSchema);
/*async function createCourse(){
//creating object for class
const course=new Course({
  name:'javascript course',
  author:'jas',
  tags:['Api Service','frontend'],
  isPublished:true
});
const result= await course.save();
console.log(result);
}
createCourse();*/
// getting documents from monngo db
async function getCourse(){
 const courses= await Course.find({author:"jas"})
 .limit(10)
 .sort({name:1})
 .select({name:1,tags:1});
 console.log(courses);
}
getCourse();
