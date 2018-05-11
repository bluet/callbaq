var callbaq = require('./index');
var cb1 = new callbaq;

cb1.add(function (input) {
        console.log("hello world : " + input);
        cbq.next("y0y0");
})

cb1.add(function (input) {
        console.log("he llow or ld : " + input);
})


cb1.start("go!");
