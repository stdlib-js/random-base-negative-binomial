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

var bench = require( '@stdlib/bench-harness' );
var randu = require( '@stdlib/random-base-randu' );
var ceil = require( '@stdlib/math-base-special-ceil' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var EPS = require( '@stdlib/constants-float64-eps' );
var pkg = require( './../package.json' ).name;
var negativeBinomial = require( './../lib' );


// MAIN //

bench( pkg, function benchmark( b ) {
	var r;
	var p;
	var z;
	var i;

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		r = ceil( randu()*100.0 );
		p = randu();
		if ( p === 0.0 ) {
			p += EPS;
		}
		z = negativeBinomial( r, p );
		if ( isnan( z ) ) {
			b.fail( 'should not return NaN' );
		}
	}
	b.toc();
	if ( isnan( z ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+'::factory', function benchmark( b ) {
	var rand;
	var r;
	var p;
	var z;
	var i;

	r = 100;
	p = 0.74321;
	rand = negativeBinomial.factory( r, p );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		z = rand();
		if ( isnan( z ) ) {
			b.fail( 'should not return NaN' );
		}
	}
	b.toc();
	if ( isnan( z ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+'::factory,arguments', function benchmark( b ) {
	var rand;
	var r;
	var p;
	var z;
	var i;

	r = 100;
	p = 0.74321;
	rand = negativeBinomial.factory();

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		z = rand( r, p );
		if ( isnan( z ) ) {
			b.fail( 'should not return NaN' );
		}
	}
	b.toc();
	if ( isnan( z ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});
