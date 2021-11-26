<div align="center">

![nextjs-et-logo](nextjs-et-logo.png)
# Next.js E.T. (Easy-to-use Template)

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/nextjs-et/blob/master/LICENSE)
![Programming Language Usage](https://img.shields.io/github/languages/top/jooy2/nextjs-et)
![Languages](https://img.shields.io/github/languages/count/jooy2/nextjs-et)
[![Followers](https://img.shields.io/github/followers/jooy2?style=social)](https://github.com/jooy2)

Here is a **[Next.js](https://nextjs.org/)** example template with core features.

It includes the following elements by default: [Next.js custom server](https://nextjs.org/docs/advanced-features/custom-server), database access, [i18n translation](https://github.com/isaachinman/next-i18next), [server scheduler](https://github.com/node-schedule/node-schedule), and more!
</div>

## Components
- **Next.js 12.x**
  - `next-i18next` (Route-based string translation)
  - `next-seo` (Improve website SEO)
  - `nextjs-sitemap-generator`

- **React 17.x**
    - `redux` (Global state management)

- **Koa 2.13.x**
    - `koa` (Next.js custom server and API service)
    - `@koa/cors`
    - `koa-router`
    - `koa-helmet`
    - `node-schedule`

- **ORM: Sequelize 6.11.x**
    - `sequelize` 
    - `mariadb` (or you can install and use the driver you want!)

- **ESLint 7.x**
    - `eslint` (Code syntax checking)
    - `eslint-plugin-react-hooks`

## Features
 - ✅ Server scheduler
 - ✅ Route-based translation
 - ✅ Easy database schema management
 - 🚧 Layout & theme manager (TODO)
 - 🚧 Improved website SEO (TODO)
 - ✅ Sitemap generator (TODO)
 - ✅ Translate with one command (TODO)

## Installation
Clone this repo using below command.
```shell
$ git clone https://github.com/jooy2/nextjs-et <PROJECT_NAME>
```

Then, install the dependency module.
```shell
$ npm i
```

## Testing in development & production
You can test your project in the development environment using the following command:
```shell
$ npm run dev
```

To build into a production environment, first build the Next.js page by entering the following command:
```shell
$ npm run client:build
```

If a folder called `.next` is created at the top of the project, you can test the production environment with the following command.
```shell
$ npm run start
```

## Database Configurations
When the Next.js custom server starts, the database is initialized with the connection information. Default schema files can be defined in `server/models`.

- See Sequelize's documentation for details: https://sequelize.org/master/index.html

A `.db-connection.json` file must be created in the root path to read connection information.

The contents of this file are written by referring to the `.db-connection.json.example` file in the root path.

Note that different `development` and `production` environments use different connection information.
```text
...
"development": {
  "username": "user",
  "password": "pass",
  "database": "mydb",
  "host": "example.com",
  "port": 3306,
  "timezone": "+09:00",
  "dialectOptions": {
    "decimalNumbers": true
  },
  "dialect": "mariadb",
  "operatorsAliases": 0
},
...
```

### How to disable database connection?
Remove the `models.sequelize.sync()` call part at the bottom of the `server/index.js` file, and move the `server.listen(port);` code outside.
```javascript
// before
models.sequelize.sync(syncOptions).then(() => { // <-- Remove this line
  server.listen(port);
  console.info(`client-server is running on port ${port}!!!`);
}); // <-- Remove this line

// after
server.listen(port);
console.info(`client-server is running on port ${port}!!!`);
```


## Contribute
You can report issues on Github Issue. You can also request a pull to fix bugs and add frequently used features.

## License
Copyright © 2021 jooy2 Released under the MIT license.
