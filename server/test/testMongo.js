var DataStore = require("nedb");

db = {};
db.messages = new DataStore();

db.messages.loadDatabase();
mes = {
    id_auteur : 42,
    message : "Voici le message",
    date : new Date(),
    nom_auteur : "Chu",
    likes : [{id_liker : 28,date : 'xxx'},{id_liker : 103,date : 'xxx'}],  
}

db.messages.insert(mes);

mes = {
    id_auteur : 10,
    message : "Ratio",
    date : new Date(),
    nom_auteur : "Chu",
    likes : [],  
}

db.messages.insert(mes);

uneSecondeAvant =  new Date(Date.now() - 1000);
db.messages.find({id_auteur : {$in : [42, 10]}, date : {$gt : uneSecondeAvant}},(err,doc)=>{
    if(err){
        console.log("Erreur");
    }
    else{
        console.log("coucou "+doc);
    } 
});

/*
db.messages.find( {id_auteur:42}, {message:1, _id:0}, (err, docs) => {
    if(err){
        console.log("Erreur");
    }
    else{
        console.log(docs);
    }
}); */

function getDocument(id_auteur, texte) {
    return new Promise( (resolve, reject) => {
        db.messages.find({id_auteur: id_auteur, message: texte},
                         {_id: 1},
                         (err, docs) => {
            if (err){
                reject(err);
            } else {
                resolve(docs[0]._id);
            }
        });
    });
}

console.log(getDocument(42, "Voici le message"));

getDocument(42, 'Voici le message').then((res => {
    console.log(res);
    db.messages.find( {_id: res}, {message: 1, _id: 0}, (err, docs) => {
        if (err){
            console.log(err);
        } else {
            console.log(docs);
        }
    })
}));