# callbaq

## NAME

**callbaq** - Convert nested callback hell into serial procedural coding style, which is more readable, writable, and maintainable.

Lightweight, **Zero Dependency.**

## INSTALLATION

`npm i callbaq`

## SYNOPSIS

```javascript
var callbaq = require('callbaq');
var cb1 = new callbaq;

cb1.add(function (cbq, input) {
        console.log("hello world : " + input);
        cbq.next("y0y0");
})

cb1.add(function (cbq, input) {
        console.log("here we go : " + input);
})

cb1.start("new world!");
```

and this is what you'll see

```
$ node example.js 
hello world : new world!
here we go : y0y0
```

## METHODS

### **new**

Get a new callback queue / flow.

```javascript
var callbaq = require('callbaq');
var cb1 = new callbaq;
```

### **add**

Add (append) a function for use as a callback, which will be executed at the next step.

The parameters for callback are:
1. `callbaq` instance of the current callback queue.
2. params from `start()` or the output of previous (step) callback function.

```javascript
cb1.add(function (cbq, input) {
        console.log("something cool : " + input);
        cbq.next("a secret");
})
```


### **next**

Check out from the current step and pass result to next step / callback function when works are done.

```javascript
cb1.add(function (cbq, input) {
        // do something
        cbq.next("A master piece");
})
```

### **start**

Start and walk through the workflow from step 0.

```javascript
cb1.start("new world!");
```

## ADDITIONAL INFO

You can have multiple callbaq instances working together or independently.

Just new some and enjoy them.

```javascript
var callbaq = require('./index');
var cb1 = new callbaq();
var cb2 = new callbaq();

cb1.add(function (cbq, input) {
        console.log("hello world : ", input);
        cbq.next("y0y0");
});
cb1.add(function (cbq, input) {
        console.log("here we go : ", input);
});


cb2.add(function (cbq, input) {
        console.log("Are you ok : " + input);
        cbq.next("Let's rock N roll");
});
cb2.add(function (cbq, input) {
        console.log("I am very ok : " + input);
});


cb1.start("new world!");
cb2.start("bro");
```

Output will be

```
$ node example.js 
hello world :  new world!
here we go :  y0y0
Are you ok : bro
I am very ok : Let's rock N roll
```

## AUTHOR

BlueT - Matthew Lien - 練喆明 <BlueT@BlueT.org>

## BUGS

https://github.com/BlueT/callbaq/issues

## CONTRIBUTE

PRs welcome!

If you find this module useful, please give me a Star. I'll be happy whole day!

Hope this module can save your time, a tree, and a kitten.

## SEE ALSO

AnyEvent::CallbackStack - Perl version https://github.com/BlueT/AnyEvent-CallbackStack