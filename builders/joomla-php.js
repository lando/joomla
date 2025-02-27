'use strict';

const path = require('path');
const landoPhpPath = path.join(__dirname, '../node_modules/@lando/php');
const LandoPhp = require(`${landoPhpPath}/builders/php.js`);

/**
 * Joomla PHP builder class that extends Lando PHP builder.
 * Uses the bundled version of @lando/php plugin instead of user's version.
 *
 * @module joomla-php
 */
module.exports = {
  name: 'joomla-php',
  parent: '_appserver',
  /**
   * Builder function that returns the JoomlaPhp class
   * @param {Object} parent - Parent builder class
   * @return {Class} JoomlaPhp class extending LandoPhp builder
   */
  builder: parent => class JoomlaPhp extends LandoPhp.builder(parent, LandoPhp.config) {
    /**
     * Create a new JoomlaPhp instance
     * @param {string} id - Service id
     * @param {Object} options - Service options
     * @param {Object} factory - App factory instance
     */
    constructor(id, options = {}, factory) {
      options.nginxServiceType = 'joomla-nginx';
      super(id, options, factory);
    }
  },
};
