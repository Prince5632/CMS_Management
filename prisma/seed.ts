import { db as prisma } from '../lib/db';
import { hashPassword } from '../lib/password';

async function main() {
    const email = 'admin@econiya.com';
    const password = await hashPassword('password123'); // Default password, change immediately

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: 'Admin User',
            password,
            role: 'admin',
        },
    });

    console.log({ user });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
