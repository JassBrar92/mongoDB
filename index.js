const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/')
.then(()=>console.log('connected to database'))
.catch(err=>console.error('Not connected to mongo database',err));