class Followers {
    constructor(db) {
        this.db = db
        const req1 = `
            CREATE TABLE IF NOT EXISTS followers(
            id_login INT NOT NULL,
            id_login_follower NOT NULL,
            login VARCHAR(256) NOT NULL,
            login_follower VARCHAR(256) NOT NULL,
            timestamp TIMESTAMP,
            PRIMARY KEY ('login', 'login_follower')
            );
        `;
        db.exec(req1, (err) => {
            if (err) {
                throw err;
            }
        });
    }

    checkFollow(login, login_follower) {
        return new Promise((resolve, reject) => {
            const req = this.db.prepare(`
                SELECT * FROM followers 
                WHERE login = ? AND
                login_follower = ?
            `);
            req.get([login, login_follower], (err, doc) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(doc);
                    console.log(doc != undefined);
                    resolve(doc != undefined);
                }
            });
        })
    }

    // ok
    follow(id_login, id_login_follower, login_user, login_follower) {
        // id1 follow id2
        return new Promise((resolve, reject) => {
            const req = this.db.prepare(`
                INSERT INTO followers VALUES (?, ?, ?, ?, ?)
            `);
            let date = new Date();
            req.run([id_login, id_login_follower, login_user, login_follower, date], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(req.lastID);
                }
            });
        })
    }

    
    unfollow(login_user, login_follower) {
        // id1 unfollow id2
        return new Promise((resolve, reject) => {
            const req = this.db.prepare(`
                DELETE FROM followers 
                WHERE login = ?
                AND login_follower = ?
            `);
            req.run([login_user, login_follower], (err) => {
                if (err) {
                    //console.log('Erreur SQL :' + err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    getFollowers(login) {
        return new Promise((resolve, reject) => {
            const req = this.db.prepare(`
                SELECT id_login_follower, login_follower 
                FROM followers
                WHERE login = ?
            `);
            req.all([login], (err, rows) => {
                if (err){
                    reject(err);
                } else {
                    
                    rows.forEach((row) => {
                        console.log(row);
                    });
                    
                    resolve(rows);
                }
            });
        })
    }

    getFollows(login_follower) {
        return new Promise((resolve, reject) => {
            const req = this.db.prepare(`
                SELECT id_login, login 
                FROM followers
                WHERE login_follower = ?
            `);
            req.all([login_follower], (err, rows) => {
                if (err){
                    reject(err);
                } else {
                    
                    rows.forEach((row) => {
                        console.log(row);
                    });
                    
                    resolve(rows);
                }
            });
        })
    }
}
exports.default = Followers;