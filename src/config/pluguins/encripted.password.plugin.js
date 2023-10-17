import bcrypt from "bcrypt"

export const encrytedPassword = async(password) => {
    const salt = await bcrypt.genSalt(12)
    return await bcrypt.hash(password, salt)
}

export const verifyPassword = async(bodyPassword, userPassword) =>{
    return await bcrypt.compare(bodyPassword, userPassword)
}
