# Callbaq

## NAME

**Callbaq** - A callback queue for workflow control.

Lightweight, **Zero Dependency.**

## SYNOPSIS

```javascript
var Callbaq = require('callbaq');
var cb1 = new Callbaq();

// add callback functions
cb1.add(function (cbq, input) {
        console.log("1: hello world : " + input);
        cbq.next("y0y0");
})
cb1.add(function (cbq, input) { console.log("2: here we go : " + input); })

// kickoff
cb1.start("new world!");

// output:
// 1: hello world : new world!
// 2: here we go : y0y0
```

## DESCRIPTION

**callbaq** is a lightweight callback queue for workflow and callback control with **Zero Dependency**.  
Convert nested callback hell into serial procedural coding style, which is more readable, writable, and maintainable.

Work standalone, or with other modules.

## INSTALLATION

`npm i callbaq`

## METHODS

### **new**

Get a new callback queue / flow.

```javascript
var Callbaq = require('callbaq');
var cb1 = new Callbaq();
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

## EXPERIMENTAL use of Methods

The following methods are for EXPERIMENTAL usage and might change in the future.

Avoid using them if possible.

### cbq

Similar to add(). Returns the queue array.  
If called with a function object, the function object will be append into queue.

```javascript
var old_queue = cb1.cbq();
var new_queue = cb1.cbq(function(cbq){ cbq.next("did something") });
```

### current_step

Get or set current step number.  
Workflow could be changed by calling this method with value.

```javascript
var current_step_number = cbq.current_step();

// start over from the first step
var new_step_number = cbq.current_step(0);
cbq.next("some params");
```

### step

Call specific step.

```javascript
cb1.step(3, "some params");
```


## ATTRIBUTES

The following methods are for EXPERIMENTAL usage and for Expert Only, might change in the future.

Avoid accessing them directly if possible.

### _cbq

The callback queue, `Array` of `function`.

### _current_step

Current step, in `number`.

### Create with custom initial values

```javascript
var qqq = [];
var uselessfx = (cbq) => {/*...*/}
qqq.push(uselessfx);
qqq.push(uselessfx);

// new with default values
var custom_cbq = new Callbaq({_cbq: qqq, _current_step: 1});
```

## EXAMPLES

You can have multiple callbaq instances working together or independently.

Just new some and enjoy them.

<https://github.com/BlueT/callbaq/blob/master/example.js>

```javascript
var Callbaq = require('callbaq');

// create instances, or event put them in array
var cb1 = new Callbaq();
var cb2 = new Callbaq({_cbq: [], _current_step: 0});

// add jobs to callback queue 1
cb1.add(function (cbq, input) {
        console.log("cb1, step 1: hello world : ", input);
        cbq.next("y0y0");
});
cb1.add(function (cbq, input) {
        console.log("cb1, step 2: here we go : ", input);
});

// add tasks to flow 2 (in ES6 style), and an inner one
cb2.add( (cbq, input) => {
        console.log("cb2, step 1: Are you ok : " + input);
        outer_cbq = cbq;

        // an inner one
        let inner_cb = new Callbaq();
        inner_cb.add( (cbq, who) => {
                console.log(`---> inner1: asking ${who}`);
                cbq.next("fine")
        });
        inner_cb.add( (cbq, result) => {
                console.log(`---> inner2: he's ${result}`);

                // add a new callback for cb2 just in time
                cb2.add( (cbq, input) => { console.log("cb2, step 2: I am very ok : " + input); });

                outer_cbq.next("Let's rock N roll");
        });
        inner_cb.start(input);

});

// fire in da hole
cb1.start("new world!");
console.log("----------");
cb2.start("bro");


// Output:
// cb1, step 1: hello world :  new world!
// cb1, step 2: here we go :  y0y0
// ----------
// cb2, step 1: Are you ok : bro
// ---> inner1: asking bro
// ---> inner2: he's fine
// cb2, step 2: I am very ok : Let's rock N roll

```

## AUTHOR

BlueT - Matthew Lien - 練喆明 <BlueT@BlueT.org>

## CREDITS

Waiting for **Your Name** here.

## BUGS

https://github.com/BlueT/callbaq/issues

## CONTRIBUTE

You can do a [Fork](https://github.com/BlueT/callbaq#fork-destination-box), fix bug or improve code, and send a PR.  
Or you can [file a issue](https://github.com/BlueT/callbaq/issues) for bugs or improvements.

If you find this module useful, please give me a **Star**, I'll be happy whole day.

Hope this module can save your time, a tree, and a kitten.

## SEE ALSO

AnyEvent::CallbackStack - Perl version https://github.com/BlueT/AnyEvent-CallbackStack