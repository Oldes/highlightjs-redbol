/*
 * Language: Rebol (and Red)
 * Category: common, scripting
 * Source: https://github.com/oldes/highlightjs-redbol
 * Version: 2.1.2
 * Contributors:
 *   Oldes <oldes.huhuman@gmail.com>
 */

/** @type LanguageFn */
function redbol(hljs) {
  const LEX_DELIMIT = '\\s\\n\\[\\]\\(\\)\\"{}/;';
  const LEX_DELIMIT2 = '\\s\\n\\[\\]\\(\\)\\"{};'; // without /
  const LOOK_BEHIND_DELIMIT = '(?<=^|['+ LEX_DELIMIT +'])';
  const LOOK_AHEAD_DELIMIT  = '(?=$|['+ LEX_DELIMIT +'])';
  const NOT_DELIMIT = '[^'+ LEX_DELIMIT +']+';

  const ANY_WORD = {
  //  className: 'literal',
    begin: LOOK_BEHIND_DELIMIT+NOT_DELIMIT,
  }

  const CHAR_INLINE = {
    className: 'subst',
    begin: '\\^(\\(([0-9a-fA-F]+|del|tab)\\)|.)',
  };
  const CHAR = {
    className: 'char',
    begin: '#"',
    end: '"',
    contains: [
      CHAR_INLINE
    ]
  };

  const STRING = {
    className: 'string',
    illegal: '\\n',
    variants: [
      {begin: '"', end: '"'},
      {begin: '%"', end: '"'} //file with spaces
    ],
    contains: [
      CHAR_INLINE
    ]
  };
  const STRING_MULTILINE = {
    className: 'string',
    begin: '{', end: '}',
    contains: [CHAR_INLINE]
  }

  const STRING_RAW_1 = {
    className: 'string',
    begin: '%{', end: '}%'
  }
  const STRING_RAW_2 = {
    className: 'string',
    begin: '%%{', end: '}%%',
    contains: [STRING_RAW_1]
  }
  const STRING_RAW_3 = {
    className: 'string',
    begin: '%%%{', end: '}%%%',
    contains: [STRING_RAW_2, STRING_RAW_1]
  }
  const STRING_RAW_4 = {
    className: 'string',
    begin: '%%%%{', end: '}%%%%',
    contains: [STRING_RAW_3, STRING_RAW_2, STRING_RAW_1]
  }

  const TAG = {
    className: 'string',
    begin: '<', end: '>',
    illegal: '\\n',
  };
  const FILE_QUOTED = {
    className: 'string',
    illegal: '\\n',
    begin: '%"', end: '"',
    contains: [CHAR_INLINE]
  };
  const FILE = {
    className: 'string',
    begin: '%[^\\s\\n\\[\\]\\(\\)]+'
  };
  const EMAIL = {
    className: 'string',
    begin: '[^\\s\\n:/\\[\\]\\(\\)]+@[^\\s\\n:/\\[\\]\\(\\)]+'
  };
  const URL = {
    className: 'string',
    begin: LOOK_BEHIND_DELIMIT+'[^'+LEX_DELIMIT2+':\\d]+:[^'+LEX_DELIMIT2+']+'
  };

  
  const COMMENT1 = {
    className: 'doctag',
    begin: ';[-@].*',
    illegal: '\\n'
  };
  const COMMENT2 = {
    className: 'comment',
    begin: ';.*',
    illegal: '\\n'
  };
//  const COMMENT_SPECIAL = {
//    className: 'comment',
//    begin: '\\s: ', end: '\\n',
//    //contains: [hljs.C_NUMBER_MODE]
//  };
  const COMMENT_PROMPT = {
    className: 'doctag',
    begin: /^(>>|red>>)/,
    //contains: [hljs.C_NUMBER_MODE]
  };
  const COMMENT_ERROR = {
    className: 'doctag',
    begin: /^[\*]{2}[\*]*\s/, end: /\n/,
    //contains: [hljs.C_NUMBER_MODE]
  };

  const BRACKET = {
    className: 'regexp',
    begin: /(\[|\]|\(|\))+|\#\(|\#\[|\|/   //colors also start of serialized values and maps
  };

  const BIN2 = {
    className: 'string',
    begin: '\\s*(([01]\\s*){8})+'
  };
  const BIN16 = {
    className: 'string',
    begin: '\\s*([0-9a-fA-F]{2,2}\\s*)+'
  };

  const BINARY64 = {
    className: 'string',
    begin: '64#\\{[0-9a-zA-Z+/=\\s]*\\}'
  };
  const BINARY16 = {
    className: 'string',
    begin: '(16)?#\\{', end: '\\}',
    contains: [COMMENT1, COMMENT2, BIN16]
  };
  const BINARY2 = {
    className: 'string',
    begin: '2#\\{', end: '\\}',
    contains: [COMMENT1, COMMENT2, BIN2]
  };

  const NUMBER_BIN = {
    className: 'number',
    variants: [
      {begin: '(0|16)#[0-9a-fA-F]+'},
      {begin: '2#[01]+'},
      {begin: '8#[0-7]+'},
      {begin: '10#[0-9]+'},
    ], 
  };

  const DECIMAL_RE = '[-+]?(1\\.#INF|1\\.#NaN)|[-+]?(?:\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?';

  const NUMBER_DECIMAL = {
    className: 'number',
    begin: '\\b'+DECIMAL_RE
  };

  const NUMBER_MONEY = {
    className: 'number',
    begin: '[+-]?([a-zA-Z]{3})?\\$[-+]?(?:\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?'
  };

  const PAIR = {
    className: 'number',
    begin: '(' + DECIMAL_RE + ')x(' + DECIMAL_RE + ')'
  };
  const DATE = {
    className: 'number',
    begin: '\\d{1,2}\\-([A-Za-z]{3}|January|Febuary|March|April|May|June|July|August|September|October|November|December)\\-\\d{4}(/\\d{1,2}[:]\\d{1,2}([:]\\d{1,2}(\\.\\d{1,5})?)?([+-]\\d{1,2}[:]\\d{1,2})?)?'
  }
  const TIME = {
    className: 'number',
    begin: /([-+]?\d{0,5}([:]\d{1,9}){1,2}([.,]\d{0,9})?(am|pm)?)(?!\w)/
  };
  const TUPLE_IVALID = {
    className: 'emphasis',
    begin: /(\.\d{1,3})+/
  };
  const TUPLE = {
    className: 'number',
    begin: '(\\d{0,3}[.]\\d{0,3}[.]\\d{0,3})([.]\\d{1,3}){0,9}',
    contains: [TUPLE_IVALID]
  };
  
  const SET_WORD = {
    className: 'variable',
    begin: LOOK_BEHIND_DELIMIT+NOT_DELIMIT+":",
  };
  const GET_WORD = {
    className: 'variable',
    begin: LOOK_BEHIND_DELIMIT+':'+NOT_DELIMIT,
  };
  
  const LIT_WORD = {
    className: 'section',
    begin: LOOK_BEHIND_DELIMIT+"'"+NOT_DELIMIT,
  };
  const REFINEMENT = {
    className: 'section',
    begin: '[/@]'+NOT_DELIMIT, // sharing refinement and ref datatypes!
  }
  const ISSUE = {
    className: 'string',
    begin: '#'+NOT_DELIMIT,
  };

  const DATATYPE = {
    className: 'type',
    begin: LOOK_BEHIND_DELIMIT+NOT_DELIMIT+"[!?]"+LOOK_AHEAD_DELIMIT,
  };
  const OPERATOR = {
    className: 'operator',
    begin: LOOK_BEHIND_DELIMIT
      +'(==|!==|!=|<=|>=|=?|<>|<|>|>>|>>>|<<|\\+\\+|\\+|\\-\\-|\\-|=|\\*|%|&|\\/\\/|\\/|and|or|xor|!|not)'
      +LOOK_AHEAD_DELIMIT,
  };
  const LITERAL = {
    className: 'literal',
    begin: LOOK_BEHIND_DELIMIT+'(true|false|on|off|none)'+LOOK_AHEAD_DELIMIT,
  };
  const KEYWORD = {
    className: 'keyword',
    begin: LOOK_BEHIND_DELIMIT
     +'(if|either|unless|any|all|quit|return|exit|continue|break|try|catch|throw|make|to|as|set|print|prin|probe|'
     +'for|foreach|forall|forever|forskip|until|do|while|case|loop|repeat|switch|opt|some|thru|select|pick|poke|reverse|'
     +'put|extend|append|repend|reduce|reform|rejoin|join|ajoin|copy|binary|transcode|reject|skip|end|'
     +'load|read|write|open|close|query|head|tail|clear|insert|remove|find|enhex|dehex|debase|checksum|'
     +'difference|union|intersect|exclude|unique|complement|charset|'
     +'does|has|wrap|function|func|closure|context|object|module|bind|parse|wait)'
     +LOOK_AHEAD_DELIMIT,
  };

  const RED_NUMBER_HEX = {
    className: 'number',
    begin: '\\b([0-9A-F]+)h(?=\\s|\\)|\\]|/|;|\\\"|{\\[|\\(|$)'
  };

  return {
    aliases: ['rebol', 'red', 'red/system'],
    case_insensitive: true,
    illegal: /(\/\*|\/\/)/,
    contains: [
      COMMENT1,     // ;-- or ;@@
      COMMENT2,     // ;...
      COMMENT_PROMPT, COMMENT_ERROR,
      BRACKET,      // []() but also #() and #[]
      BINARY2,      // 2#{01010000}
      BINARY16,     //  #{DEADF00D} or 16#{DEAD F00D}
      BINARY64,     // 64#{3q3wDQ==}
      NUMBER_BIN,   // 2#0101 0#DEAD 8#677 10#999
      TUPLE,        // 1.2.3 1..3
      PAIR,         // 1x1 1.1x222 1e2x100
      NUMBER_MONEY, // $2 EUR$2 -USD$1.5  (currency ID not implemented in Rebol3 yet!)
      CHAR,         // #"a" #"^-" #"^(tab)"
      STRING,       // "aa" {b^/b}
      STRING_MULTILINE,
      STRING_RAW_4, STRING_RAW_3, STRING_RAW_2, STRING_RAW_1,
      FILE,         // %foo %"with space"
      URL,          // https://localhost:8080/foo?a=1
      REFINEMENT,   // /refinement
      LIT_WORD,     // 'word
      SET_WORD,     // word:
      GET_WORD,     // :word
      OPERATOR,     // == <> >= ...
      TAG,          // <a>
      EMAIL,        // user@domain.com
      DATATYPE,     // integer! but also any-string?
//    COMMENT_SPECIAL, 
      DATE, TIME, 
      ISSUE,
      LITERAL,
      KEYWORD,
      RED_NUMBER_HEX,  
      NUMBER_DECIMAL,
      ANY_WORD
    ]
  };
}

module.exports = redbol;