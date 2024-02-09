---
title: Configuration
description: Learn how to configure the Lando Joomla recipe.
---

# Configuration

While Lando [recipes](https://docs.lando.dev/core/v3/recipes.html) set sane defaults so they work out of the box, they are also [configurable](https://docs.lando.dev/core/v3/recipes.html#config).

Here are the configuration options, set to the default values, for this recipe's [Landofile](https://docs.lando.dev/core/v3). If you are unsure about where this goes or what this means, we *highly recommend* scanning the [recipes documentation](https://docs.lando.dev/core/v3/recipes.html) to get a good handle on how the magicks work.

```yaml
recipe: joomla
config:
  php: '7.2'
  composer_version: '2.0.7'
  via: apache:2.4
  webroot: .
  database: mysql:5.7
  xdebug: false
  config:
    database: SEE BELOW
    php: SEE BELOW
    server: SEE BELOW
    vhosts: SEE BELOW
```

Note that if the above config options are not enough, all Lando recipes can be further [extended and overriden](https://docs.lando.dev/core/v3/recipes.html#extending-and-overriding-recipes).

## Choosing a php version

You can set `php` to any version that is available in our [php service](https://docs.lando.dev/php). However, you should consult the [Joomla requirements](https://downloads.joomla.org/us/technical-requirements-us) to make sure that version is actually supported by Joomla itself.

The [recipe config](https://docs.lando.dev/core/v3/recipes.html#config) to set the Joomla recipe to use `php` version `7.1` is shown below:

```yaml
recipe: joomla
config:
  php: '7.1'
```

## Choosing a composer version

You can set `composer_version` to any version that is available in our [php service](https://docs.lando.dev/php/config.html#installing-composer).

```yaml
recipe: joomla
config:
  composer_version: '1.10.1'
```

## Choosing a web server

By default, this recipe will be served by the default version of our [apache](https://docs.lando.dev/apache) service but you can also switch this to use [`nginx`](https://docs.lando.dev/nginx). We *highly recommend* you check out both the [apache](https://docs.lando.dev/apache) and [nginx](https://docs.lando.dev/nginx) services before you change the default `via`.

#### With Apache (default)

```yaml
recipe: joomla
config:
  via: apache
```

#### With nginx

```yaml
recipe: joomla
config:
  via: nginx
```

## Choosing a database backend

By default, this recipe will use the default version of our [mysql](https://docs.lando.dev/mysql) service as the database backend but you can also switch this to use [`mariadb`](https://docs.lando.dev/mariadb) or ['postgres'](https://docs.lando.dev/postgres) instead. Note that you can also specify a version *as long as it is a version available for use with lando* for either `mysql`, `mariadb` or `postgres`.

If you are unsure about how to configure the `database`, we *highly recommend* you check out the [mysql](https://docs.lando.dev/mysql), [mariadb](https://docs.lando.dev/mariadb)and ['postgres'](https://docs.lando.dev/postgres) services before you change the default.

Also note that like the configuration of the `php` version, you should consult the [Joomla requirements](https://downloads.joomla.org/us/technical-requirements-us) to make sure the `database` and `version` you select is actually supported by Joomla itself.

#### Using MySQL (default)

```yaml
recipe: joomla
config:
  database: mysql
```

#### Using MariaDB

```yaml
recipe: joomla
config:
  database: mariadb
```

#### Using Postgres

```yaml
recipe: joomla
config:
  database: postgres
```

#### Using a custom version

```yaml
recipe: joomla
config:
  database: postgres:9.6
```

## Connecting to your database

Lando will automatically set up a database with a user and password and also set an environment variable called [`LANDO INFO`](https://docs.lando.dev/guides/lando-info.html) that contains useful information about how your application can access other Lando services.

The default database connection information for a Joomla site is shown below:

Note that the `host` is not `localhost` but `database`.

```yaml
database: joomla
username: joomla
password: joomla
host: database
# for mysql
port: 3306
# for postgres
# port: 5432
```

You can get also get the above information, and more, by using the [`lando info`](https://docs.lando.dev/cli/info.html) command.

## Using custom config files

You may need to override our [default Joomla config](https://github.com/lando/joomla/tree/main/builders) with your own.

If you do this, you must use files that exist inside your application and express them relative to your project root as shown below:

Note that the default files may change based on how you set both `ssl` and `via`. Also note that the `vhosts` and `server` config will be either for `apache` or `nginx` depending on how you set `via`. We *highly recommend* you check out both the [apache](https://docs.lando.dev/apache/config.html) and [nginx](https://docs.lando.dev/nginx/config.html) if you plan to use a custom `vhosts` or `server` config.

**A hypothetical project**

Note that you can put your configuration files anywhere inside your application directory. We use a `config` directory but you can call it whatever you want such as `.lando` in the example below:

```bash
./
|-- config
   |-- default.conf
   |-- my-custom.cnf
   |-- php.ini
   |-- server.conf
|-- index.php
|-- .lando.yml
```

**Landofile using custom joomla config**

```yaml
recipe: joomla
config:
  config:
    database: config/my-custom.cnf
    php: config/php.ini
    server: config/server.conf
    vhosts: config/default.conf
```
