const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('connected to database'))
.catch(err=>console.error('Not connected to mongo database',err));
// creating schema 
const courseSchema=new mongoose.Schema({
 name:{type:String,required:true,minlength:10,maxlength:30,//match:/pattern/
},
 author:String,
 tags:[String],
 date:{ type: Date,default: Date.now},
 isPublished:Boolean,
 price :{type:Number,required:function(){
  return this.isPublished;
 },min:15,max:100}
});
//use model to create class for schema
const Course=mongoose.model('Course',courseSchema);
async function createCourse(){
//creating object for class
const course=new Course({
  name:"node js",
  author:'jas',
  tags:['jquery','DB'],
  isPublished:true,
  price:12
});
// save to database
try{
  const result= await course.save();
  console.log(result);
}
catch(ex){
  console.log(ex.message);
}
}
createCourse();
// getting documents from monngo db
async function getCourse(){
  const pageNumber=2;
  const pageSize=10;
 const courses= await Course
 .find({author:"jas"})
 // start with ja
 //.find({author:/^ja/})   //regular expressions case sensitive
 // end with der
 //.find({author:/der$/i})  //regular expressions case insenitive
 // any where kh in string
//.find({author:/.*kh.*/})   //regular expressions case sensitive
 //.find()
 //.or([{author:"jas"},{isPublished:true}])  //logical operator
 //.and([{author:"jas"},{isPublished:true}])   // logical operator
 //comparision operators
 //.find({price:{ $gte:10,$lte:20}})   //comparision operators
 //.find({price:{$in :[12,100]}})    //comparision operators
 //.skip((pageNumber-1)*pageSize)  //pagination
 //.limit(pageSize)               //pagination
 //.sort({name:1})
 //.count();
 //.select({name:1,tags:1});
 console.log(courses);
}
//getCourse();
