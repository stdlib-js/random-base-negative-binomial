/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var uniform = require( '@stdlib/random-base-uniform' ).factory;
var round = require( '@stdlib/math-base-special-round' );
var isNonNegativeInteger = require( '@stdlib/math-base-assert-is-nonnegative-integer' );
var isUint32Array = require( '@stdlib/assert-is-uint32array' );
var negativeBinomial = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof negativeBinomial, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a method to generate pseudorandom number generators', function test( t ) {
	t.equal( typeof negativeBinomial.factory, 'function', 'has method' );
	t.end();
});

tape( 'attached to the main export is a method to serialize a pseudorandom number generator as JSON', function test( t ) {
	t.equal( typeof negativeBinomial.toJSON, 'function', 'has method' );
	t.end();
});

tape( 'attached to the main export is the underlying PRNG', function test( t ) {
	t.equal( typeof negativeBinomial.PRNG, 'function', 'has property' );
	t.end();
});

tape( 'attached to the main export is the generator name', function test( t ) {
	t.equal( negativeBinomial.NAME, 'negative-binomial', 'has property' );
	t.end();
});

tape( 'attached to the main export is the generator seed', function test( t ) {
	t.equal( isUint32Array( negativeBinomial.seed ), true, 'has property' );
	t.end();
});

tape( 'attached to the main export is the generator seed length', function test( t ) {
	t.equal( typeof negativeBinomial.seedLength, 'number', 'has property' );
	t.end();
});

tape( 'attached to the main export is the generator state', function test( t ) {
	t.equal( isUint32Array( negativeBinomial.state ), true, 'has property' );
	t.end();
});

tape( 'attached to the main export is the generator state length', function test( t ) {
	t.equal( typeof negativeBinomial.stateLength, 'number', 'has property' );
	t.end();
});

tape( 'attached to the main export is the generator state size', function test( t ) {
	t.equal( typeof negativeBinomial.byteLength, 'number', 'has property' );
	t.end();
});

tape( 'the function returns pseudorandom numbers', function test( t ) {
	var runif;
	var val;
	var p;
	var r;
	var i;

	runif = uniform({
		'seed': 3893
	});
	for ( i = 0; i < 1e2; i++ ) {
		r = round( runif( 0.0, 100 ) + 0.5 );
		p = runif( 0.0001, 0.9999 );
		val = negativeBinomial( r, p );
		t.strictEqual( isNonNegativeInteger( val ), true, 'NegativeBinomial('+r+','+p+') => '+val );
	}
	t.end();
});

tape( 'the function supports setting the generator state', function test( t ) {
	var state;
	var arr;
	var i;

	// Move to a future state...
	for ( i = 0; i < 100; i++ ) {
		negativeBinomial( 100, 0.75 );
	}
	// Capture the current state:
	state = negativeBinomial.state;

	// Move to a future state...
	arr = [];
	for ( i = 0; i < 100; i++ ) {
		arr.push( negativeBinomial( 100, 0.75 ) );
	}
	// Set the state:
	negativeBinomial.state = state;

	// Replay previously generated values...
	for ( i = 0; i < 100; i++ ) {
		t.equal( negativeBinomial( 100, 0.75 ), arr[ i ], 'returns expected value. i: '+i+'.' );
	}
	t.end();
});
