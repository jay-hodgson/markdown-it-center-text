// Process -> center text <-

'use strict';

// same as UNESCAPE_MD_RE plus a space
var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

function centertext(state, silent) {
  var found,
      content,
      token,
      max = state.posMax,
      start = state.pos;
  if (start + 3 >= max) { return false; }
  if (state.src.charCodeAt(start) !== 0x2D/* - */) { return false; }
  if (state.src.charCodeAt(start + 1) !== 0x3E/* > */) { return false; }
  if (silent) { return false; } // don't run any pairs in validation mode

  state.pos = start + 2;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x3C/* < */ && state.src.charCodeAt(state.pos + 1) === 0x2D/* - */) {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || start + 2 === state.pos) {
    state.pos = start;
    return false;
  }

  content = state.src.slice(start + 2, state.pos);

  // don't allow unescaped newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\n/)) {
    state.pos = start;
    return false;
  }

  // found
  state.posMax = state.pos;
  state.pos = start + 2;

  // Earlier we checked !silent, but this implementation does not need it
  token         = state.push('centertext_open', 'span', 1);
  token.markup  = '->';
  token.attrs = [ [ 'style', 'text-align: center;' ] ];

  token         = state.push('text', '', 0);
  token.content = content.replace(UNESCAPE_RE, '$1');

  token         = state.push('centertext_close', 'span', -1);
  token.markup  = '<-';

  state.pos = state.posMax + 2;
  state.posMax = max;
  return true;
}


module.exports = function centertext_plugin(md) {
  md.inline.ruler.after('emphasis', 'centertext', centertext);
};
