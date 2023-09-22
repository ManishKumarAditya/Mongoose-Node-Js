const mongoose = require("mongoose");
// console.log(mongoose);
const validator = require("validator");

// connection creation with new database in mongodb campass
mongoose.connect("mongodb://localhost:27017/Playlist")
.then(() => console.log('Connected Successfully...!'))
.catch((error) => console.log(console.error));

// schema

// A Mongoose schema defines the structure of the doucment,
// default values, validators, etc.,

const PlaylistSchema = new mongoose.Schema({
    name : {
        type : String,
        required  : true,
        unique:true,
        lowercase:true,
        trim:true,  
        minLength:2,
        maxLength:30
    }, 
    ctype : {
        type:String,
        required:true,
        lowercase:true,
        enum:["frontend", "backend", "database"]
    },
    videos : {
        type:Number,

        // custom validation message 1st method
        // validate(value){
        //     if(value < 0) {
        //         throw new Error('Video count should not negative at any time');
        //     }
        // }

        //  it is not working for creating new one data in database
        validate:{
            validator:function(value) {
                return value > 0 

                // for the use of if condition
                // if(value < 0) {
                //     throw new Error('Video count should not negative at any time');
                // }
            },
            // validator: function(v){
            //     console.log("Manish",v);
            //     return v > 0 
            // },
            message: props => `${props.path} should be postive only not negative,  '${props.value}'`

            // message:"Video count should not be negative at any time",
        }
    },
    author : String,
    email : {
        type:String,
        required:true,
        unique:true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is Invalid");
            }
        }
    },
    active : Boolean,
    date : {
        type : Date,
        default : Date.now
    }
});


// A Mongoose model is a wrapper on the Mongoose schema.
// A Mongoose schema defies the structure of the document,
// default values , validators, etc. , whereas a Mongoose model 
// provides an interface to the database for creating,
// querying, updating , deleting records, etc.

// collection creation or document
const Playlist = new mongoose.model("Playlist", PlaylistSchema);

const createDocument = async () => {

    try {
        // create a document or insert
        // const reactPlayList = new Playlist({
        //     name : "Node js",
        //     ctype : "Back End",
        //     videos : 60,
        //     author : 'Manish',
        //     active : true,
        // });

        // const jsPlayList = new Playlist({
        //     name : "Javascript",
        //     ctype : "Front End",
        //     videos : 50,
        //     author : 'Manish',
        //     active : true,
        // });

        // const mongoPlayList = new Playlist({
        //     name : "MongoDB",
        //     ctype : "Database",
        //     videos : 10,
        //     author : 'Manish',
        //     active : true,
        // });

        // const mongoosePlayList = new Playlist({
        //     name : "Mongoose",
        //     ctype : "Database",
        //     videos : 10,
        //     author : 'Manish',
        //     active : true,
        // });

        const expressPlayList = new Playlist({
            name : "mongosseDB JS55",
            email: "nitish.kumarq@gmail.com",
            ctype : "database",
            videos : 40,
            author : 'manish',
            active : true,
        });  

        // insert into database 
        const result = await expressPlayList.save();
        // const result = await Playlist.insertMany([jsPlayList, mongoPlayList, mongoosePlayList, expressPlayList])
        console.log(result);

    }catch(error) {
        console.log(error);
    }
}

// calling a async function in mongoose
createDocument();

// const getDocument = async () => {
//    const result =  await Playlist.find({ctype : "Front End"}).select({name : 1}).limit(1);
//    console.log(result);
// };

const getDocument = async () => {
    // comaprison operators example from mongoDB 

    // const result = await Playlist.find({videos : {$gte : 50}})
    // const result = await Playlist.find({videos : {$lte : 50}})
    // const result = await Playlist.find({ctype : {$in : ["Back End", "Database"]}})
    // const result = await Playlist.find({ctype : {$nin : ["Back End", "Database"]}})
    // .select({name : 1})


    // logical query operator form mongoDB
    // const result = await Playlist.find({ $or :
    //     [{ctype : "Back End"},
    //     {active : "false"}]
    // });

    // const result = await Playlist.find({ $and :
    //     [{ctype : "Back End"},
    //     {active : "false"}]
    // });

    // count and sort document in ascending and desending order
    const result = await Playlist.find({author : "Manish"})
    .select({name:1})
    // .sort("name : 1") // in ascending Sort
    .sort({name : -1}) // Descending Sort
    // .countDocuments();
    console.log(result);
}

// getDocument();


const updateDocuments = async (_id) => {
    try {
        // const result = await Playlist.updateOne({_id}, // only gives  acknowledged: true,
        const result = await Playlist.findByIdAndUpdate({_id}, //gives hole result
            // { $set : { name : "node js both" }}); // gives previous data not  gives latest update data
            { $set : { name : "node js both to" }}, {new : true}); // it update the data and gives current updated or latest data form mongoDB
            console.log(result);
    } catch (error) {
        console.log(error);
    }
}

// const updateDocuments = async (id) => {
//    const result = await Playlist.updateOne({id : id});
// }


// updateDocuments("650994d18873be18f40524b1");


// delete the document 
const deleteDocument = async (_id) => {
    try {
        // const result = await Playlist.deleteOne({_id}); //simple delete and gives the { acknowledged: true, deletedCount: 1 }
        const result = await Playlist.findByIdAndDelete({_id}); //delete and gives the all document (row data)
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

// deleteDocument('6509a3ac6748892c808a94d0');