# jQuery xRequest

Simple plugin to Ajax Request

## How to use

Passing options only.

```js
var myrequest = new xRequest({
  url: 'server.php',
  type: 'post',
  dataType: 'json',
  onSuccess: function(json) {
      console.log(json);
  }
});
myrequest.send();
```

Or passing two params, a form for serialize it's fields and options.

```js
var myrequest = new xRequest($('#myform'), {
  url: 'server.php',
  type: 'post',
  dataType: 'json',
  processForm: true,
  data: {foo: 'bar'},
  onSuccess: function(json) {
      console.log(json);
  }
});
myrequest.send();
```


## Installation
**Install with Bower**
```shell
$ bower install xrequest --save
```

## Demo

xRequest [live demo](http://goo.gl/DgJAj)

## Documentation

#### Options

* `url: './'`               - URL to send.
* `type: 'post'`            - Send Method.
* `dataType: 'json'`        - Data type to retrieve.
* `csrf: true`              - If true, csfr token will send as http header.
* `processForm: true`       - If true, serialize the form passed as param on `new xRequest(myform)`
* `data: null`              - The data to send. It will be to preserved until it decides to unset. For example using the `unsetDataBy()` or `clearData()` functions.

**Note:** The options by xRequest are compatible with [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax/) options, so for example it can use: `cache`, `jsonp`, `beforeSend` or any options supported in `jQuery.ajax` function.

#### Methods

* `isSending()`             - Checks if it's sending yet.
* `send()`                  - Sends the ajax request.
* `setOption(opt, value)`   - Sets one option. e.g: `myrequest.setOption('url', '/server.php')`
* `setForm(form)`           - Sets the form. e.g: `myrequest.setForm($('#myform'))`
* `getOption(opt)`          - Gets one option. e.g: `myrequest.getOption('data')`
* `setData(key, value)`     - Sets a param data passing key and value or a hash object. E.g: `setData({key1: val1, key2: val2})`<br>
**Note:** `setData` adds or update the elements (key or value) in array data, it does not replace the array data itself.
* `unsetDataBy(key)`  - Unsets one element data by key. e.g: `myrequest.removeDataElement('myparam')`
* `removeDataElement(key)`  - The same to `unsetDataBy` method (old)
* `clearData()`             - Unsets all data values.

#### Events

* `onStart()` - Fires when start the sending.
* `onSuccess(data, textStatus, jqXHR)` - Fires when request is ok.
* `onError(jqXHR, textStatus, errorThrown)` - Fires when an error occurred.

## History
Check out [the releases](https://github.com/joseluisq/jquery.xrequest/releases) changelog.

## License

Released under [MIT Licence](http://www.opensource.org/licenses/mit-license.php)
