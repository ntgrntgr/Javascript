const Tutorial = require('../models/tutorial.model.js');

//create and save a new tutorial
exports.create = (req,res) => {

    //validate request

    if(!req.body){
        res.status(400).send({
            message: 'content can not be empty!'
        });
    }

    //create a tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });

    //Save Tutorial in the database
    Tutorial.create(tutorial, (err,data) => {
        if(err)
            res.status(500).send({
        message: err.message ||'Some error occured while creating the tutorial.'
    });
    else res.send(data);
    });

};

//retrieve all tutorials from the database (with condition).
exports.findAll = (req,res) => {
    exports.findAll = (req,res) =>{
        const title = req.query.title;

        Tutorial.getAll(title, (err,data) => {
            if(err)
                res.status(500).send({
            message: err.message || 'Some error occured while retrieving tutorials.'});

            else res.send(data);

        });
    };

    exports.findAllPublished = (req,res) => {
        Tutorial.getAllPublished((err,data) => {
            if(err)
                res.status(500).send({
            message: err.message || 'Some error occured while retrieving tutorials.'});

            else res.send(data);
        }); 
    };

};

// Find a single tutorials with a lid
exports.findOne = (req,res) => {
    Tutorial.findById(req.params.id,(err,data) => {
        if(err){
            if(err.king === 'not_found'){
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else{
                res.status(500).send({
                    message: 'Error retrieving tutorial with id' + req.params.id
                });
            }
        } else res.send(data);
    });

};

//Update a tutorial identified by the id in the request
exports.update = (req,res) => {
    //validate request

    if(!req.body){
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    console.log(req.body);

    Tutorial.updateById(
        req.params.id,
        new Tutorial(req.body),
        (err,data) => {
            if(err){
                if(err.kind === 'not_found'){
                    res.status(404).send({
                        messsage: `Not found Tutorial with id ${req.params.id}.`
                    });
                }
                else {
                    res.status(500).send({
                        message:'Error updating tutorial with id' + req.params.id
                    });
                }
                
            } else res.send(data);
        }
    );

};

//Delete a tutorial with the specified id in the request
exports.delete = (req,res) => {
    Tutorial.remove(req.params.id, (err,data) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message:`Not found tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: 'Could not delete tutorial with id' + req.params.id
                });
            }
        } else res.send({message: `tutorial was deleted successfully!`});
    });

};

//Delete all Tutorials from the database
exports.deleteAll = (req,res) => {

    Tutorial.removeAll((err,data) => {
        if(err)
            res.status(500).send({
        message:
        err.message || 'Some error occured while removing all tutorials.'
    });
    else res.send({message:`All tutorials were deleted successfully!`});
});

};