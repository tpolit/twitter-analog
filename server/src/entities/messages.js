class Messages {
	constructor(db) {
		this.db = db;
	}

	//ok
	create(id_auteur, login_auteur, message) {
		var document = {
			id_auteur: id_auteur,
			login_auteur: login_auteur,
			message: message,
			date: new Date(),
			likes: [],
		};
		return new Promise((resolve, reject) => {
			this.db.insert(document, (err, doc) => {
				if (err) {
					//console.log("Erreur");
					reject(err);
				} else {
					//console.log("Create res : " + doc._id);
					resolve(doc._id);
				}
			});
		});
	}

	//ok
	getwId(message_id) {
		return new Promise((resolve, reject) => {
			this.db.find({ _id: message_id }, (err, docs) => {
				if (err) {
					reject(err);
				} else {
					resolve(docs);
				}
			});
		});
	}

	//ok 
	getwMessage(motCle) {
		return new Promise((resolve, reject) => {
			this.db.find({ message: new RegExp(motCle) }, (err, docs) => {
				if (err) {
					reject(err);
				} else {
					//console.log(docs);
					resolve(docs);
				}
			});
		});
	}

	//ok
	getw_idAuteur(id_auteur) {
		return new Promise((resolve, reject) => {
			this.db.find({id_auteur: id_auteur}, (err, docs) => {
				if (err) {
					reject(err);
				} else {
					//console.log(docs)
					resolve(docs);
				}
			});
		});
	}

	getw_loginAuteur(login) {
		return new Promise((resolve, reject) => {
			this.db.find({login_auteur: login}, (err, docs) => {
				if (err) {
					reject(err);
				} else {
					//console.log(docs)
					resolve(docs);
				}
			});
		});
	}

	getw_mult_idAuteur(idS_auteur) {
		return new Promise((resolve, reject) => {
			console.log(idS_auteur);
			this.db.find({id_auteur: {$in : idS_auteur}}).sort({date: -1}).exec((err, docs) => {
				if (err) {
					reject(err);
				} else {
					console.log(docs[0]);
					resolve(docs);
				}
			})
		})
	}

	//ok
	delete(message_id) {
		return new Promise((resolve, reject) => {
			this.db.remove({ _id: message_id }, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			})
		})
	}

	//ok
	like(login_liker, message_id) {
		return new Promise((resolve, reject) => {
			this.db.update({ _id: message_id },
						   { $addToSet: { likes: login_liker } }, (err) => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				})
		})
	}

	//ok
	dislike(login_liker, message_id) {
		return new Promise((resolve, reject) => {
			this.db.update({ _id: message_id },
						   { $pull: { likes: login_liker } }, (err) => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				})
		})
	}
}
exports.default = Messages;