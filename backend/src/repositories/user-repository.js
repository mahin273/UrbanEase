const CrudRepository = require('./crud-repository');
const userModel = require('../models/user-model');

class UserRepository extends CrudRepository {
    constructor() {
        super(userModel);
    }

    async findByEmail(email) {
        return await this.findOneBy('email', email);
    }
    async findByUsername(username) {
        return await this.findOneBy('username',username)
    }
    async findByNID(nid_num) {
        return await this.findOneBy('nid_num',nid_num)
    }
}

module.exports = UserRepository;
