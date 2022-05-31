const express = require("express");
const Users = require("./entities/users.js");
const Followers = require("./entities/followers.js");
const Messages = require("./entities/messages.js");

function init(db) {
    /* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

    /*                                 REGLAGES ROUTER                                     */

    /* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });
    //Entities
    const users = new Users.default(db.users);
    const followers = new Followers.default(db.followers);
    const messages = new Messages.default(db.messages);


    /* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

    /*                                       USERS                                         */

    /* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

    /* –––––––––––––––––––––––––––––––––––––– LOGIN –––––––––––––––––––––––––––––––––––––– */
    router.post("/user/login", async (req, res) => {
        try {
            const { login, password } = req.body;
            // Erreur sur la requête HTTP
            if (!login || !password) { 
                console.log("champs manquants");
                res.status(400).json({
                    status: 400,
                    message: "Champs manquants"
                });
                return;
            }
            if(!await users.exists(login)) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            let userid = await users.checkpassword(login, password); 
            if (userid) {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.userid = userid;
                        res.status(200).json({
                            status: 200,
                            id: userid,
                            login: login,
                            session_id: req.session.userid,
                            message: "Login et mot de passe accepté"
                        });
                    }
                });
                return;
            }
            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => {});
            res.status(403).json({
                status: 403,
                message: "login et/ou mot de passe invalide(s)"
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });

    /* –––––––––––––––––––––––––––––––––––––– LOGOUT –––––––––––––––––––––––––––––––––––––– */ 
    router.post("/user/logout", async(req, res) => {
        try{
            const {user_id} = req.body;
            if (!user_id){
                res.status(404).json({
                    status : 404,
                    message : "Champs manquants"
                })
            } else {
                req.session.destroy();
                res.status(202).json({
                    status: 202,
                    message: "Utilisateur déconnecté"
                });
            }
        }catch(e){
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    })

    /* ––––––––––––––––––––––––––––––––––– SEARCH BY NAME ––––––––––––––––––––––––––––––––––– */
    router.post("/user/search", async(req, res) => {
        const {nom} = req.body;
        if (!nom) {
            res.status(404).json({
                status: 404,
                message: "Champs manquants"
            })
        } else {
            users.getNom(nom)
                .then((docs) => res.status(200).json({
                    status: 200,
                    resultat : docs
                }))
                .catch((err) => res.status(500).json({
                    status : 500,
                    message : "Erreur interne",
                    details : (err || "Erreur inconnue").toString()
                }));
        }
    })

    /* ––––––––––––––––––––––––––––––– SEARCH AND DELETE BY ID ––––––––––––––––––––––––––––––– */
    router.route("/user/:user_id(\\d+)")
        .get(async (req, res) => {
            try {
                const doc = await users.get(req.params.user_id);
                if (!user){
                    res.status(404).json({
                        status: 404,
                        message: "Erreur users.js"
                    });
                }
                else {
                    //console.log(user);
                    res.status(200).json({
                        status: 200,
                        resultat: doc
                    });
                }
            }
            catch (err) {
                res.status(500).json({
                    status: 500,
                    message: "Erreur interne",
                    details: (err|| "Erreur inconnue").toString()
                });
            }
        })
        .delete(async (req, res) => {
            try{
                const ok = await users.delete(req.params.user_id);
                if (!ok){
                    res.status(404).json({
                        status: 404,
                        message: "Erreur users.js"
                    });
                } else {
                    res.status(200).json({
                        status: 200
                    });
                }
            } catch (err){
                res.status(500).json({
                    status: 500,
                    message: "Erreur interne",
                    details: (err|| "Erreur inconnue").toString()
                })
            }
        })

    /* –––––––––––––––––––––––––––––––––––––– CREATE –––––––––––––––––––––––––––––––––––––– */ 
    router.put("/user", (req, res) => {
        const {login, password, lastname, firstname} = req.body;
        if (!login || !password || !lastname || !firstname) {
            res.status(400).json({
                status: 400,
                message: "Champs manquants"
            });
        } else {
            users.create(login, password, lastname, firstname)
                .then((user_id) => res.status(201).json({
                    status: 201,
                    id: user_id
                }))
                .catch((err) => res.status(500).json({
                    status: 500,
                    message: "Erreur interne",
                    details: (err || "Erreur inconnue").toString()
                }));
        }
    });


    /* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

    /*                                       MESSAGES                                      */

    /* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

    /* –––––––––––––––––––––––––––––––––––––– CREATE ––––––––––––––––––––––––––––––––––––– */ 
    router.put("/message/post", async(req, res) => {
        const {id_auteur, login_auteur, message} = req.body;
        if (!id_auteur || !login_auteur || !message){
            res.status(400).json({
                status: 400,
                message: "Champs manquants"
            });
        } else {
            messages.create(id_auteur, login_auteur, message)
                .then((message_id) => res.status(200).json({
                    id: message_id,
                    status: 200,
                    message: "message posté"
                }))
                .catch((err) => res.status(500).json({
                    status: 500,
                    message: "erreur interne",
                    details: (err|| "Erreur inconnue").toString()
                }));
        }
    });

    /* ––––––––––––––––––––––––––––––– GET AND DELETE BY ID ––––––––––––––––––––––––––––––– */ 
    router.route("/message/:message_id")
        .get(async (req, res) => {
            try {
                const doc =  await messages.getwId(req.params.message_id);
                if (!message){
                    res.status(404).json({
                        status: 404,
                        message: "Erreur messages.js" 
                    });
                }
                else {
                    //console.log(message);
                    res.status(200).json({
                        status: 200,
                        resultat: doc
                    });
                }
            }
            catch (err) {
                res.status(500).json({
                    status: 500,
                    message: "erreur interne",
                    details: (err|| "Erreur inconnue").toString()
                });
            }
        })
        .delete(async(req, res) => {
            try{
                const ok = await messages.delete(req.params.message_id);
                if (!ok){
                    res.status(404).json({
                        status: 404,
                        message: "Erreur messages.js"
                    });
                } else {
                    res.status(200).json({
                        status: 200
                    });
                }
            } catch (err) {
                res.status(500).json({
                    status: 500,
                    message: "Erreur interne",
                    details: (err|| "Erreur inconnue").toString()
                })
            }
        });

    /* ––––––––––––––––––––––––––––––– GET BY KEYWORD ––––––––––––––––––––––––––––––– */ 
    router.post("/message/search/keyword", async (req, res) => {
        const {motCle} = req.body;
        if(!motCle){
            res.status(404).json({
                status: 404,
                message: "Champs manquants"
            });
        } else {
            messages.getwMessage(motCle)
                .then((docs) => res.status(200).json({
                    status: 200,
                    resultat: docs
                }))
                .catch((err) => res.status(500).json({
                    status: 500,
                    message: "Erreur interne",
                    details: (err|| "Erreur inconnue").toString()
                }));
        }
    });

    /* ––––––––––––––––––––––––––––––– GET BY USER ID ––––––––––––––––––––––––––––––– */ 
    router.post("/message/search/user_id", async (req, res) => {
        const {user_id} = req.body;
        if(!user_id){
            res.status(404).json({
                status: 404,
                message: "Champs manquants"
            });
        } else {
            //console.log("dans le else");
            messages.getw_idAuteur(user_id)
                .then((docs) => res.status(200).json({
                    status: 200,
                    resultat: docs
                }))
                .catch((err) => res.status(500).json({
                    status: 500,
                    message: "Erreur interne",
                    details: (err|| "Erreur inconnue").toString()
                }));
        }
    });

    /* ––––––––––––––––––––––––––––––– GET BY LOGIN ––––––––––––––––––––––––––––––– */ 
    router.post("/message/search/login", async (req, res) => {
        const {login} = req.body;
        if(!login){
            res.status(404).json({
                status: 404,
                message: "Champs manquants"
            });
        } else {
            messages.getw_loginAuteur(login)
                .then((docs) => res.status(200).json({
                    status: 200,
                    resultat: docs
                }))
                .catch((err) => res.status(500).json({
                    status: 500,
                    message: "Erreur interne",
                    details: (err|| "Erreur inconnue").toString()
                }));
        }
    });

    /* –––––––––––––––––––––––––––– GET BY FOLLOWS –––––––––––––––––––––––––––– */ 
    router.post("/message/followsMessages", async (req, res) => {
        const {idS_auteur} = req.body;
        console.log("auteurs : "+[idS_auteur]);
        if(!idS_auteur){
            res.status(404).json({
                status: 404,
                message: "Champs manquants"
            });
        } else {
            messages.getw_mult_idAuteur(idS_auteur)
                .then((docs) => res.status(200).json({
                    status: 200,
                    resultat: docs
                }))
                .catch((err) => res.status(500).json({
                    status: 500,
                    message: "Erreur interne",
                    details: (err|| "Erreur inconnue").toString()
                }));
        }
    });
    
    /* ––––––––––––––––––––––––––––––––– LIKE ––––––––––––––––––––––––––––––––– */
    router.post("/message/like", async(req, res) => {
        const {user_id, message_id} = req.body;
        try{
            const ok = messages.like(user_id, message_id);
            if (!ok){
                res.status(404).json({
                    status: 404,
                    message: "Champs manquants"
                });
            } else {
                res.status(200).json({
                    status: 200
                });
            }
        } catch (err){
            res.status(500).json({
                status: 500,
                message: "Erreur interne",
                details: (err|| "Erreur inconnue").toString()
            })
        }
    });

    /* ––––––––––––––––––––––––––––––––––––– DISLIKE ––––––––––––––––––––––––––––––––––––– */
    router.post("/message/dislike", async(req, res) => {
        const {user_id, message_id} = req.body;
        try{
            const ok = messages.dislike(user_id, message_id);
            if (!ok) {
                res.status(404);
            } else {
                res.status(200).json({
                    status: 200
                });
            }
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: "Erreur interne",
                details: (err|| "Erreur inconnue").toString()
            });
        }
    });
        
    /* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

    /*                                       FOLLOWERS                                     */

    /* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */
    
    /* ––––––––––––––––––––––––––––––––– CHECK FOLLOW –––––––––––––––––––––––––––––––––––– */

    router.post("/user/checkfollow", async(req, res) => {
        const{login, login_follower} = req.body;
        if (!login, !login_follower) {
            res.status(404).json({
                status: 404,
                message: "Champs manquants"
            });
        } else {
            followers.checkFollow(login, login_follower)
                .then((bool) => res.status(200).json({
                    status: 200,
                    resultat: bool
                }))
                .catch((err) => res.status(500).json({
                    status: 500,
                    message: "erreur interne",
                    details: (err || "Erreur inconnue").toString()
                }));
        }   
    })

    /* ––––––––––––––––––––––––––––––––––––– FOLLOW –––––––––––––––––––––––––––––––––––––– */
    router.post("/user/follow", async(req, res) => {
        const {id_login, id_login_follower, login, login_follower} = req.body;
        if (!id_login || !id_login_follower || !login || !login_follower){
            res.status(404).json({
                status: 404,
                message: "Champs manquants"
            });
        } else {
            followers.follow(id_login, id_login_follower, login, login_follower)
                .then((follow_id) => res.status(200).json({
                    status: 200,
                    id: follow_id
                }))
                .catch((err) => res.status(500).json({
                    status: 500,
                    message: "erreur interne",
                    details: (err|| "Erreur inconnue").toString()
                }));
        }
    })

    /* –––––––––––––––––––––––––––––––––––– UNFOLLOW ––––––––––––––––––––––––––––––––––––– */
    router.post("/user/unfollow", async(req, res) => {
        const {login, login_follower} = req.body;
        if (!login || !login_follower){
            res.status(404).json({
                status: 404,
                message: "Champs manquants"
            });
        } else{
            followers.unfollow(login, login_follower)
                .then(() => res.status(200).json({
                    status: 200,
                }))
                .catch((err) => res.status(500).json({
                    status: 500,
                    message: "erreur interne",
                    details: (err|| "Erreur inconnue").toString()
                }));
        }
    })

    /* –––––––––––––––––––––––––––––––––– GET FOLLOWERS ––––––––––––––––––––––––––––––––––– */
    router.post("/user/followers", async (req, res) => {
        const {login} = req.body;
        if(!login){
            res.status(404).json({
                status: 404,
                message: "Champs manquants"
            });
        } else {
            followers.getFollowers(login)
                .then((docs) => res.status(200).json({
                    status: 200,
                    resultat: docs
                }))
                .catch((err) => res.status(500).json({
                    status: 500,
                    message: "Erreur interne",
                    details: (err || "Erreur inconnue").toString()
                }));
            
        }
    });

    /* –––––––––––––––––––––––––––––––––––– GET FOLLOWS ––––––––––––––––––––––––––––––––––––– */
    router.post("/user/follows", async (req, res) => {
        const {login_follower} = req.body;
        console.log(login_follower);
        if(!login_follower){
            res.status(404).json({
                status: 404,
                message: "Champs manquants"
            });
        } else {
            followers.getFollows(login_follower)
                .then((docs) => res.status(200).json({
                    status: 200,
                    resultat: docs
                }))
                .catch((err) => res.status(500).json({
                    status: 500,
                    message: "Erreur interne",
                    details: (err || "Erreur inconnue").toString()
                }));
            
        }
    });
    return router;
}
exports.default = init;