import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export const comparePassword = async (password, hash) =>{
    console.log(password, hash);
    return bcrypt.compareSync(password, hash);
}