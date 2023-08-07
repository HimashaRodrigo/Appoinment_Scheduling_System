import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  tls: {
    rejectUnauthorized: false, // Disable certificate validation
  },
  service: "gmail",
  auth: {
    user: "resto6430@gmail.com",
    pass: "cicjmbbdilnbxdaf",
  },
});


export const GenerateSalt = async () =>{
    return await bcrypt.genSalt(12);
}

export const GeneratePassword = async (password,salt)=>{
    return await bcrypt.hash(password,salt);
}

export const validatePassword = async (password,hash)=>{
    return await bcrypt.compare(password,hash);
}

export const SignatureCreate = async (payload)=>{
    return jwt.sign(payload,APP_SECRET,{expiresIn:'1d'});
}
export const createToken = (id,Email) => {
    const maxAge = 3 * 24 * 60 * 60;
    return jwt.sign({id,Email},'appoinment scheduling',{expiresIn:maxAge});
  };
