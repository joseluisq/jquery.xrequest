jQuery xRequest
===============

Simple plugin to Ajax Request


## How to use

        var myrequest = new xRequest({
            url: 'server.php',
            onSuccess: function(json) {
                if (json) {
                    // Printing the json data
                    $('#console').text(json.time + '\n' + json.hash);
                }
            }
        });
        // Event handler
        $('#mybutton').on('click', function() {
            if (!myrequest.sending) {
                // Sending ajax request
                myrequest.send();
            }
        });


## Live Demo

* xRequest live demo [here](http://goo.gl/DgJAj)

## Base Doc

### Instances: 
  * `new xRequest($(element), options)` - Passing two params an element (for example a form for then serialize fields) and options.
  * `new xRequest(options)` - Passing options only.

### Options :

  * `url: './'`               - URL to send.
  * `type: 'post'`            - Send Method.
  * `dataType: 'json'`        - Data type to retrieve.
  * `csrf: true`              - If true, csfr token will send as http header.
  * `processForm: true`       - If true, serialize the form passed as param on `new xRequest(myform)`
  * `data: null`              - Optional data to send. The data is preserve until you decide to remove, for example using the removeDataElement function.

### Public Methods :

  * `isSending()`             - Checks if it's sending yet.
  * `send()`                  - Send the ajax request.
  * `setOption(opt, value)`   - Set one option. e.g: `myrequest.setOption('url', '/server.php')`
  * `getOption(opt)`          - Get one option. e.g: `myrequest.getOption('data')`
  * `setData(key, value)` or `setData({key1: value1, key2: value2})` - Set the data.
  * `removeDataElement(key)`  - Remove one element data by key. e.g: `myrequest.getOption('myparam')`
  * `clearData()`       - Remove all data.

### Events :

  * `onStart()` - Fires when start the sending.
  * `onSuccess(data, textStatus, jqXHR)` - Fires when request is ok.
  * `onError(jqXHR, textStatus, errorThrown)` - Fires when an error occurred.
