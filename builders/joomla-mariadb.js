'use strict';

const _ = require('lodash');
const LandoMariadb = require('./../node_modules/@lando/mariadb/builders/mariadb.js');

// Builder
module.exports = {
  name: 'joomla-mariadb',
  parent: '_service',
  builder: (parent, config) => class JoomlaMariadb extends LandoMariadb.builder(parent, LandoMariadb.config) {
    constructor(id, options = {}) {
      super(id, _.merge({}, config, options), {services: _.set({}, options.name)});
    };
  },
};
