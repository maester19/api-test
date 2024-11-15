const User = require("../models/User")
const fs = require('fs');


module.exports = {
    // createUser = (req, res, next) => {
    //     const userObject = JSON.parse(req.body.user);
    //     delete userObject._id;
    //     delete userObject._userId;
    //     const user = new User({
    //         ...userObject,
    //         userId: req.auth.userId,
    //         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    //     });
    
    //     user.save()
    //     .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    //     .catch(error => { res.status(400).json( { error })})
    //  };

    getOneUser: async (req, res, next) => {
        User.findOne({ _id: req.params.id })
            .then(user => res.status(200).json(user))
            .catch(error => res.status(404).json({ error }));
    },

    modifyUser:  async (req, res, next) => {
        const userObject = req.file ? {
            ...JSON.parse(req.body.user),
            pic: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    
        delete userObject._userId;
        User.findOne({_id: req.params.id})
            .then((user) => {
                if (user.userId != req.auth.userId) {
                    res.status(401).json({ message : 'Not authorized'});
                } else {
                    User.updateOne({ _id: req.params.id}, { ...userObject, _id: req.params.id, updatedAt: new Date()})
                    .then(() => res.status(200).json({message : 'Objet modifié!'}))
                    .catch(error => res.status(401).json({ error }));
                }
            })
            .catch((error) => {
                res.status(400).json({ error });
            });
    },

    adminAcceptUser:  async (req, res, next) => {

        User.findOne({_id: req.auth.userId})
            .then((user) => {
                if (user.role != "admin") {
                    res.status(401).json({ message : 'Not authorized'});
                } else {
                    User.updateOne({ _id: req.params.id}, { ...user, status: "accept", updatedAt: new Date()})
                    .then(() => res.status(200).json({message : 'Objet modifié!'}))
                    .catch(error => res.status(401).json({ error }));
                }
            })
            .catch((error) => {
                res.status(400).json({ error });
            });
    },

    adminRejectUser:  async (req, res, next) => {

        User.findOne({_id: req.auth.userId})
            .then((user) => {
                if (user.role != "admin") {
                    res.status(401).json({ message : 'Not authorized'});
                } else {
                    User.updateOne({ _id: req.params.id}, { ...user, status: "reject", updatedAt: new Date()})
                    .then(() => res.status(200).json({message : 'Objet modifié!'}))
                    .catch(error => res.status(401).json({ error }));
                }
            })
            .catch((error) => {
                res.status(400).json({ error });
            });
    },

    adminBlockUser:  async (req, res, next) => {

        User.findOne({_id: req.auth.userId})
            .then((user) => {
                if (user.role != "admin") {
                    res.status(401).json({ message : 'Not authorized'});
                } else {
                    User.updateOne({ _id: req.params.id}, { ...user, status: "block", updatedAt: new Date()})
                    .then(() => res.status(200).json({message : 'Objet modifié!'}))
                    .catch(error => res.status(401).json({ error }));
                }
            })
            .catch((error) => {
                res.status(400).json({ error });
            });
    },

    deleteUser: async (req, res, next) => {
        User.findOne({ _id: req.params.id})
            .then(user => {
                if (user.userId != req.auth.userId) {
                    res.status(401).json({message: 'Not authorized'});
                } else {
                    const filename = user.pic.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        User.deleteOne({_id: req.params.id})
                            .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                            .catch(error => res.status(401).json({ error }));
                    });
                }
            })
            .catch( error => {
                res.status(500).json({ error });
            });
    },

    adminGetAllUser: async (req, res, next) => {
        User.findOne({_id: req.auth.userId})
            .then((user) => {
                if (user.role != "admin") {
                    res.status(401).json({ message : 'Not authorized'});
                } else {
                    User.find()
                    .then(users => res.status(200).json(users))
                    .catch(error => res.status(400).json({ error }));
                }
            })
            .catch((error) => {
                res.status(400).json({ error });
            });
    },

    adminGetUserByRole: async (req, res, next) => {
        User.findOne({_id: req.auth.userId})
            .then((user) => {
                if (user.role != "admin") {
                    res.status(401).json({ message : 'Not authorized'});
                } else {
                    User.find({role: req.params.role})
                    .then(users => res.status(200).json(users))
                    .catch(error => res.status(400).json({ error }));
                }
            })
            .catch((error) => {
                res.status(400).json({ error });
            })
    },

    checkIfIsAdmin: async (req, res, next) => {
        User.findOne({_id: req.auth.userId})
            .then((user) => {
                if (user.role != "admin") {
                    res.status(200).json({ message : "Vous n'etes administrateur"})
                } else {
                    res.status(200).json({ message : "Vous etes administrateur"})
                }
            })
            .catch((error) => {
                res.status(400).json({ error });
            })
    }
}
