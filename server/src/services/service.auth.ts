import bcrypt from 'bcrypt';
import { sign } from 'hono/jwt';
import { prisma } from '../index';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_for_dev';

export const registerUser = async (data: any) => {
    const { email, password, name, phone } = data;

    const existingUser = await prisma.user.findUnique({
        where: { email: email }
    });

    if (existingUser) {
        throw new Error('Користувач з таким email вже існує');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: { email, name, phone, password: hashedPassword },
    });

    return newUser;
};

export const loginUser = async (data: any) => {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        throw new Error('Користувача з таким email не знайдено!');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Неправильний пароль!');
    }

    const payload = {
        userId: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    };
    const token = await sign(payload, JWT_SECRET);

    return { user, token };
};