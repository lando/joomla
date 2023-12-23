'use strict';

const _ = require('lodash');
const LandoMysql = require('./../node_modules/@lando/mysql/builders/mysql.js');

// Builder
module.exports = {
  name: 'joomla-mysql',
  parent: '_service',
  builder: (parent, config) => class JoomlaMysql extends LandoMysql.builder(parent, LandoMysql.config) {
    constructor(id, options = {}) {
      super(id, _.merge({}, config, options), {services: _.set({}, options.name)});
    };
  },
};
