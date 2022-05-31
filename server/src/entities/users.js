class Users {
	constructor(db) {
		this.db = db
		const req1 = `
			CREATE TABLE IF NOT EXISTS users(
				login VARCHAR(256) NOT NULL PRIMARY KEY,
				password VARCHAR(256) NOT NULL,
				lastname VARCHAR(256) NOT NULL,
				firstname VARCHAR(256) NOT NULL)
    	`;
		db.exec(req1, (err) => {
			if (err) {
				throw err;
			}
		});
	}

	//ok
	create(login, password, lastname, firstname) {
		return new Promise((resolve, reject) => {
			const req = this.db.prepare(`
          		INSERT INTO users VALUES(?, ?, ?, ?);
        	`);
			req.run([login, password, lastname, firstname], (err) => {
				if (err) {
					//console.log('Erreur SQL :' + err);
					reject(err);
				} else {
					//console.log("create res : " + req.lastID + "\n");
					resolve(req.lastID);
				}
			});
		});
	}

	//ok
	delete(userid) {
		return new Promise((resolve, reject) => {
			const req = this.db.prepare(`
        		DELETE FROM users WHERE rowid = ?
      		`);
			req.run([userid], (err) => {
				if (err) {
					//console.log(err)
					reject(err);
				} else {
					resolve("User deleted\n");
				}
			})
		})

	}

	//ok
	get(userid) {
		return new Promise((resolve, reject) => {
			const req = this.db.prepare(`
        		SELECT login, firstname, lastname FROM users WHERE rowid = ?
      		`);
			req.get([userid], (err, row) => {
				if (err) {
					//console.log('Erreur SQL : ' + err);
					reject(err);
				} else {
					//console.log("serveur : "+row.login);
					resolve(row);
				}
			});
		});
	}

	getNom(nom) {
		return new Promise((resolve, reject) => {
			const req = this.db.prepare(`
				SELECT rowid, login, lastname, firstname 
				FROM users 
				WHERE (login LIKE ? OR
					  firstname LIKE ? OR
					  lastname LIKE ?)
			`);
			nom = nom + '%';
			req.all([nom, nom, nom], (err, rows) => {
				if (err) {
					//console.log('Erreur SQL : ' + err);
					reject(err);
				} else {
					//console.log(rows);
					resolve(rows);
				}
			})
		})
	}

	//ok
	exists(login) {
		return new Promise((resolve, reject) => {
			const req = this.db.prepare(`
        		SELECT login FROM users WHERE login = ?
      		`);
			req.get([login], (err, row) => {
				if (err) {
					//console.log('Erreur SQL : ' + err);
					reject(err);
				} else {
					resolve(row != undefined);
				}
			});
		});
	}

	//ok
	checkpassword(login, password) {
		return new Promise((resolve, reject) => {
			const req = this.db.prepare(`
        		SELECT rowid FROM users WHERE login=? AND password=?;
      		`);
			req.get([login, password], (err, row) => {
				if (err) {
					//console.log('Erreur SQL: ', err);
					reject(err);
				} else {
					if (row !== undefined){
						resolve(row.rowid);
					} else {
						resolve(row);
					}
				}
			});
		});
	}
}
exports.default = Users;