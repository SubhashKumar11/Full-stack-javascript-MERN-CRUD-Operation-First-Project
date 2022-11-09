const mongoose = require('mongoose');
const db = "mongodb+srv://subhash:lingam4you@cluster0.be18svw.mongodb.net/mernstack?retryWrites=true&w=majority"
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('db connection start')
}).catch((error)=>{
    console.log(error.message)
})