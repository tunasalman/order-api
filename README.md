# Order API

## Features

- **[NestJS](https://docs.nestjs.com/)** - Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications

- **[Dockerfile]()** - Dockerfile to generate docker builds.

- **[docker-compose]()** - Docker compose script to start service in dev mode.

- **[Class Validator](https://www.npmjs.com/package/class-validator)** - Allows use of decorator based validation.

- **[.env file for configuration](#configuration)** - Change server config like app port, db credentials etc

- **[TypeOrm](https://typeorm.io/#/)** - Object-relational mapping (ORM) tool

- **[Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)** - Distributed text search engine on Docker

- **[Swagger](https://docs.nestjs.com/openapi/introduction)** - Interactive API documentation

- **ESLINT** - ESLINT is configured for linting.

---

# Installation

## Software Requirements

- Node.js **16.10+**
- Docker **20.x+**

## How to install

### Using Git (recommended)

1.  Clone the project from github. Change "myproject" to your project name.

```bash
git clone  ./myproject
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
yarn install
```

---

# Configuration

### Setting up environments

1.  You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
    ```bash
    cp .env.example .env
    ```
3.  Change the values of the file to your environment. Helpful comments added to environment variables table to understand the constants.

---

# Development

| Var Name               | Type   | Default          | Description                    |
| ---------------------- | ------ | ---------------- | ------------------------------ |
| PORT                   | number | `3000`           | Port to run the API server on  |
| POSTGRES_PORT          | number | `5432`           | Port to run the PostgresSQL on |
| POSTGRES_HOST          | string | _db_             |
| POSTGRES_USER          | string | example          |
| POSTGRES_PASSWORD      | string | example          |
| POSTGRES_DB            | string | example          |
| ELASTICSEARCH_NODE     | string | http://es01:9200 | Elasticsearch clusters Url     |
| ELASTICSEARCH_USERNAME | string | elastic          | Elasticsearch user             |
| ELASTICSEARCH_PASSWORD | string | admin            | Elasticsearch password         |

## Start dev server

Starting Order API & Postgres & Elasticsearch Nodes as a docker container using the compose script at `docker-compose.yml`.

```
$ yarn dev
```

Running the above commands results in

- 🚀 Server ready at http://localhost:3000/api
- 🚀 Swagger ready at http://localhost:3000/documentation
- Press CTRL + C to stop the process.

---

# ESLint

### Running Eslint

```bash
yarn lint
```

You can set custom rules for eslint in `.eslintrc.js` file, Added at project root.

# License

This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.
