/*! markdown-it-center-text 1.0.4 https://github.com/jay-hodgson/markdown-it-center-text @license MIT */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownitCentertext = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Process -> center text <-

'use strict';

module.exports = function centertext_plugin(md) {

  function tokenize(state, silent) {
    var token,
        max = state.posMax,
        start = state.pos,
        marker = state.src.charCodeAt(start);
    if (start + 1 > max) { return false; }
    if (silent) { return false; } // don't run any pairs in validation mode

    if (marker === 45/* - */ &&
      state.src.charCodeAt(start + 1) === 62/* > */
      ) {
      state.scanDelims(state.pos, true);
      token         = state.push('text', '', 0);
      token.content = '->';
      state.delimiters.push({
        marker: token.content,
        jump:   0,
        token:  state.tokens.length - 1,
        level:  state.level,
        end:    -1,
        open:   true,
        close:  false
      });
    } else if (marker === 60/* < */ &&
      state.src.charCodeAt(start + 1) === 45/* - */
      ) {
      // found the close marker
      state.scanDelims(state.pos, true);
      token         = state.push('text', '', 0);
      token.content = '<-';
      state.delimiters.push({
        marker: token.content,
        jump:   0,
        token:  state.tokens.length - 1,
        level:  state.level,
        end:    -1,
        open:   false,
        close:  true
      });
    } else {
      // neither
      return false;
    }

    state.pos += 2;

    return true;
  }


  // Walk through delimiter list and replace text tokens with tags
  //
  function postProcess(state) {
    var i,
        foundStart = false,
        foundEnd = false,
        delim,
        token,
        delimiters = state.delimiters,
        max = state.delimiters.length;

    for (i = 0; i < max; i++) {
      delim = delimiters[i];
      if (delim.marker === '->') {
        foundStart = true;
      } else if (delim.marker === '<-') {
        foundEnd = true;
      }
    }
    if (foundStart && foundEnd) {
      for (i = 0; i < max; i++) {
        delim = delimiters[i];

        if (delim.marker === '->') {
          foundStart = true;
          token         = state.tokens[delim.token];
          token.type    = 'centertext_open';
          token.tag     = 'div';
          token.nesting = 1;
          token.markup  = '->';
          token.content = '';
          token.attrs = [ [ 'class', 'text-align-center' ] ];
        } else if (delim.marker === '<-') {
          if (foundStart) {
            token         = state.tokens[delim.token];
            token.type    = 'centertext_close';
            token.tag     = 'div';
            token.nesting = -1;
            token.markup  = '<-';
            token.content = '';
          }
        }
      }
    }
  }

  md.inline.ruler.before('emphasis', 'centertext', tokenize);
  md.inline.ruler2.before('emphasis', 'centertext', postProcess);
};

},{}]},{},[1])(1)
});