var callbaq = require('./index');
var cb1 = new callbaq;
var cb2 = new callbaq;

cb1.add(function (cbq, input) {
        console.log("hello world : " + input);
        cbq.next("y0y0");
})
cb1.add(function (cbq, input) {
        console.log("here we go : " + input);
})


cb2.add(function (cbq, input) {
        console.log("Are you ok : " + input);
        cbq.next("Let's rock N roll");
})
cb2.add(function (cbq, input) {
        console.log("I am very ok : " + input);
})


cb1.start("new world!");
cb2.start("bro");
