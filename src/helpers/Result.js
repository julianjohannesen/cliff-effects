/**
* All benefit programs' return value should be an instance of this class.
*
* @external
*
* @class
* @param {object} trial - Data to try out/validate
* @param {string} trial.result - valid values: 'good', 'information', 'warning'.
* @param {string} trial.details - Explanation to user of results that will be seen.
* Example: 'Your income is x% of the FPL. Your benefit could go down.'
* @param {number} trial.benefitValue - Monthly subsidy this benefit will provide.
* @param {object} [trial.data] - Any other necessary information.
*
* @example
* const getMyProgramBenefits = function ( client ) {
*   var myData = { result: 'good', details: 'All good!', benefitValue: 500 };
*   return new Result( myData );
* };
*/
class Result {

    constructor ( trial ) {

      let errorMessage = checkTypes( trial );
      /** Check the 2nd line of your error stack to find issue */
      if ( errorMessage.length > 0 ) { throw new Error( errorMessage ) }

      let result = this;
      result.result       = trial.result;
      result.details      = trial.details;
      result.benefitValue = trial.benefitValue;
      result.data         = trial.data;
    }
  };

/**
* @todo @param {object} [trial.expirationDate] - A `Date` object. If date has
* passed, provides a flag to app devs.
* @todo Implement `.expirationDate` to keep track of data that needs updating
* @todo Figure out how to access this jsdoc definition externally.
* @todo Change name of `.result` to `.status` or discuss other names.
* @todo Change valid values of `.result` to 'good', 'warning', and
* 'bad'/'lost'. Discuss possibility of only the two former values.
* @todo Should the `.details` value be allowed to have a value of `undefined`
* or `null`?
*/

  // ========================================
  // (IGNORE) VALIDATION OF RESULT PROPERTIES
  // ========================================

  /** @todo Add function description */
  const checkTypes = function ( data ) {

    /** @todo Is there a way to loop through to do this? I attempted
    * it with a 'types' object to check types, but type tests aren't
    * enough. For example, `expirationDate` needs to be tested for
    * `instanceof Date`. */
    var invalid       = [],
        result        = data.result,
        benefitValue  = data.benefitValue,
        details       = data.details;  // Should this be allowed to be undefined?
      // , date   = data.expirationDate;

    if ( typeof pushUndefined( 'result', result, invalid ) !== 'string' ) {
      if ( typeof result !== 'string' ) {
        invalid.push( 'The value of `result` was type of ' + (typeof result) + ' instead of "string".' );
      }
    }

    if ( typeof pushUndefined( 'details', details, invalid ) !== 'string' ) {
      if ( typeof details !== 'string' ) {
        invalid.push( 'The value of `details` was type of ' + (typeof details) + ' instead of "string".' );
      }
    }

    if ( typeof pushUndefined( 'benefitValue', benefitValue, invalid ) !== 'string' ) {
      if ( typeof benefitValue !== 'number' ) {
        invalid.push( 'The value of `benefitValue` was type of ' + (typeof benefitValue) + ' instead of "number".' );
      }
    }

    // if ( typeof pushUndefined( 'expirationDate', date, invalid ) !== 'string' ) {
    //  if ( !( date instanceof Date ) ) {
    //    invalid.push( 'The value of `expirationDate` was not an instance of `Date`.' );
    //  }
    // }

    var error = invalid.join( ' ' );  // empty array returns a string

    return error;
  }


  /** @todo Add function description */
  const pushUndefined = function ( key, val, invalidArray ) {

    var error = null
    if ( val === undefined ) {
      error = 'The value of `' + key + '` is not allowed to be `undefined`.'
      invalidArray.push( error );
    }
    return error;
  };  // End pushUndefined()


  export { Result }
