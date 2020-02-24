# Callbaq
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbluet%2Fcallbaq.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbluet%2Fcallbaq?ref=badge_shield)


## NAME

**Callbaq** - A callback queue for workflow control.

Lightweight, **Zero Dependency.**

## SYNOPSIS

```javascript
var Callbaq = require('callbaq');
var workflow = new Callbaq();

// kickoff
workflow.start("new world!");

// add callback functions
workflow.add(function (cbq, input) {
        console.log("1: hello world : " + input);
        cbq.next("y0y0");
});
workflow.add(function (cbq, input) { console.log("2: here we go : " + input); });

// output:
// 1: hello world : new world!
// 2: here we go : y0y0
```

Or fire it later, also try using aliases methods

```javascript
// add callback functions
workflow.add(function (cbq, input) {
        console.log("1: hello world : " + input);
        cbq.resolve("y0y0");
});
workflow.then(function (cbq, input) {
        console.log("2: here we go : " + input);
        return "knock knock";
});
// fire
var door = workflow.start("new world!");

// output:
// 1: hello world : new world!
// 2: here we go : y0y0
// content of door: "knock knock"
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
var callbaq = new Callbaq();
```

### **start**

Start and walk through the workflow from step 0.

```javascript
callbaq.start("new world!");
```

### **add / then**

Add (append) a function for use as a callback, which will be executed at the next step.

The parameters for callback are:
1. `callbaq` instance of the current callback queue.
2. params from `start()` or the output of previous (step) callback function.

```javascript
callbaq.add(function (cbq, input) {
        console.log("something cool : " + input);
        cbq.next("a secret");
});
callbaq.then(function (cbq, input) {
        console.log("finished with " + input);
});
```


### **next / resolve**

Check out from the current step and pass result to next step / callback function when works are done.

```javascript
callbaq.add(function (cbq, input) {
        cbq.resolve("A master piece");
});
callbaq.then(function (cbq, input) {
        cbq.next("A master piece");
})
```

## EXPERIMENTAL use of Methods

The following methods are for EXPERIMENTAL usage and might change in the future.

Avoid using them if possible.

### cbq

Similar to add(). Returns the queue array.  
If called with a function object, the function object will be append into queue.

```javascript
var old_queue = callbaq.cbq();
var new_queue = callbaq.cbq(function(cbq){ cbq.next("did something") });
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
callbaq.step(3, "some params");
```


## ATTRIBUTES

The following methods are for EXPERIMENTAL usage and for Expert Only, might change in the future.

Avoid accessing them directly if possible.

### dataqueue

The queue of data awaiting for being input of callback functions, `Array` of `any`.

### _cbq

The callback queue, `Array` of `function`.

### _current_step

Current step, in `number`.

### Create with custom initial values

```javascript
var dataqueue = [1, 2];

// new with default values
var callbaq = new Callbaq({dataqueue: dataqueue});
callbaq.add(function (cbq, input) {
        console.log("something in data queue: ", input);
});
// will be executed immediately without needing callbaq.start()
```

## EXAMPLES

You can have multiple callbaq instances working together or independently.

Just new some and enjoy them.

<https://github.com/BlueT/callbaq/blob/master/example.js>

```
Output:
	cb1, step 1: hello world :  [ 'new world!' ]
v->	cb1, step 2: here we go :  [ 'y0y0' ]
|	----------
|	cb2, step 1: Are you ok : bro
|	---> inner1: asking bro
|	---> inner2: he's fine
|	cb2, step 2: I am very ok : Let's rock N roll
|	----------
^->	cb1, step 3: here we go :  [ 'hEy Lo' ]
	----------
	something in data queue:  1
	and guess what!  [ 'lala' ]
	from dataqueue again!  2
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

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbluet%2Fcallbaq.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbluet%2Fcallbaq?ref=badge_large)