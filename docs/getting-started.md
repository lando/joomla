---
description: Learn how to get started with the Lando Joomla recipe.
---

# Getting Started

## Requirements

Before you get started with this recipe we assume that you have:

1. [Installed Lando](https://docs.lando.dev/basics/installation.html) and gotten familiar with [its basics](https://docs.lando.dev/basics/)
2. [Initialized](https://docs.lando.dev/basics/init.html) a [Landofile](https://docs.lando.dev/config/lando.html) for your codebase for use with this recipe
3. Read about the various [services](https://docs.lando.dev/config/services.html), [tooling](https://docs.lando.dev/config/tooling.html), [events](https://docs.lando.dev/config/events.html) and [routing](https://docs.lando.dev/config/proxy.html) Lando offers.

## Quick Start

Try out the relevant commands below to spin up a new Landoified vanilla Joomla site.

```bash
# Initialize a joomla recipe using the latest Joomla version
lando init \
  --source remote \
  --remote-url https://downloads.joomla.org/cms/joomla3/3-9-2/Joomla_3-9-2-Stable-Full_Package.tar.gz \
  --recipe joomla \
  --webroot . \
  --name my-first-joomla-app

# Start it up
lando start

# List information about this app.
lando info
```

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "yarn add @lando/joomla" line to install a particular version eg
# yarn add @lando/platform@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:14-alpine sh -c \
  "yarn init -y \
  && yarn add @lando/joomla --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && yarn install --production --cwd /tmp/node_modules/@lando/joomla \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/joomla /plugins/@lando/joomla"

# Rebuild the plugin cache
lando --clear
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/joomla
```
::::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/joomla`. This command will also show you _where_ the plugin is being loaded from.
