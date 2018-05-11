/*
 * callbaq - Convert nested callback hell into serial procedural coding style, which is more readable, writable, and maintainable.
 *
 * Copyright (c) 2018, BlueT - Matthew Lien - 練喆明
 * 
 * Author: BlueT - Matthew Lien - 練喆明 <BlueT@BlueT.org>
 * First Release Date: 2018-05-11
 */

DEBUG = 0;

function callbaq (...args) {
	var self = this;
	
	this._cbq = [];
	//~ push @cbq, AE::cv;
	this._current_step = 0;
	
	if (DEBUG) {
		console.log( 'New ' + JSON.stringify(this, null, 4) );
	}
};


callbaq.prototype.cbq = function (args) {
	var self = this;

	if (DEBUG) {
		console.log("in cbq!");
		console.log('args:');
		console.log(typeof(args))
		// console.log( 'args ' + JSON.stringify(args, null, 4) );
		console.log( args );
	}

	if (DEBUG) {
		console.log('this._cbq:');
		console.log(typeof(this._cbq))
		// console.log( 'args ' + JSON.stringify(args, null, 4) );
		console.log( this._cbq );
	}
	
	if (args) {
		this._cbq.push(args);
	}

	if (DEBUG) {
		console.log( 'CBQ ' + JSON.stringify(this, null, 4) );
		console.log( this._cbq );
		// console.log( 'ADD ' + this );
	}
	
	return this._cbq;
}



callbaq.prototype.current_step = function current_step (args) {
	var self = this;
	
	if (args) {
		this._current_step = args;
	}

	return this._current_step;
}


callbaq.prototype.start = function (...args) {
	var self = this;
	
	this._current_step = 0;
	
	if (DEBUG) {
		console.log( args );
		console.log( 'Start ' + JSON.stringify(this, null, 4) );
	}
	// this.step(this.current_step(), args);
	this.step(this.current_step(), args);
}


/*
 * 
 * name: add
 * @param {Function} step callback - a callback function for the comming step
 * @returns {String} err
 * @returns {Function} handler
 * 
 */
callbaq.prototype.add = function (args) {
	var self = this;
	if (DEBUG) {
		console.log('args:');
		console.log(typeof(args))
		// console.log( 'args ' + JSON.stringify(args, null, 4) );
		console.log( args );
	}

	// this.cbq(AE::cv);
	
	// this._cbq[-2].cb( args[0] );
	this.cbq( args );

	if (DEBUG) {
		console.log( 'ADD ' + JSON.stringify(this, null, 4) );
		// console.log( 'ADD ' + this );
	}
}


callbaq.prototype.next = function (...args) {
	var self = this;

	this.current_step( this.current_step() +1);
	
	if (DEBUG) {
		console.log( 'NEXT ' + JSON.stringify(this, null, 4) );
		console.log('args:');
		console.log(typeof(args))
		// console.log( 'args ' + JSON.stringify(args, null, 4) );
		console.log( args );
	}
	
	this.step(this.current_step(), args);
}


callbaq.prototype.step = function (...args) {
	var self = this;

	if (typeof(args[0]) === 'number') {
		this._current_step = args.shift();
		if (DEBUG) {
			console.warn("Step is number")
		}
	} else {
		throw new Error('input is not a number in step()');
	}
	
	if (DEBUG) {
		console.log( 'STEP ' + JSON.stringify(this, null, 4) );
		console.log('_current_step ' + this._current_step);
		console.log(typeof(this._cbq[this._current_step]));
		console.log('args:');
		console.log(typeof(args))
		// console.log( 'args ' + JSON.stringify(args, null, 4) );
		console.log( args );
	}

	this._cbq[this._current_step]( this, args );
}


callbaq.prototype.last = function (...args) {
	var self = this;
	
	if (DEBUG) {
		console.log( 'LAST ' + JSON.stringify(this, null, 4) );
	}

	return this._cbq[-1];
}


module.exports = callbaq;
