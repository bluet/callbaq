/*
 * callbaq - Convert nested callback hell into serial procedural coding style, which is more readable, writable, and maintainable.
 *
 * Copyright (c) 2018, BlueT - Matthew Lien - 練喆明
 * 
 * Author: BlueT - Matthew Lien - 練喆明 <BlueT@BlueT.org>
 * First Release Date: 2018-05-11
 */

DEBUG = 0;

function callbaq ({_cbq = [], _current_step = 0} = {}) {
	var self = this;
	
	this._cbq = _cbq;
	//~ push @cbq, AE::cv;
	this._current_step = _current_step;
	
	if (DEBUG) {
		console.debug( 'New ' + JSON.stringify(this, null, 4) );
	}
};


callbaq.prototype.cbq = function (arg) {
	var self = this;

	if (DEBUG) {
		console.debug('in cbq! args: ' + typeof(arg));
		console.debug( arg );
		console.debug('this._cbq: ' + typeof(this._cbq));
		console.debug( this._cbq );
	}
	
	if (arg) {
		if (typeof arg !== 'function') {
			console.warn("Adding a non-function object/value into callback queue is unusual and might cause weird bugs. But I don't know what you wanna do, so continue anyway.\n" + typeof(arg) )
		}
		this._cbq.push(arg);
	}

	if (DEBUG) {
		console.debug('CBQ pushed: ');
		console.debug( this._cbq );
	}
	
	return this._cbq;
}



callbaq.prototype.current_step = function current_step (arg) {
	var self = this;
	
	if (arg) {
		this._current_step = arg;
	}

	return this._current_step;
}


callbaq.prototype.start = function (...args) {
	var self = this;
	this._current_step = 0;
	
	if (DEBUG) {
		console.debug( 'Start ' + JSON.stringify(args, null, 4) );
	}
	
	this.step(this.current_step(), ...args);
}


/*
 * 
 * name: add
 * @param {Function} step callback - a callback function for the comming step
 * @returns {String} err
 * @returns {Function} handler
 * 
 */
callbaq.prototype.add = function (arg) {
	var self = this;
	if (DEBUG) {
		console.debug('args:');
		console.debug(typeof(arg))
		// console.debug( 'args ' + JSON.stringify(args, null, 4) );
		console.debug( arg );
	}

	// this.cbq(AE::cv);
	
	// this._cbq[-2].cb( args[0] );
	this.cbq( arg );

	if (DEBUG) {
		console.debug( 'ADD ' + JSON.stringify(this, null, 4) );
		// console.debug( 'ADD ' + this );
	}
}


callbaq.prototype.next = function (...args) {
	var self = this;

	this.current_step( this.current_step() +1);
	
	if (DEBUG) {
		console.debug( 'NEXT ' + JSON.stringify(this, null, 4) );
		console.debug('args:');
		console.debug(typeof(args[0]))
		// console.debug( 'args ' + JSON.stringify(args, null, 4) );
		console.debug( args[0] );
	}
	
	this.step(this.current_step(), ...args);
}


callbaq.prototype.step = function (step, ...args) {
	var self = this;

	// console.debug(args)

	if (typeof(step) === 'number') {
		this._current_step = step;
		if (DEBUG) {
			console.debug("Step is number")
		}
	} else {
		throw new Error("First argument for step() must be a 'number'. Current input is a " + typeof(step));
	}
	
	if (DEBUG) {
		console.debug( 'STEP ' + JSON.stringify(this, null, 4) );
		console.debug('_current_step ' + this._current_step);
		console.debug(typeof(this._cbq[this._current_step]));
		console.debug('args:');
		console.debug(typeof(args))
		// console.debug( 'args ' + JSON.stringify(args, null, 4) );
		console.debug( args );
	}

	this._cbq[this.current_step()]( this, ...args );
}


callbaq.prototype.last = function (...args) {
	var self = this;
	
	if (DEBUG) {
		console.debug( 'LAST ' + JSON.stringify(this, null, 4) );
	}

	return this._cbq[-1];
}


module.exports = callbaq;
