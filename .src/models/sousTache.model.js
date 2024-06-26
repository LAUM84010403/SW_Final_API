// MANIPULATION(model) DE LA BASE DE DONNÉ POUR L'API Tâches

//Base de donnée
//const db = require('../.src/config/db.js');
const db = require("../config/db_pg.js");

//équivalent du main
module.exports = {

    creerSousTacheBD: (req, utilisateur_id) =>{
        return new Promise((resolve, reject) => {
            const requete = `INSERT INTO sous_taches (utilisateur_id, tache_id, titre, complete) VALUES ($1, $2, $3)`;
            const params = [utilisateur_id, req.body.id, req.body.titre, req.body.complete];

            db.query(requete, params, (err, resultat) => {
                if (err) {
                    console.log('Erreur sqlState : ' + err);
                    console.log(`Erreur sqlState ${err.sqlState} : ${err.sqlMessage}`);
                    reject(err);
                }
                resolve(resultat);
            });
        });
    },

    trouverSousTacheBD: (id_tache) => {
        return new Promise((resolve, reject) => {

            const requete = `SELECT * FROM sous_taches WHERE tache_id = $1`;
            const params = [id_tache];

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
    modifierUneSousTacheBD: (req) =>{
        return new Promise((resolve, reject) => {
            let requete = `UPDATE sous_taches SET tache_id = $1, titre = $2, complete = $3 where id = $4`;
            let params = [req.body.tache_id, req.body.titre, req.body.complete, req.params.id]
            
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
    supprimerSousTacheBD: (id) => {
        return new Promise((resolve, reject) => {
            const requete = `DELETE FROM sous_taches where id = $1`;
            const params = [id]
            
            db.query(requete, params, (err, resultat) => {
                if (err) {
                    console.log('Erreur sqlState : ' + err);
                    console.log(`Erreur sqlState ${err.sqlState} : ${err.sqlMessage}`);
                    reject(err);
                }
                resolve();
            });
        })
    },

    modifierStatusSousTacheDB: (complet, id) => {
        return new Promise((resolve, reject) => {
            
            let requete = `UPDATE sous_taches SET complete = $1 where id = $2`;
            let params = [complet, id]
            
            db.query(requete, params, (err, resultat) => {
                if (err) {
                    console.log('Erreur sqlState : ' + err);
                    console.log(`Erreur sqlState ${err.sqlState} : ${err.sqlMessage}`);
                    reject(err)
                }
                resolve();
            });
        });
    },


};