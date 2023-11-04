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
 .find({author:"jas"})
 // start with ja
 //.find({author:/^ja/})   //regular expressions case sensitive
 // end with der
 //.find({author:/der$/i})  //regular expressions case insenitive
 // any where kh in string
.find({author:/.*kh.*/})   //regular expressions case sensitive
 //.find()
 //.or([{author:"jas"},{isPublished:true}])  //logical operator
 //.and([{author:"jas"},{isPublished:true}])   // logical operator
 //comparision operators
 //.find({price:{ $gte:10,$lte:20}})   //comparision operators
 //.find({price:{$in :[12,100]}})    //comparision operators
// .limit(10)
 //.sort({name:1})
 .count();
 //.select({name:1,tags:1});
 console.log(courses);
}
getCourse();
