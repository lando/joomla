---
title: Tooling
description: Learn about Lando Backdrop tooling commands like composer, php, drush, etc
---

# Tooling

By default, each Lando Joomla recipe will also ship with helpful dev utilities.

This means you can use things like `joomla`, `composer` and `php` via Lando and avoid mucking up your actual computer trying to manage `php` versions and tooling.

```bash
lando composer          Runs composer commands
lando db-export [file]  Exports database from a service into a file
lando db-import <file>  Imports a dump file into database service
lando joomla            Runs joomla commands
lando mysql             Drops into a MySQL shell on a database service
lando php               Runs php commands
```

**Usage examples**

```bash
# Get joomla cli help
lando joomla -h

# Clear the joomla cache
lando joomla cache:clear

# Run composer tests
lando composer test

# Drop into a mysql shell
lando mysql

# Check the app's installed php extensions
lando php -m
```

You can also run `lando` from inside your app directory for a complete list of commands. This is always advisable as your list of commands may not be 100% the same as above. For example, if you set `database: postgres` you will get `lando psql` instead of `lando mysql`.

## Using xdebug

This is just a passthrough option to the [xdebug setting](https://docs.lando.dev/plugins/php/config.html#using-xdebug) that exists on all our [php services](https://docs.lando.dev/plugins/php). The `tl;dr` is `xdebug: true` enables and configures the php xdebug extension and `xdebug: false` disables it.

```yaml
recipe: joomla
config:
  xdebug: true|false
```

However, for more information we recommend you consult the [php service documentation](https://docs.lando.dev/plugins/php).

## Importing Your Database

Once you've started up your Joomla site, you will need to pull in your database and files before you can really start to dev all the dev. Pulling your files is as easy as downloading an archive and extracting it to the correct location. Importing a database can be done using our helpful `lando db-import` command.

```bash
# Grab your database dump
curl -fsSL -o database.sql.gz "https://url.to.my.db/database.sql.gz"

# Import the database
# NOTE: db-import can handle uncompressed, gzipped or zipped files
# Due to restrictions in how Docker handles file sharing your database
# dump MUST exist somewhere inside of your app directory.
lando db-import database.sql.gz
```

You can learn more about the `db-import` command [over here](https://docs.lando.dev/guides/db-import.html).
