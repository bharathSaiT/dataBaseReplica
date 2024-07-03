//load the database
const DB = require('./database.js');

// (async ()=>{
//     await DB.loadDB();
// })();

//if DB is loaded & is returned as a promise
// DB.loadDB().then((data)=>{
//     console.log("Database loaded");
//     console.log(data);

// });

async function main(){
    await DB.loadDB();
    console.log("executed after the database loaded");

    //get all contents of the database
    console.log(DB.getAll())

    //set a key value pair
    DB.set("movie", "KGF",3);
    DB.set("actor", "yash");
    DB.set("karna", "suryaputra");
    DB.set("arjuna","gandivam")


    //get the value of a key
    console.log(DB.get("movie"))
    console.log(DB.get("actor"))
    console.log(DB.get("karna"))

    //update the value of a key
    DB.update("movie", "Kalki 2990 AD");
    console.log(DB.get("movie"))

    //set an existing key
    DB.set("movie", "Kalki 2991 AD",);
    

    //delete a key
    // DB.del("movie");

    //get all contents of the database
    console.log(DB.getAll())

}

main();
