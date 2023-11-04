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
 isPublished:Boolean,
 price : Number
});
//use model to create class for schema
const Course=mongoose.model('Course',courseSchema);
/*async function createCourse(){
//creating object for class
const course=new Course({
  name:'jquery course',
  author:'jaswinder',
  tags:['jquery','database'],
  isPublished:true,
  price:12
});
// save to database
const result= await course.save();
console.log(result);
}
createCourse();
*/
// getting documents from monngo db
async function getCourse(){
 const courses= await Course
 //.find({author:"jas"})
 //comparision operator
 .find({price:{ $gte:10,$lte:20}})
// .limit(10)
 //.sort({name:1})
 //.select({name:1,tags:1});
 console.log(courses);
}
getCourse();
