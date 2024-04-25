// MANIPULATION(model) DE LA BASE DE DONNÉ POUR L'API Tâches

//Base de donnée
//const db = require('../.src/config/db.js');
const db = require("../.src/config/db_pg.js");

//équivalent du main
module.exports = {

    obtenirTousTacheDB: (userID, complet) => {
        return new Promise((resolve, reject) => {    
                if(complet){
                    const query = 'SELECT * FROM taches WHERE utilisateur_id = $1 ORDER BY id;';
                    const values = [userID]
                }
                else{
                    const query = 'SELECT * FROM taches WHERE utilisateur_id = $1 AND complete = false ORDER BY id;';
                    const values = [userID]
                }

            db.query(query, values, (err, result) => {
                if (err) {
                    console.log('Erreur sqlState : ' + err);
                    console.log(`Erreur sqlState ${err.sqlState} : ${err.sqlMessage}`);
                    reject(err);
                }

                resolve(result.rows);
            });
        });
    },



};