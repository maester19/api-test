const Profil = require("../models/Role")
const fs = require('fs');

exports.createProfil = (req, res, next) => {
    const profilObject = JSON.parse(req.body.profil);
    delete profilObject._id;
    const profil = new Profil({
        ...profilObject,
    });
  
    profil.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 };

exports.getOneProfil = (req, res, next) => {
    Profil.findOne({ _id: req.params.id })
        .then(profil => res.status(200).json(profil))
        .catch(error => res.status(404).json({ error }));
}

exports.modifyProfil = (req, res, next) => {
  
    Profil.findOne({_id: req.params.id})
        .then((profil) => {
            if (profil.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Profil.updateOne({ _id: req.params.id}, { ...profilObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

 exports.deleteProfil = (req, res, next) => {
    Profil.findOne({ _id: req.params.id})
        .then(profil => {
            Profil.deleteOne({_id: req.params.id})
                .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                .catch(error => res.status(401).json({ error }));
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };

exports.getAllProfil = (req, res, next) => {
    Profil.find()
        .then(profils => res.status(200).json(profils))
        .catch(error => res.status(400).json({ error }));
}