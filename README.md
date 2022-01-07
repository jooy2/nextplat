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

- **ESLint 8.x**
    - `eslint` (Code syntax checking)
    - `eslint-plugin-react-hooks`

## Features
 - ✅ Structure of Next.js that can be easily and quickly understood
 - ✅ Route-based translation
 - ✅ Easy database schema management
 - ✅ Server scheduler
 - ✅ Layout & theme manager
 - ✅ Improved website SEO
 - ✅ Sitemap generator
 - ✅ Translate with one command

## Installation
Clone this repo using below command.
```shell
$ git clone https://github.com/jooy2/nextjs-et <PROJECT_NAME>
```

Then, install the dependency module.
```shell
$ npm i
```

## Initialize the project
Type `npm run init` in the command. Keep in mind that it is different from `npm init`.

The script automatically creates an environment variable file containing the necessary variables and other public files (`manifest.json`, `robots.txt`).

If you do not proceed with this process, the website may not work properly.

When you do this, the previously set files may be reset.

```shell
$ npm run init

[NextJS-ET] Enter your website domain (Default: example.com):
[NextJS-ET] Enter your website author name (Default: NextJS-ET):
[NextJS-ET] Enter your website author email (Default: admin@example.com):
[NextJS-ET] Would you like to enable the database function? (Enter 'Y' or 'N'):
...
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

## Using global `PageRoot` component per page
If you use the `components/layouts/PageRoot.js` component for each page of Next.js, you can easily include the common layout of the page as well as useful functions such as SEO and page scrolling.

You can use `PageRoot` in the topmost component of each page as shown below.

```javascript
const Index = () => {
  return (
    <PageRoot
      title="About Me"
      desc="Hello."
    >
      <div>
        <h1>About Me</h1>
      </div>
    </PageRoot>
  );
};
```

### Default PageRoot Props
```javascript
{
  // Set the title of the meta tag to the desired value.
  "title": string,
  // Set the description of the meta tag to the desired value.
  "desc":  string,
  // Customize the text to be added to the end of the title tag. Available when the value of withTail prop is true.
  "headerTitle": string,
  // If this value is true, the header is enabled. (default: true)
  "header": boolean,
  // If this value is true, the container is enabled. (default: true)
  "container": boolean,
  // If this value is true, the footer is enabled. (default: true)
  "footer": boolean,
  // If this value is true, the site name is appended to the end of the value of the title meta tag. (default: true)
  "withTail": boolean,
  // If this value is true, the scroll moves to the top every time the page is moved. (default: true)
  "scrollToTop": boolean,
  // If this value is true, it will prevent robots.txt from indexing this page. (default: false)
  "noIndex": boolean,
  // Next-seo's per-page OpenGraph settings. (default: {})
  "openGraph": object
}
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
If you do not want to use the database connection for various reasons, change the value of `NEXT_PUBLIC_USE_DATABASE` to `false` in the env file suitable for the current environment.
```text
NEXT_PUBLIC_USE_DATABASE=false
```
This value can be changed by prompt when initializing the project with `npm run init`. This only prevents DB connection and initialization work when running the Next.js server.

If you want to completely disable the database, you will need to uninstall the preinstalled `sequelize` and `mariadb` modules and delete the related code.


## Contribute
You can report issues on Github Issue. You can also request a pull to fix bugs and add frequently used features.

## License
Copyright © 2021 jooy2 Released under the MIT license.
