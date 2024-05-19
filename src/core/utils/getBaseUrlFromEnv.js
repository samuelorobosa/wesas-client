export const getBaseUrlFromEnv = () => {
    const urlFromEnvironment = {
        development: 'https://xlaux-b3b674c8b7d0.herokuapp.com',
        production: 'production-url',
        testing: 'testing-url',
    };
    const env = process.env.NODE_ENV;
    return urlFromEnvironment[env];
};