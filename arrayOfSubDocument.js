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
    authors:[autherSchema]
   }));
   async function createCourse(name, authors)
   { 
    const course = new Course({ 
      name,
      authors
   });
    
    const result = await course.save(); 
    console.log(result);
   } 
   async function addAuthor(courseId,author){
    const course= await Course.findById(courseId);
    course.authors.push(author);
    course.save();
   }
   async function removeAuthor(courseId,authorId){
    const course= await Course.findById(courseId);
    const author=course.authors.id(authorId);
    author.remove();
    course.save();
   }
   //removeAuthor('655d7c57dd6cb14dec84e5e6','655d7d925dff4c2680a31ca5');
   //addAuthor('655d7c57dd6cb14dec84e5e6',new Author({name:"benny"}));
     
    createCourse('Node Course',[
      new Author({name:'john'}),
      new Author({name:'Avi'}),
      new Author({name:'Gurjit'})
    ]);
