/*
 * callbackQ - Convert nested callback hell into serial procedural coding style, which is more readable, writable, and maintainable.
 *
 * Copyright (c) 2018, BlueT - Matthew Lien - 練喆明
 * 
 * Author: BlueT - Matthew Lien - 練喆明 <BlueT@BlueT.org>
 * First Release Date: 2018-05-11
 */

function callbackQ (...args) {
	var self = this;
	
	this._cbq = [];
	//~ push @cbq, AE::cv;
	this._current_step = 0;
	
	console.log( 'New ' + JSON.stringigy(this, null, 4) ) if DEBUG;
};


callbackQ.prototype.cbq = async function (...args) {
	var self = this;
	
	push @{$self->{'cbq'}}, @_ if @_;
	
	return @{$self->{'cbq'}};
}


callbackQ.prototype.start = async function (...args) {
	var self = this;
	
	this.current_step = 0;
	
	console.log( 'New ' + JSON.stringigy(this, null, 4) ) if DEBUG;
	this.step(this.current_step, args);
}


/*
 * 
 * name: add
 * @param {Function} step callback - a callback function for the comming step
 * @returns {String} err
 * @returns {Function} handler
 * 
 */
callbackQ.prototype.add = async function (...args) {
	var self = this;
	//~ $self->cbq(AE::cv);
	
	console.log( 'ADD ' + JSON.stringigy(this, null, 4) ) if DEBUG;
	
	($self->cbq)[-2]->cb( shift );
}


callbackQ.prototype.next = async function (...args) {
	var self = this;
	this.current_step( this.current_step() +1);
	
	console.log( 'NEXT ' + JSON.stringigy(this, null, 4) ) if DEBUG;
	
	this.step(this.current_step(), args);
}


callbackQ.prototype.step = async function (...args) {
	var self = this;
	typeof(args[0]) === 'int' ? this.current_step(args.shift()) : die 'input is not a number in step()';
	
	console.log( 'STEP ' + JSON.stringigy(this, null, 4) ) if DEBUG;
	
	this.cbq[this._current_step].send( args );
}


callbackQ.prototype.current_step = async function (...args) {
	var self = this;
	
	this._current_step = args[0] if args[0];
	
	return this._current_step;
}


callbackQ.prototype.last = async function (...args) {
	var self = this;
	
	say 'LAST '.Dumper ($self) if DEBUG;
	
	return ($self->cbq)[-1];
}


module.exports = callbackQ;
