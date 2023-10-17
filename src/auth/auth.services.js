import User from "./user.model.js";

export class AuthServices {

    async createUser(data){
        return await User.create(data)
    }

    async findOneByUser(id){
        return await User.findOne({
            id,
            status: true
        })
    }

    async findOneUserByEmail(email){
        return await User.findOne({
            where: {
                email:email,
                status: true
            }
        })
    }

    async updateUser(user, data){
        return await user.update(data)
    }


    async deleteUser(user){
        return await user.update({status: false})
    }

}