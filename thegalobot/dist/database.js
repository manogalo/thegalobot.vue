var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

const presentes = [
    "Abridor de garrafa",
    "Abridor de lata",
    "Assadeira de pudim",
    "Assadeira de bolo",
    "Assadeira de pizza",
    "Assadeira quadrada",
    "Pegador de sorvete",
    "Copo medidor",
    "Cortador de pizza",
    "Cortador de queijo",
    "Descanso de panela",
    "Descascador de legumes",
    "Pegador de massas",
    "Pegador de saladas",
    "Peneiras",
    "Ralador",
    "Tesoura para cozinha",
    "Panos de prato",
    "Escorredor de arroz",
    "Centrífuga de salada",
    "Concha de feijão",
    "Fouet",
    "Jogo de copos",
    "Jogo de xícaras",
    "Pirex",
    "Jarra para suco",
    "Prato para bolo",
    "Queijeira",
    "Porta-frios",
    "Bacias",
    "Prendedor de embalagens",
    "Galheteiro de vidro",
    "Cabide acrílico",
    "Faca para carne",
    "Cutelo",
    "Conj. utensílios de silicone"
];

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                password TEXT,
                gift_id INTEGER
            );`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                var insert = 'INSERT INTO user (username, password) VALUES (?,?)'
                db.run(insert, ["admin",md5("C9p5au8na@")])
            }
        });

        db.run(`CREATE TABLE gifts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
                desc TEXT
            );`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                var insertGifts = 'INSERT INTO GIFTS (desc) VALUES (?)'
            
                for (const element of presentes) {
                    db.run(insertGifts, element)
                }
            }
        });
    };
});

module.exports = db