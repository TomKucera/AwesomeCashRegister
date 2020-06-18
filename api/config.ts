
import dotenv from 'dotenv';

dotenv.config();

interface IGoogleAuth {
    clientId: string,
    secret: string,
    redirectUrl: string
}

const GoogleAuth: IGoogleAuth = {
    clientId: process.env.GOOGLE_AUTH_CLIENT_ID || '',
    secret: process.env.GOOGLE_AUTH_SECRET || '',
    redirectUrl: process.env.GOOGLE_AUTH_REDIRECT_URL || '',
};

console.log("config.GoogleAuth ", GoogleAuth);

export default {
    GoogleAuth,
};

