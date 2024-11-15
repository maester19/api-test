const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const User = require("../models/User")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Configuration AWS S3
AWS.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'YOUR_AWS_REGION'
});

const s3 = new AWS.S3();

// Middleware pour gérer le téléchargement de fichiers
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'YOUR_BUCKET_NAME',
        acl: 'public-read', // ou 'private' selon vos besoins
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname); // Nom de fichier unique
        }
    })
});

module.exports = {
    signup: async (req, res, next) => {
        const { name, phone, email, password } = req.body;

        // Vérifiez si une image a été téléchargée
        if (!req.file) {
            return res.status(400).json({ message: 'Aucune image téléchargée.' });
        }

        // URL de l'image téléchargée
        const pic = req.file.location;

        // Génération de l'OTP
        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
        
        // Configuration du transporteur pour l'envoi d'e-mails
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: 'yves.ekanga27@gmail.com',
                pass: 'celestin'
            }
        });

        // Envoi de l'OTP par e-mail
        const mailOptions = {
            from: 'yves.ekanga27@gmail.com',
            to: email,
            subject: 'Vérification de l\'OTP',
            text: `Votre code OTP de confirmation est : ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error });
            }

            const salt = bcrypt.genSaltSync(10);
            // Stocker l'OTP et l'utilisateur en attente de vérification
            const user = new User({
                name: name,
                pic: pic,
                phone: phone,
                email: email,
                status: "pending",
                verif: false,
                role: "user",
                password: bcrypt.hashSync(password, salt),
                otp: otp,
                createdAt: new Date(),
                updateAt: new Date()
            });

            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé ! Un OTP a été envoyé à votre e-mail.' }))
                .catch(error => res.status(400).json({ error }));
        });
    },

    verifyOtp: async (req, res, next) => {
        const { email, otp } = req.body;

        User.findOne({ email: email })
            .then(user => {
                if (!user || user.otp !== otp) {
                    return res.status(401).json({ message: 'OTP incorrect ou utilisateur non trouvé.' });
                }

                // Si l'OTP est correct, mettre à jour l'utilisateur
                user.verif = true;
                user.status = 'active'; 
                user.otp = undefined; // Effacer l'OTP après vérification

                user.save()
                    .then(() => res.status(200).json({ message: 'Utilisateur vérifié avec succès!' }))
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    },
    
    resendOTP: async (req, res, next) => {
        const { email } = req.body;
    
        // Trouver l'utilisateur par e-mail
        User.findOne({ email: email })
            .then(user => {
                if (!user || user.status !== 'pending') {
                    return res.status(404).json({ message: 'Utilisateur non trouvé ou déjà vérifié.' });
                }
    
                // Génération d'un nouvel OTP
                const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    
                // Configuration du transporteur pour l'envoi d'e-mails
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'yves.ekanga27@gmail.com',
                        pass: 'celestin'
                    }
                });
    
                // Envoi de l'OTP par e-mail
                const mailOptions = {
                    from: 'yves.ekanga27@gmail.com',
                    to: email,
                    subject: 'Renvoyer votre code OTP',
                    text: `Votre nouveau code OTP de confirmation est : ${otp}`
                };
    
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return res.status(500).json({ error });
                    }
    
                    // Mettre à jour l'OTP de l'utilisateur
                    user.otp = otp;
    
                    user.save()
                        .then(() => res.status(200).json({ message: 'Un nouveau code OTP a été envoyé à votre e-mail.' }))
                        .catch(error => res.status(500).json({ error }));
                });
            })
            .catch(error => res.status(500).json({ error }));
    },

    refreshToken: async (req, res, next) => {
        const { token } = req.body;
    
        // Vérifier si le token est fourni
        if (!token) {
            return res.status(403).json({ message: 'Token manquant.' });
        }
    
        // Vérifier le token
        jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token invalide.' });
            }
    
            // Générer un nouveau token
            const newToken = jwt.sign(
                { userId: user.userId },
                "RANDOM_TOKEN_SECRET",
                { expiresIn: '24h' }
            );
    
            res.status(200).json({
                userId: user.userId,
                token: newToken
            });
        });
    },
    
      login : async (req, res, next) => {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
                }
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                        }
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign(
                                { userId: user._id },
                                "RANDOM_TOKEN_SECRET",
                                { expiresIn: '24h' }
                            )
                        });
                    })
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
     }
}