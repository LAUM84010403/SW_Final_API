// MANIPULATION(model) DE LA BASE DE DONNÉ POUR L'API Tâches(Utilisateurs)

//Module
const bcrypt = require('bcrypt');
const saltNPepper = 10;
const uuidv4 = require('uuid');

//Base de donnée
const db = require("../config/db_pg.js");

//équivalent du main
module.exports = {
    ajouterUtilisateurBD: (req) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(req.body.mot_de_passe, saltNPepper)
        .then(mdpHash => {
            mdpHash = mdpHash.substring(0, 30);
            let cle = uuidv4.v4();
            cle = cle.substring(0, 30);
            const query = `INSERT INTO utilisateur(nom, prenom, courriel, cle_api, password) VALUES ($1, $2, $3, $4, $5)`;    
            const params = [req.body.nom, req.body.prenom, req.body.courriel, cle, mdpHash];
        
            db.query(query, params, (err, resultat) => {
                    if (err) {
                        console.log('Erreur sqlState : ' + err);
                        console.log(`Erreur sqlState ${err.sqlState} : ${err.sqlMessage}`);
                        reject(err);
                    } else {
                        resolve("Votre clé api PERSONELLE:D : " + cle);
                    }
                });
            })
        })
        .catch(err => reject(err))
    },

    

    trouverUsagerBD: (api_cle) => {
        return new Promise((resolve, reject) => {

            const requete = `SELECT id FROM utilisateur WHERE cle_api = $1`;
            const params = [api_cle];
            
            db.query(requete, params, (err, resultat) => {
                if (err) {
                    console.log('Erreur sqlState : ' + err);
                    console.log(`Erreur sqlState ${err.sqlState} : ${err.sqlMessage}`);
                    reject(err);
                }
                resolve(resultat.rows);
            });
        });
    },

    validationCle: (cleApi) => {
        return new Promise((resolve, reject) => {

            const requete = 'SELECT COUNT(*) AS usager FROM utilisateur u WHERE cle_api = $1; ';
            const params = [cleApi];
            
            db.query(requete, params, (err, resultat) => {
                if (err) {
                    console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                resolve(resultat.rows[0].usager > 0);   
            });
        });
    },
    modifierAPIBD: (req) => {
        return new Promise((resolve, reject) => {

                mdpHash = mdpHash.substring(0, 30);
                let cle = uuidv4.v4();
                cle = cle.substring(0, 30);
                const query = `INSERT INTO utilisateur(cle_api) VALUES ($1)`;    
                const params = [cle];
            
                db.query(query, params, (err, resultat) => {
                        if (err) {
                            console.log('Erreur sqlState : ' + err);
                            console.log(`Erreur sqlState ${err.sqlState} : ${err.sqlMessage}`);
                            reject(err);
                        } else {
                            resolve("Votre clé api NOUVELLEMENT PERSONELLE:D : " + cle);
                        }
                    });
                })
        },

};