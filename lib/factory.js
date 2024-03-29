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

var setReadOnly = require( '@stdlib/utils-define-nonenumerable-read-only-property' );
var setReadOnlyAccessor = require( '@stdlib/utils-define-nonenumerable-read-only-accessor' );
var setReadWriteAccessor = require( '@stdlib/utils-define-nonenumerable-read-write-accessor' );
var hasOwnProp = require( '@stdlib/assert-has-own-property' );
var isObject = require( '@stdlib/assert-is-plain-object' );
var isUint32Array = require( '@stdlib/assert-is-uint32array' );
var isBoolean = require( '@stdlib/assert-is-boolean' ).isPrimitive;
var isFunction = require( '@stdlib/assert-is-function' );
var constantFunction = require( '@stdlib/utils-constant-function' );
var noop = require( '@stdlib/utils-noop' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var poisson = require( '@stdlib/random-base-poisson' ).factory;
var gamma = require( '@stdlib/random-base-gamma' ).factory;
var gcopy = require( '@stdlib/blas-base-gcopy' );
var Uint32Array = require( '@stdlib/array-uint32' );
var assign = require( '@stdlib/object-assign' );
var typedarray2json = require( '@stdlib/array-to-json' );
var format = require( '@stdlib/string-format' );
var validate = require( './validate.js' );


// MAIN //

/**
* Returns a pseudorandom number generator for generating negative binomial distributed random numbers.
*
* @param {PositiveNumber} [r] - number of successes until experiment is stopped
* @param {number} [p] - success probability
* @param {Options} [options] - function options
* @param {PRNG} [options.prng] - pseudorandom number generator which generates uniformly distributed pseudorandom numbers
* @param {PRNGSeedMT19937} [options.seed] - pseudorandom number generator seed
* @param {PRNGStateMT19937} [options.state] - pseudorandom number generator state
* @param {boolean} [options.copy=true] - boolean indicating whether to copy a provided pseudorandom number generator state
* @throws {TypeError} `r` must be a positive number
* @throws {TypeError} `p` must be number
* @throws {RangeError} `p` must be a number on the interval `(0,1)`
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {Error} must provide a valid state
* @returns {PRNG} pseudorandom number generator
*
* @example
* var negativeBinomial = factory( 10, 0.5 );
*
* var v = negativeBinomial();
* // returns <number>
*
* @example
* var negativeBinomial = factory( 10, 0.8, {
*     'seed': 297
* });
*
* var v = negativeBinomial();
* // returns <number>
*
* @example
* var negativeBinomial = factory();
*
* var v = negativeBinomial( 10, 0.5 );
* // returns <number>
*/
function factory() {
	var rgamma;
	var STATE;
	var rpois;
	var opts;
	var prng;
	var rand;
	var FLG;
	var err;
	var p;
	var r;

	FLG = true;
	if ( arguments.length === 0 ) {
		opts = {
			'copy': false
		};
		rpois = poisson( opts );
	} else if ( arguments.length === 1 ) {
		opts = arguments[ 0 ];
		if ( !isObject( opts ) ) {
			throw new TypeError( format( 'invalid argument. Options argument must be an object. Value: `%s`.', opts ) );
		}
		if ( hasOwnProp( opts, 'copy' ) && !isBoolean( opts.copy ) ) {
			throw new TypeError( format( 'invalid option. `%s` option must be a boolean. Option: `%s`.', 'copy', opts.copy ) );
		}
		if ( hasOwnProp( opts, 'prng' ) ) {
			if ( !isFunction( opts.prng ) ) {
				throw new TypeError( format( 'invalid option. `%s` option must be a pseudorandom number generator function. Option: `%s`.', 'prng', opts.prng ) );
			}
			rpois = poisson({
				'prng': opts.prng
			});
		} else {
			if ( hasOwnProp( opts, 'state' ) && !isUint32Array( opts.state ) ) {
				throw new TypeError( format( 'invalid option. `%s` option must be a Uint32Array. Option: `%s`.', 'state', opts.state ) );
			}
			opts = assign( {}, opts );
			if ( opts.copy === false ) {
				FLG = false;
			} else if ( opts.state ) {
				opts.state = gcopy( opts.state.length, opts.state, 1, new Uint32Array( opts.state.length ), 1 ); // eslint-disable-line max-len
			}
			opts.copy = false;
			rpois = poisson( opts );
		}
	} else {
		r = arguments[ 0 ];
		p = arguments[ 1 ];
		err = validate( r, p );
		if ( err ) {
			throw err;
		}
		if ( arguments.length > 2 ) {
			opts = arguments[ 2 ];
			if ( !isObject( opts ) ) {
				throw new TypeError( format( 'invalid argument. Options argument must be an object. Value: `%s`.', opts ) );
			}
			if ( hasOwnProp( opts, 'copy' ) && !isBoolean( opts.copy ) ) {
				throw new TypeError( format( 'invalid option. `%s` option must be a boolean. Option: `%s`.', 'copy', opts.copy ) );
			}
			if ( hasOwnProp( opts, 'prng' ) ) {
				if ( !isFunction( opts.prng ) ) {
					throw new TypeError( format( 'invalid option. `%s` option must be a pseudorandom number generator function. Option: `%s`.', 'prng', opts.prng ) );
				}
				rpois = poisson({
					'prng': opts.prng
				});
			} else {
				if ( hasOwnProp( opts, 'state' ) && !isUint32Array( opts.state ) ) {
					throw new TypeError( format( 'invalid option. `%s` option must be a Uint32Array. Option: `%s`.', 'state', opts.state ) );
				}
				opts = assign( {}, opts );
				if ( opts.copy === false ) {
					FLG = false;
				} else if ( opts.state ) {
					opts.state = gcopy( opts.state.length, opts.state, 1, new Uint32Array( opts.state.length ), 1 ); // eslint-disable-line max-len
				}
				opts.copy = false;
				rpois = poisson( opts );
			}
		} else {
			opts = {
				'copy': false
			};
			rpois = poisson( opts );
		}
	}
	if ( opts && opts.prng ) {
		if ( r === void 0 ) {
			rgamma = gamma({
				'prng': opts.prng
			});
		} else {
			rgamma = gamma( r, p/(1-p), {
				'prng': opts.prng
			});
		}
	} else {
		if ( opts.state ) {
			STATE = opts.state;
		} else {
			STATE = rpois.state;
			rpois.state = STATE; // updates the underlying PRNG to point to a shared state
		}
		if ( r === void 0 ) {
			rgamma = gamma({
				'state': STATE,
				'copy': false
			});
		} else {
			rgamma = gamma( r, p/(1-p), {
				'state': STATE,
				'copy': false
			});
		}
	}
	if ( r === void 0 ) {
		prng = negativeBinomial2;
	} else {
		prng = negativeBinomial1;
	}
	rand = rpois.PRNG;

	setReadOnly( prng, 'NAME', 'negative-binomial' );

	// If we are provided an "external" PRNG, we don't support getting or setting PRNG state, as we'd need to check for compatible state value types, etc, entailing considerable complexity.
	if ( opts && opts.prng ) {
		setReadOnly( prng, 'seed', null );
		setReadOnly( prng, 'seedLength', null );
		setReadWriteAccessor( prng, 'state', constantFunction( null ), noop );
		setReadOnly( prng, 'stateLength', null );
		setReadOnly( prng, 'byteLength', null );
		setReadOnly( prng, 'toJSON', constantFunction( null ) );
	} else {
		setReadOnlyAccessor( prng, 'seed', getSeed );
		setReadOnlyAccessor( prng, 'seedLength', getSeedLength );
		setReadWriteAccessor( prng, 'state', getState, setState );
		setReadOnlyAccessor( prng, 'stateLength', getStateLength );
		setReadOnlyAccessor( prng, 'byteLength', getStateSize );
		setReadOnly( prng, 'toJSON', toJSON );
	}
	setReadOnly( prng, 'PRNG', rand );
	return prng;

	/**
	* Returns the PRNG seed.
	*
	* @private
	* @returns {PRNGSeedMT19937} seed
	*/
	function getSeed() {
		return rand.seed;
	}

	/**
	* Returns the PRNG seed length.
	*
	* @private
	* @returns {PositiveInteger} seed length
	*/
	function getSeedLength() {
		return rand.seedLength;
	}

	/**
	* Returns the PRNG state length.
	*
	* @private
	* @returns {PositiveInteger} state length
	*/
	function getStateLength() {
		return rand.stateLength;
	}

	/**
	* Returns the PRNG state size (in bytes).
	*
	* @private
	* @returns {PositiveInteger} state size (in bytes)
	*/
	function getStateSize() {
		return rand.byteLength;
	}

	/**
	* Returns the current pseudorandom number generator state.
	*
	* @private
	* @returns {PRNGStateMT19937} current state
	*/
	function getState() {
		return rand.state;
	}

	/**
	* Sets the pseudorandom number generator state.
	*
	* @private
	* @param {PRNGStateMT19937} s - generator state
	* @throws {TypeError} must provide a `Uint32Array`
	* @throws {Error} must provide a valid state
	*/
	function setState( s ) {
		if ( !isUint32Array( s ) ) {
			throw new TypeError( format( 'invalid argument. Must provide a Uint32Array. Value: `%s`.', s ) );
		}
		if ( FLG ) {
			s = gcopy( s.length, s, 1, new Uint32Array( s.length ), 1 );
		}
		rand.state = s;
	}

	/**
	* Serializes the pseudorandom number generator as a JSON object.
	*
	* ## Notes
	*
	* -   `JSON.stringify()` implicitly calls this method when stringifying a PRNG.
	*
	* @private
	* @returns {Object} JSON representation
	*/
	function toJSON() {
		var out = {};
		out.type = 'PRNG';
		out.name = prng.NAME;
		out.state = typedarray2json( rand.state );
		if ( r === void 0 ) {
			out.params = [];
		} else {
			out.params = [ r, p ];
		}
		return out;
	}

	/**
	* Returns a pseudorandom number drawn from a negative binomial distribution with bound parameters `r` and `p`.
	*
	* @private
	* @returns {NonNegativeInteger} pseudorandom number
	*
	* @example
	* var v = negativeBinomial1();
	* // returns <number>
	*/
	function negativeBinomial1() {
		return rpois( rgamma() );
	}

	/**
	* Returns a pseudorandom number drawn from a negative binomial distribution with parameters `r` and `p`.
	*
	* @private
	* @param {PositiveNumber} r - number of successes until experiment is stopped
	* @param {number} p - success probability
	* @returns {NonNegativeInteger} pseudorandom number
	*
	* @example
	* var v = negativeBinomial2( 10, 0.5 );
	* // returns <number>
	*/
	function negativeBinomial2( r, p ) {
		if (
			isnan( r ) ||
			isnan( p ) ||
			p <= 0.0 ||
			p >= 1.0
		) {
			return NaN;
		}
		return rpois( rgamma( r, p/(1-p) ) );
	}
}


// EXPORTS //

module.exports = factory;
