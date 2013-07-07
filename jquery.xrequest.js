
/*
 jQuery xRequest Plugin v1.0
 
 Release: 07/07/2013
 Author: Jose Luis Quintana <joseluisquintana20@gmail.com>
 
 https://github.com/joseluisq/jquery.xrequest
 
 Licensed under the MIT licenses: http://www.opensource.org/licenses/mit-license.php
 */

function xRequest(element, list) {

    this.isform = false;
    this.sending = false;
    this.options = {
        url: './',
        type: 'post',
        dataType: 'json',
        csrf: true,
        processForm: true,
        data: null,
        onStart: function() {
        },
        onSuccess: function(data, textStatus, jqXHR) {
        },
        onError: function(jqXHR, textStatus, errorThrown) {
        }
    };

    this.initialize = function(element, options) {
        this.element = element;
        this.csrf = $('meta[name="csrf-token"]');
        this.csrf = this.csrf.length > 0 ? this.csrf : null;

        if (this.element instanceof $) {
            this.isform = element.prop('tagName').toString().toLowerCase() === 'form';
        } else {
            options = element;
        }

        this.setOptions(options);
    };

    this.send = function() {
        var s = this, data = this.encodeObjects(), key, opt = this.options;
        this.sending = true;
        opt.onStart.apply(s, []);

        if (opt.data && typeof(data) === 'object') {
            for (key in opt.data) {
                data[key] = opt.data[key];
            }
        }

        data['r'] = new Date().getTime();
        opt.data = data;

        if (opt.csrf) {
            var s = this;

            if ('ajaxPrefilter' in $) {
                $.ajaxPrefilter(function(o, o, xhr) {
                    s.setCSRFHeader(xhr);
                });
            } else {
                $(document).ajaxSend(function(e, xhr) {
                    s.setCSRFHeader(xhr);
                });
            }
        }

        return $.ajax({
            type: opt.type,
            url: opt.url,
            data: data,
            dataType: opt.dataType,
            success: function(data, textStatus, jqXHR) {
                if (typeof(data) == 'object') {
                    if (data['header'] && data.header['token']) {
                        this.csrf.attr('content', data.header.token);
                    }
                }

                delete s.options.data['r'];
                s.sending = false;
                opt.onSuccess.apply(s, [data, textStatus, jqXHR]);
            },
            complete: opt.onComplete,
            error: opt.onError
        });
    };

    this.setOptions = function(options) {
        this.options = this.merge(this.options, options);
        this.options.csrf = !!this.csrf;
    };

    this.merge = function(a, b) {
        for (var i in b) {
            a[i] = b[i];
        }

        return a;
    };

    this.setData = function() {
        if (arguments.length > 0) {
            var data = this.options.data || {};

            switch (arguments.length) {
                case 1:
                    this.options.data = this.merge(data, arguments[0]);
                    break;
                case 2:
                    data[arguments[0]] = arguments[1];
                    this.options.data = data;
                    break;
            }
        }
    };

    this.isSending = function() {
        return this.sending;
    };

    this.setOption = function(opt, val) {
        this.options[opt] = val;
    };

    this.getOption = function(opt) {
        return this.options[opt];
    };

    this.removeDataElement = function(ele) {
        delete this.options.data[ele];
    };

    this.clearData = function() {
        this.options.data = null;
    };

    this.encodeObjects = function() {
        var data = {}, name;

        $('input,select,textarea,.xcombobox', this.element).each(function() {
            if ($(this).hasClass('xcombobox')) {
                name = $.trim($(this).attr('id'));
                data[name] = $.trim($(this).xcombobox('getValue'));
            }
            else {
                name = $.trim($(this).attr('name'));
                data[name] = $.trim($(this).val());
            }
        });

        return data;
    };

    this.setCSRFHeader = function(xhr) {
        if (this.csrf) {
            var token = this.csrf.attr('content');

            if (token) {
                xhr.setRequestHeader('X-CSRF-Token', token);
            }
        }
    };

    this.initialize(element, list);
}