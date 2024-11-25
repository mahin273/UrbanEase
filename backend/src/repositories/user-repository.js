const CrudRepository = require('./crud-repository');
const userModel = require('../models/user-model');

class UserRepository extends CrudRepository {
    constructor() {
        super(userModel);
    }

    async findByEmail(email) {
        return await this.findOneBy('email', email);
    }
}

module.exports = UserRepository;
