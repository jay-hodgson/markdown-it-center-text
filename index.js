// Process -> center text <-

'use strict';

module.exports = function centertext_plugin(md) {

  function tokenize(state, silent) {
    var token,
        max = state.posMax,
        start = state.pos,
        marker = state.src.charCodeAt(start),
        aftermarker = state.src.charCodeAt(start + 1);
    if (start + 3 >= max) { return false; }
    if (silent) { return false; } // don't run any pairs in validation mode

    state.scanDelims(state.pos, true);
    if (marker === 0x2D/* - */ && aftermarker === 0x3E/* > */) {
      // opener
      token         = state.push('text', '', 0);
      token.content = String.fromCharCode(marker);
      state.delimiters.push({
        marker: marker,
        jump:   0,
        token:  state.tokens.length - 1,
        level:  state.level,
        end:    -1,
        open:   true,
        close:  false
      });
    } else if (marker === 0x3C/* < */ && aftermarker === 0x2D/* - */) {
      // closer
      token         = state.push('text', '', 0);
      token.content = String.fromCharCode(aftermarker);
      state.delimiters.push({
        marker: aftermarker,
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
        startDelim,
        endDelim,
        token,
        delimiters = state.delimiters,
        max = state.delimiters.length;

    for (i = 0; i < max; i++) {
      startDelim = delimiters[i];

      if (startDelim.marker !== 0x2D/* - */) {
        continue;
      }

      if (startDelim.end === -1) {
        continue;
      }

      endDelim = delimiters[startDelim.end];

      token         = state.tokens[startDelim.token];
      token.type    = 'centertext_open';
      token.tag     = 'centertext';
      token.nesting = 1;
      token.markup  = '->';
      token.content = '';
      token.attrs = [ [ 'style', 'text-align: center;' ] ];

      token         = state.tokens[endDelim.token];
      token.type    = 'centertext_close';
      token.tag     = 'centertext';
      token.nesting = -1;
      token.markup  = '<-';
      token.content = '';
    }
  }

  md.inline.ruler.before('emphasis', 'centertext', tokenize);
  md.inline.ruler.after('emphasis', 'centertext', postProcess);
};
