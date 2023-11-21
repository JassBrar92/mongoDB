const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err)); 
  const autherSchema= new mongoose.Schema(
    { 
       name: String,
       bio: String, 
       website: String 
    }); 
  const Author = mongoose.model('Author',autherSchema);
  const Course = mongoose.model('Course', new mongoose.Schema({ 
    name: String,
    //author:autherSchema
    author:{
      type:autherSchema,
      required:true
    }
   }));
   async function createCourse(name, author)
   { 
    const course = new Course({ 
      name,
      author
   });
    
    const result = await course.save(); 
    console.log(result);
   } 
  /* async function updateCourse(courseId){
    const course=  await Course.findById(courseId);
     course.author.name= "john smith";
     course.save();
   }*/
   async function updateCourseDirectly(courseId){
    const course =await Course.update({_id: courseId }, {
      $set: {
        'author.name':'john Cina'
      }
    });
   }
   async function listCourses() 
   { 
    const courses = await Course 
    .find();
     console.log(courses); 
   } 
    //createCourse('Node Course',new Author({name:'john'}));
    //updateCourse("655c376af19a053438144845");
    updateCourseDirectly("655c36d9a146492864c363f5");
    //listCourses();
