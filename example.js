var Callbaq = require('./index');

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
