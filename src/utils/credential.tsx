export const userDetails = [
    {
        id: 1,
        email: 'main@gmail.com',
        password: 'pass@123',
        name: 'Pragya Aggarwal',
        jiraToken: 'jira_Details',
    }
];

export const validateCredentials = (email: string, password: string) => {
    return userDetails.find(user => user.email === email && user.password === password);
};

export const validateToken = (email: string, token: string) => {
    return userDetails.find(user => user.email === email && user.jiraToken === token);
};
