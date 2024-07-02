//an replica of in-mem key value store

 const DataBase_inMem={}

function set(key , value){
    if(check(key)){
        console.log("key already exists");
        return;
    }
    DataBase_inMem[key]=value
}


function get (key){
    if(!check(key)){
        console.log("key does not exist");
        return;
    }
    return DataBase_inMem[key]
}

function del(key){
    if(!check(key)){
        console.log("key does not exist");
        return;
    }
    delete DataBase_inMem[key]
    //this will not delete the key, it will just set the value to undefined leading to memory wastage 
    // DataBase_inMem[key]=undefined 
}

function update(key , value){
    if(!check(key)){
        console.log("key does not exist");
        return;
    }
    DataBase_inMem[key]=value;
}

function check(key){
    return DataBase_inMem.hasOwnProperty(key)
}

function getAll(){
    return DataBase_inMem
}

function clearDB(){
    //clears the database efficiently , as GC will take care of the rest
    Object.keys(DataBase_inMem).forEach(key=>{
        delete DataBase_inMem[key]
    })
    //ineffcient way of clearing the database, as object is not deleted from memory ,GC might not be triggered & also new object creation is expensive
    // DataBase_inMem={}
}

module.exports={
    set,
    get,
    del,
    update,
    getAll,
    clearDB
}