"use strict";

/*
    Backbone views extend override for rendering dust templates
    This assumes that the dust-core was included in the index.html page
*/
var Backbone = require("backbone");
var q = require('q');
var _ = require("underscore");

module.exports = Backbone.View.extend({
    name: 'backboneDustView',
    initialize: function(options) {
        if (!options && (!options.el || !options.template))
            throw new Error("Backbone view " + this.name + ", instantiation failed");

        this.el = options.el;
        this.template = options.template;
        this.model = (options.data) ? options.data : {};
        this.params = (options.params)? options.params: {};

        _.bindAll(this, 'render');
    },
    render: function(options) {
        console.log('rendering ' + this.name + ' view');

        var deferred = q.defer();
        var opt = Backbone.$.extend({
            data: {}
        }, options);

        setTimeout(function() {
            dust.loadSource(this.template);

            dust.render(this.template.templateName, opt.data, function(err, out) {
                this.$el.html(out);
            }.bind(this));

            deferred.resolve(this);
        }.bind(this), 0);

        return deferred.promise;
    }
});
