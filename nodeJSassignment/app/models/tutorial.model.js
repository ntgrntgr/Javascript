const sql = require('./db.js');

//constructor
const Tutorial = function(tutorial){
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
};

Tutorial.create = (newTutorial, result) => {
    sql.query('INSERT INTO tutorials SET ?', newTutorial, (err,res) => {
        if(err){
            console.log('error: ',err);
            result(err,null);
            return;
        }

        if(res.length){
            console.log('found tutorial: ',res[0]);
            result(null,res[0]);
            return;
        }

        //not founf Tutorial with id
        result({kind: 'not found' },null);
    });
};

Tutorial.getAll = (title,result) => {
    let query = 'SELECT * FROM tutorials';

    if(title){
        query += `WHERE title LIKE '${title}%'`;
    }

    sql.query(query, (err,res) => {
        if(err){
            console.log('error: ',err);
            result(null,res);
            return;
        }

        console.log('tutorials: ', res);
        result(null,res);
    });
};

Tutorial.getAllPublished = result => {
    sql.query('SELECT * FROM tutorials WHERE published=true', (err,res) => {
        if(err){
            result(null,err);
            return;
        }


        console.log('tutorials: ',res);
        result(null,res);
    });
};

Tutorial.updateById = (id,tutorial,result) => {
    sql.query(
        'UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?',
        [tutorial.title, tutorial.description, tutorial.published, id],
        (err,res) => {
            if(err){
                console.log('error: ', err);
                result(null,err);
                return;
            }

            if(res.affectedRows == 0 ){

                //not found tutorial with the id
                result({ kind: 'not_found'}, null);
                return;
            }

            console.log('updated tutorials: ', {id: id, ...tutorial});
            result(null, {id: id, ...tutorials });
        }
    );
};

Tutorial.remove = (id,result) => {
    sql.query('DELETE FROM tutorials WHERE id = ?', id, (err,res) => {
        if(err){
            console.log('error:',err);
            result(null, err);
            return;
        }

        if(res.affectedRows == 0){
             
            //not found tutorial with the id
            result({kind: 'not_found'}, null);
            return;
        }

        console.log('deleted tutorials with id: ', id);
        result(null,res);
    });
};

Tutorial.removeAll = result =>{
    sql.query('DELETE FROM tutorials', (err,res) => {
        if(err){
            console.log('error: ', err);
            result(null,res);
            return;
        }

        console.log(`deleted ${res.affectedRows} tutorials`);
        result(null,res);
    });
};

module.exports = Tutorial;