// TODO(gdi2290): switch to DLLs

// Polyfills

// import 'ie-shim'; // Internet Explorer 9 support
import 'angular2-universal-polyfills';



// Typescript emit helpers polyfill
import 'ts-helpers';

if ('production' === process.env.NODE_ENV) {
  // Production


} else {
  // Development

  Error.stackTraceLimit = Infinity;

  require('zone.js/dist/long-stack-trace-zone');

}
