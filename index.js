/*
 * callbaq - Convert nested callback hell into serial procedural coding style, which is more readable, writable, and maintainable.
 *
 * Copyright (c) 2018, BlueT - Matthew Lien - 練喆明
 *
 * Author: BlueT - Matthew Lien - 練喆明 <BlueT@BlueT.org>
 * First Release Date: 2018-05-11
 */
/*jshint esversion: 6 */
/* eslint no-console: ["error", { allow: ["warn", "error", "debug"] }] */

const DEBUG = process.env.CALLBAQ_DEBUG;

function callbaq ({ _cbq = [], dataqueue = [], _current_step = 0 } = {}) {
	this._cbq = _cbq;
	this.dataqueue = dataqueue;
	this._current_step = _current_step;

	if (DEBUG) {
		console.debug("New " + JSON.stringify(this, null, 4));
	}

	return this;
}

callbaq.prototype.cbq = function (arg) {
	if (DEBUG) {
		console.debug("in cbq! args: " + typeof arg);
		console.debug(arg);
		console.debug("this._cbq: " + typeof this._cbq);
		console.debug(this._cbq);
	}

	if (arg) {
		if (typeof arg !== "function") {
			console.warn(
				"Adding a non-function object/value into callback queue is unusual and might cause weird bugs. But I don't know what you wanna do, so continue anyway. You are calling with a "
					+ typeof arg
			);
		}
		this._cbq.push(arg);
	}

	if (DEBUG) {
		console.debug("CBQ pushed: ");
		console.debug(this._cbq);
	}

	return this._cbq;
};

callbaq.prototype.current_step = function (arg) {
	if (arg) {
		if (typeof arg !== "number") {
			console.error(
				"Setting current_step() with a non-number object/value is unusual and causing error. You are calling with a "
					+ typeof arg
			);
		} else {
			this._current_step = arg;
		}
	}

	return this._current_step;
};

callbaq.prototype.start = function (...args) {
	this._current_step = 0;

	if (DEBUG) {
		console.debug("Start with " + JSON.stringify(args, null, 4));
	}

	if (args.length > 0) {
		this.dataqueue.unshift(args);
	}

	// return this.step(this.current_step(), ...args);
	if (this._cbq.length > 0) {
		return this.step(this.current_step());
	}
};

/*
 *
 * name: add
 * @param {Function} step callback - a callback function for the coming step
 * @returns {String} err
 * @returns {Function} handler
 *
 */
callbaq.prototype.add = function _add (arg) {
	if (DEBUG) {
		console.debug("Calling add() with args: " + typeof arg);
		console.debug(arg);
	}

	let order = this.cbq(arg).length - 1;

	if (DEBUG) {
		console.debug("ADDED " + JSON.stringify(this, null, 4));
	}

	if (this.dataqueue.length > 0) {
		return this.step(order);
	}
};

callbaq.prototype.then = callbaq.prototype.add;

callbaq.prototype.next = function _next (...args) {
	if (DEBUG) {
		console.debug("NEXT " + JSON.stringify(this, null, 4));
		console.debug("args: " + typeof args);
		console.debug(args);
	}

	if (args.length > 0 || this.dataqueue.length === 0) {
		this.dataqueue.unshift(args);
	}

	if (this._cbq[this.current_step() + 1]) {
		this.current_step(this.current_step() + 1);
		return this.step(this.current_step());
	}
};

callbaq.prototype.resolve = callbaq.prototype.next;

callbaq.prototype.step = function (step, ...args) {
	if (typeof step === "undefined") {
		step = this._current_step;
	}

	if (typeof step === "number") {
		this._current_step = step;

		if (DEBUG) {
			console.debug("Step is number");
		}
	} else {
		throw new Error("First argument for step() must be a 'number'. Current input is a " + typeof step);
	}

	if (DEBUG) {
		console.debug("STEP " + JSON.stringify(this, null, 4));
		console.debug(
			"_current_step: " + this._current_step + " Type: " + typeof this._cbq[this._current_step]
		);
		console.debug("args: " + typeof args);
		console.debug(args);
	}

	if (this._cbq[this.current_step()]) {
		if (args.length <= 0 && this.dataqueue.length > 0) {
			args = [this.dataqueue.shift()];
		}

		return this._cbq[this.current_step()](this, ...args);
	}
};

callbaq.prototype.last = function (...args) {
	if (DEBUG) {
		console.debug("LAST " + JSON.stringify(this, null, 4));
	}

	return this._cbq[-1];
};

module.exports = callbaq;
