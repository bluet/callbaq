"use strict";
const test = require("tape");
const Callbaq = require("../index");
test("Callbaq", (t) => {
	t.plan(1);
	t.pass("Callbaq is loaded");
});
test("Callbaq: new", (t) => {
	t.plan(1);
	let cbq = new Callbaq();
	t.ok(cbq instanceof Callbaq, "Callbaq is a class");
});
test("Callbaq: start", (t) => {
	t.plan(1);
	let cbq = new Callbaq();
	cbq.start();
	t.ok(cbq instanceof Callbaq, "Callbaq is a class");
});
test("Callbaq: add", (t) => {
	t.plan(1);
	let cbq = new Callbaq();
	cbq.add((cbq, input) => {
		t.pass("add a callback");
	});
	cbq.start();
});
test("Callbaq: add with data", (t) => {
	t.plan(1);
	let cbq = new Callbaq();
	cbq.add((cbq, input) => {
		t.equal(input[0], "hello", "add a callback with data");
	});
	cbq.start("hello");
});
test("Callbaq: add with data and next", (t) => {
	t.plan(2);
	let cbq = new Callbaq();
	cbq.add((cbq, input) => {
		t.equal(input[0], "hello", "add a callback with data");
		cbq.next("world");
	});
	cbq.add((cbq, input) => {
		t.equal(input[0], "world", "add a callback with data");
	});
	cbq.start("hello");
});
test("Callbaq: add with data and resolve and then", (t) => {
	t.plan(2);
	let cbq = new Callbaq();
	cbq.add((cbq, input) => {
		t.equal(input[0], "hello", "add a callback with data");
		cbq.resolve("world");
	});
	cbq.then((cbq, input) => {
		t.equal(input[0], "world", "add a callback with data");
	});
	cbq.start("hello");
});
test("Callbaq: complex test with 3 cbq", (t) => {
	t.plan(10);

	// create instances, or event put them in array
	let cb1 = new Callbaq();
	let cb2 = new Callbaq({ "_cbq": [], "_current_step": 0 });

	cb1.start("new world!");
	// add jobs to callback queue 1
	cb1.add((cbq, input) => {
		t.equal(input[0], "new world!", "cb1, step 1: hello world");
		cbq.next("y0y0");
	});
	cb1.add((cbq, input) => {
		t.equal(input[0], "y0y0", "cb1, step 2: y0y0");
		cbq.resolve("hEy Lo");
	});

	// add tasks to flow 2 (in ES6 style), and an inner one
	cb2.add((cbq, input) => {
		t.equal(input[0], "bro", "cb2, step 1: bro");
		let outer_cbq = cbq;

		// an inner one
		let inner_cb = new Callbaq();
		inner_cb.add((cbq, who) => {
			t.equal(who[0], "bro", "inner1: bro");
			cbq.next("fine");
		});
		inner_cb.add((cbq, result) => {
			t.equal(result[0], "fine", "inner2: fine");

			// add a new callback for cb2 just in time
			cb2.add((cbq, input) => {
				t.equal(input[0], "Let's rock N roll", "cb2, step 2: Let's rock N roll");
			});

			outer_cbq.next("Let's rock N roll");
		});
		inner_cb.start(input[0]);
	});
	// fire in da hole
	cb2.start("bro");

	// cb1 again
	cb1.then((cbq, input) => {
		t.equal(input[0], "hEy Lo", "cb1, step 3: hEy Lo");
	});

	// new with default values
	let dataqueue = [1, 2];
	let callbaq = new Callbaq({ "dataqueue": dataqueue });
	callbaq.add((cbq, input) => {
		t.equal(input, 1, "callbaq, dataqueue step 1: 1");
		cbq.next("lala");
	});
	callbaq.add((cbq, input) => {
		t.equal(input[0], "lala", "callbaq, dataqueue step 2: lala");
		cbq.next();
	});
	callbaq.add((cbq, input) => {
		t.equal(input, 2, "callbaq, dataqueue step 3: 2");
		cbq.next();
	});
});
