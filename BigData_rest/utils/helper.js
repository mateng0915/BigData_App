module.exports = {
	
     getNextSequence: function(name, db, callback) {
         //console.log("inside " + name);
         db.collection("sequences").findAndModify({ _id: name }, [], { $inc: { "seq": 1 } }, { upsert: true, new: true },
             function(err, result) {
                 if (err) throw err;
                 //console.log(result.value.seq);
                 callback(result.value.seq);
             }
         );

     },

     rollbackSequence: function(name, db, callback) {
         //console.log("inside " + name);
         db.collection("sequences").findAndModify({ _id: name }, [], { $inc: { "seq": -1 } }, { upsert: true, new: true },
             function(err, result) {
                //console.log(result.value.seq);
                 if (err) throw err;
                 callback();
             }
         );

     }

};