const env = process.env;
export default {
    port: env.PORT || 3000,
    nodeEnv: env.NODE_ENV || 'development'
};