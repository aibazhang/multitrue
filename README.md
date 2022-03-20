# Multitrue ([live](https://multitrue.herokuapp.com/))

A multi-language news web application

Support 🇺🇸🇯🇵🇹🇼🇨🇳🇰🇷

## Architecture

- Back-end: [NodeJS](https://nodejs.org/en/) + [Express](https://expressjs.com/)
- Database: [MongoDB](https://www.mongodb.com/)

## Run locally

1. Add following configture to `config.env`
```
NODE_ENV=development
PORT=3000
DATABASE=YOUR_MONGO_DB_URL
DATABASE_PASSWORD=YOUR_MONGO_DB_PASSWORD

NEWSAPI_KEY=YOUR_NEWSAPI_KEY

JWT_SECRET=YOUR_JWT_SECRET
JWT_EXPIRES_IN=180d 
JWT_COOKIE_EXPIRE_IN=90
```
2. Run application

```
# Install dependencies
npm i

# Run application
npm start run:dev
```

## License

[MIT](https://github.com/aibazhang/multitrue/blob/master/LICENSE)

---
Powered by [startbootstrap-clean-blog](https://github.com/StartBootstrap/startbootstrap-clean-blog) and [NewsAPI](https://newsapi.org/)

