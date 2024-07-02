//load the database
const DB = require('./database.js')

DB.loadDB();
//get all contents of the database
console.log(DB.getAll())

//set a key value pair
DB.set("movie", "KGF");
DB.set("actor", "yash");
DB.set("karna2", "suryaputra");
DB.set("arjuna2","gandivam")


//get the value of a key
console.log(DB.get("movie"))
console.log(DB.get("actor"))
console.log(DB.get("karna"))

//update the value of a key
DB.update("movie", "Kalki 2990 AD");
console.log(DB.get("movie"))

//set an existing key
DB.set("movie", "Kalki 2991 AD");

//delete a key
DB.del("movie");

//get all contents of the database
console.log(DB.getAll())
