Joomla Init Example
===============

This example exists primarily to test the following documentation:

* [Joomla Recipe](https://docs.devwithlando.io/tutorials/joomla.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Initialize an empty Joomla recipe
rm -rf joomla && mkdir -p joomla && cd joomla
lando init --source remote --remote-url https://downloads.joomla.org/cms/joomla4/4-1-0/Joomla_4-1-0-Stable-Full_Package.tar.gz --recipe joomla --webroot . --name lando-joomla

# Should start up successfully
cd joomla
cp ../../.lando.local.yml .
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should use 7.4 as the default php version
cd joomla
lando php -v | grep "PHP 7.4"

# Should be running apache 2.4 by default
cd joomla
lando ssh -s appserver -c "apachectl -V | grep 2.4"
lando ssh -s appserver -c "curl -IL localhost" | grep Server | grep 2.4

# Should be running mysql 5.7 by default
cd joomla
lando mysql -V | grep 5.7

# Should not enable xdebug by default
cd joomla
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
cd joomla
lando mysql -ujoomla -pjoomla joomla -e quit

# Should have console available
cd joomla
lando composer list
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd joomla
lando destroy -y
lando poweroff
```
