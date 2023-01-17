let Callbaq = require("./index");

// create instances, or event put them in array
let cb1 = new Callbaq();
let cb2 = new Callbaq({ "_cbq": [], "_current_step": 0 });

cb1.start("new world!");
// add jobs to callback queue 1
cb1.add((cbq, input) => {
	console.log("\tcb1, step 1: hello world : ", input);
	cbq.next("y0y0");
});
cb1.add((cbq, input) => {
	console.log("v->\tcb1, step 2: here we go : ", input);
	cbq.resolve("hEy Lo");
});

// add tasks to flow 2 (in ES6 style), and an inner one
cb2.add((cbq, input) => {
	console.log("|\tcb2, step 1: Are you ok : " + input);
	let outer_cbq = cbq;

	// an inner one
	let inner_cb = new Callbaq();
	inner_cb.add((cbq, who) => {
		console.log(`|\t---> inner1: asking ${who}`);
		cbq.next("fine");
	});
	inner_cb.add((cbq, result) => {
		console.log(`|\t---> inner2: he's ${result}`);

		// add a new callback for cb2 just in time
		cb2.add((cbq, input) => {
			console.log("|\tcb2, step 2: I am very ok : " + input);
		});

		outer_cbq.next("Let's rock N roll");
	});
	inner_cb.start(input);
});
// fire in da hole
console.log("|\t----------");
cb2.start("bro");

console.log("|\t----------");
// cb1 again
cb1.then((cbq, input) => {
	console.log("^->\tcb1, step 3: here we go : ", input);
});

console.log("\t----------");
// new with default values
let dataqueue = [1, 2];
let callbaq = new Callbaq({ "dataqueue": dataqueue });
callbaq.add((cbq, input) => {
	console.log("\tsomething in data queue: ", input);
	cbq.next("lala");
});
callbaq.add((cbq, input) => {
	console.log("\tand guess what! ", input);
	cbq.next();
});
callbaq.add((cbq, input) => {
	console.log("\tfrom dataqueue again! ", input);
	cbq.next();
});
