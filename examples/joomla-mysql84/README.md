Joomla MySQL 8.4 Example
========================

This example exists primarily to test the following documentation:

* [Joomla Recipe](https://docs.devwithlando.io/tutorials/joomla.html)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize the latest Joomla codebase
rm -rf mysql84 && mkdir -p mysql84 && cd mysql84
lando init --source remote --remote-url https://downloads.joomla.org/cms/joomla3/3-10-4/Joomla_3-10-4-Stable-Full_Package.tar.gz --recipe joomla --webroot . --name lando-joomla-mysql84 --option database=mysql:8
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml

# Should start up successfully
cd mysql84
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should return the joomla installation page by default
cd mysql84
lando exec appserver -- curl -L localhost | grep "Joomla"

# Should use 7.4 as the default php version
cd mysql84
lando php -v | grep "PHP 7.4"

# Should be running apache 2.4 by default
cd mysql84
lando exec appserver -- apachectl -V | grep 2.4
lando exec appserver -- curl -IL localhost | grep Server | grep 2.4

# Should be running mysql 8.4.x via the mysql:8 alias
cd mysql84
lando mysql -V | grep '8.4.'

# Should use the default mysql8 config file
cd mysql84
lando exec database -- cat /opt/bitnami/mysql/conf/my_custom.cnf | grep "LANDOJOOMLAMYSQL8CNF"

# Should use binlog_expire_logs_seconds instead of the removed expire_logs_days
cd mysql84
lando mysql -u root -e "show variables;" | grep binlog_expire_logs_seconds | grep 864000

# Should not enable xdebug by default
cd mysql84
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
cd mysql84
lando mysql -ujoomla -pjoomla joomla -e quit

# Should use joomla console by default
cd mysql84
lando joomla -V
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd mysql84
lando destroy -y
lando poweroff
```
