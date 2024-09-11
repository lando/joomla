---
description: Learn how to get started with the Lando Joomla recipe.
---

# Getting Started

## Requirements

Before you get started with this recipe we assume that you have:

1. [Installed Lando](https://docs.lando.dev/getting-started/installation.html) and gotten familiar with [its basics](https://docs.lando.dev/cli/)
2. [Initialized](https://docs.lando.dev/cli/init.html) a [Landofile](https://docs.lando.dev/core/v3) for your codebase for use with this recipe
3. Read about the various [services](https://docs.lando.dev/core/v3/services/lando.html), [tooling](https://docs.lando.dev/core/v3/tooling.html), [events](https://docs.lando.dev/core/v3/events.html) and [routing](https://docs.lando.dev/core/v3/proxy.html) Lando offers.

## Quick Start

Try out the relevant commands below to spin up a new Landoified vanilla Joomla site.

```bash
# Create folder and enter it
mkdir joomla && cd joomla

# Initialize a joomla recipe using the latest Joomla version
lando init \
  --source remote \
  --remote-url https://downloads.joomla.org/cms/joomla4/4-1-0/Joomla_4-1-0-Stable-Full_Package.tar.gz \
  --recipe joomla \
  --webroot . \
  --name my-first-joomla-app

# Start it up
lando start

# List information about this app.
lando info
```
Log in as administrator at `https://my-first-joomla-app.lndo.site/administrator/`.

