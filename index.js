const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('connected to database'))
.catch(err=>console.error('Not connected to mongo database',err));
// creating schema 
const courseSchema=new mongoose.Schema({
 name:{type:String,required:true,minlength:1,maxlength:30,//match:/pattern/
},
 author:String,
 tags:{
  type:Array,
  validate:{
    isAsync:true,
    validator:function(v,callback){
      setTimeout(()=>{
        // do some async work here
        const result=v && v.length>0;
        callback(result);
      },4000);
   },
    message:"There must be one tag"
  }
},
 date:{ type: Date,default: Date.now},
 isPublished:Boolean,
 price :{type:Number,required:function(){
  return this.isPublished;
 },min:5,max:100},
category:{
  type:String,
  required:true,
  enum:["Web","Mobile","Network"]
}});
//use model to create class for schema
const Course=mongoose.model('Course',courseSchema);
async function createCourse(){
//creating object for class
const course=new Course({
  name:"node js",
  category:'-',
  author:'jas',
 tags:[],
  isPublished:true,
  price:12
});
// save to database
try{
  const result= await course.save();
  console.log(result);
}
catch(ex){
  for(field in ex.errors){
    console.log(ex.errors[field].message);
  }
 // console.log(ex.message);
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
