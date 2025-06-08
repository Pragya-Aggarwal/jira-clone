import { validateCredentials, validateToken } from "../utils/credential";

const DummyApiCall = (data: any) =>
    new Promise((resolve) => setTimeout(() => resolve(data), 800));

export const loginWithCredentials = async (email: string, password: string) => {
    const user = validateCredentials(email, password);
    if (!user) throw new Error('Invalid credentials');

    const tokenPayload = {
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        },
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    };

    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify(tokenPayload));
    const signature = btoa('dummy-sign');
    const token = `${header}.${payload}.${signature}`;
    return DummyApiCall({ token, user });
};

export const loginWithJiraToken = async (email: string, token: string) => {
    const user = validateToken(email, token);
    if (!user) throw new Error('Invalid Jira token');

    const tokenPayload = {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    };

    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify(tokenPayload));
    const signature = btoa('dummy-sign');
    const jwtToken = `${header}.${payload}.${signature}`;
    return DummyApiCall({ token: jwtToken, user });
};