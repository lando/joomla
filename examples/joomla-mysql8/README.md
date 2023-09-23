Joomla Example
==============

This example exists primarily to test the following documentation:

* [Joomla Recipe](https://docs.devwithlando.io/tutorials/joomla.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize the latest Joomla codebase
rm -rf mysql8 && mkdir -p mysql8 && cd mysql8
lando init --source remote --remote-url https://downloads.joomla.org/cms/joomla3/3-10-4/Joomla_3-10-4-Stable-Full_Package.tar.gz --recipe joomla --webroot . --name lando-joomla-mysql8 --option database=mysql:8.0.22
cp -f ../../.lando.local.yml .lando.local.yml && cat .lando.local.yml

# Should start up successfully
cd mysql8
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should return the joomla installation page by default
cd mysql8
lando ssh -s appserver -c "curl -L localhost" | grep "Joomla"

# Should use 7.4 as the default php version
cd mysql8
lando php -v | grep "PHP 7.4"

# Should be running apache 2.4 by default
cd mysql8
lando ssh -s appserver -c "apachectl -V | grep 2.4"
lando ssh -s appserver -c "curl -IL localhost" | grep Server | grep 2.4

# Should be running mysql 8.x by default
cd mysql8
lando mysql -V | grep 8.0

# Should not enable xdebug by default
cd mysql8
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
cd mysql8
lando mysql -ujoomla -pjoomla joomla -e quit

# Should use joomla console by default
cd mysql8
lando joomla -V
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd mysql8
lando destroy -y
lando poweroff
```
