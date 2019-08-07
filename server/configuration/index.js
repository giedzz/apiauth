module.exports = {
    JWT_SECRET: 'giedstraauthentication',
    oauth: {
        google: {
            clientID: '539203805313-drqnpvhgrpe1cksing45phl55v4vhuab.apps.googleusercontent.com',
            clientSecret: process.env.GOOGLE_SECRET
        },
        facebook: {
            clientID: '363483057669092',
            clientSecret: process.env.FB_SECRET
        }
    }
}