export default (function () {
	/*
	 * Generated by PEG.js 0.8.0.
	 *
	 * http://pegjs.majda.cz/
	 */

	function peg$subclass(child, parent) {
		function ctor(this: any) {
			this.constructor = child;
		}
		ctor.prototype = parent.prototype;
		child.prototype = new ctor();
	}

	function SyntaxError(this: any, message, expected, found, offset, line, column) {
		this.message = message;
		this.expected = expected;
		this.found = found;
		this.offset = offset;
		this.line = line;
		this.column = column;

		this.name = 'SyntaxError';
	}

	peg$subclass(SyntaxError, Error);

	function parse(input) {
		var options = arguments.length > 1 ? arguments[1] : {},
			peg$FAILED = {},
			peg$startRuleFunctions = {visualFormatString: peg$parsevisualFormatString},
			peg$startRuleFunction = peg$parsevisualFormatString,
			peg$c0 = peg$FAILED,
			peg$c1 = null,
			peg$c2 = ':',
			peg$c3 = {type: 'literal', value: ':', description: '":"'},
			peg$c4 = [],
			peg$c5 = function (o, superto, view, views, tosuper) {
				return {
					orientation: o ? o[0] : 'horizontal',
					cascade: (superto || []).concat([view], [].concat.apply([], views), tosuper || []),
				};
			},
			peg$c6 = 'H',
			peg$c7 = {type: 'literal', value: 'H', description: '"H"'},
			peg$c8 = 'V',
			peg$c9 = {type: 'literal', value: 'V', description: '"V"'},
			peg$c10 = function (orient) {
				return orient == 'H' ? 'horizontal' : 'vertical';
			},
			peg$c11 = '|',
			peg$c12 = {type: 'literal', value: '|', description: '"|"'},
			peg$c13 = function () {
				return {view: null};
			},
			peg$c14 = '[',
			peg$c15 = {type: 'literal', value: '[', description: '"["'},
			peg$c16 = ']',
			peg$c17 = {type: 'literal', value: ']', description: '"]"'},
			peg$c18 = function (view, predicates) {
				return extend(view, predicates ? {constraints: predicates} : {});
			},
			peg$c19 = '-',
			peg$c20 = {type: 'literal', value: '-', description: '"-"'},
			peg$c21 = function (predicateList) {
				return predicateList;
			},
			peg$c22 = function () {
				return [{relation: 'equ', constant: 'default', $parserOffset: offset()}];
			},
			peg$c23 = '',
			peg$c24 = function () {
				return [{relation: 'equ', constant: 0, $parserOffset: offset()}];
			},
			peg$c25 = function (n) {
				return [{relation: 'equ', constant: n, $parserOffset: offset()}];
			},
			peg$c26 = '(',
			peg$c27 = {type: 'literal', value: '(', description: '"("'},
			peg$c28 = ',',
			peg$c29 = {type: 'literal', value: ',', description: '","'},
			peg$c30 = ')',
			peg$c31 = {type: 'literal', value: ')', description: '")"'},
			peg$c32 = function (p, ps) {
				return [p].concat(
					ps.map(function (p) {
						return p[1];
					}),
				);
			},
			peg$c33 = '@',
			peg$c34 = {type: 'literal', value: '@', description: '"@"'},
			peg$c35 = function (r, o, p) {
				return extend({relation: 'equ'}, r || {}, o, p ? p[1] : {});
			},
			peg$c36 = '==',
			peg$c37 = {type: 'literal', value: '==', description: '"=="'},
			peg$c38 = function () {
				return {relation: 'equ', $parserOffset: offset()};
			},
			peg$c39 = '<=',
			peg$c40 = {type: 'literal', value: '<=', description: '"<="'},
			peg$c41 = function () {
				return {relation: 'leq', $parserOffset: offset()};
			},
			peg$c42 = '>=',
			peg$c43 = {type: 'literal', value: '>=', description: '">="'},
			peg$c44 = function () {
				return {relation: 'geq', $parserOffset: offset()};
			},
			peg$c45 = /^[0-9]/,
			peg$c46 = {type: 'class', value: '[0-9]', description: '[0-9]'},
			peg$c47 = function (digits) {
				return {priority: parseInt(digits.join(''), 10)};
			},
			peg$c48 = function (n) {
				return {constant: n};
			},
			peg$c49 = /^[a-zA-Z_]/,
			peg$c50 = {type: 'class', value: '[a-zA-Z_]', description: '[a-zA-Z_]'},
			peg$c51 = /^[a-zA-Z0-9_]/,
			peg$c52 = {type: 'class', value: '[a-zA-Z0-9_]', description: '[a-zA-Z0-9_]'},
			peg$c53 = function (f, v) {
				return {view: f + v};
			},
			peg$c54 = '.',
			peg$c55 = {type: 'literal', value: '.', description: '"."'},
			peg$c56 = function (digits, decimals) {
				return parseFloat(digits.concat('.').concat(decimals).join(''));
			},
			peg$c57 = function (digits) {
				return parseInt(digits.join(''), 10);
			},
			peg$currPos = 0,
			peg$reportedPos = 0,
			peg$cachedPos = 0,
			peg$cachedPosDetails = {line: 1, column: 1, seenCR: false},
			peg$maxFailPos = 0,
			peg$maxFailExpected = [] as any[],
			peg$silentFails = 0,
			peg$result;

		if ('startRule' in options) {
			if (!(options.startRule in peg$startRuleFunctions)) {
				throw new Error('Can\'t start parsing from rule "' + options.startRule + '".');
			}

			peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
		}

		function text() {
			return input.substring(peg$reportedPos, peg$currPos);
		}

		function offset() {
			return peg$reportedPos;
		}

		function line() {
			return peg$computePosDetails(peg$reportedPos).line;
		}

		function column() {
			return peg$computePosDetails(peg$reportedPos).column;
		}

		function expected(description) {
			throw peg$buildException(null, [{type: 'other', description: description}], peg$reportedPos);
		}

		function error(message) {
			throw peg$buildException(message, null, peg$reportedPos);
		}

		function peg$computePosDetails(pos) {
			function advance(details, startPos, endPos) {
				var p, ch;

				for (p = startPos; p < endPos; p++) {
					ch = input.charAt(p);
					if (ch === '\n') {
						if (!details.seenCR) {
							details.line++;
						}
						details.column = 1;
						details.seenCR = false;
					} else if (ch === '\r' || ch === '\u2028' || ch === '\u2029') {
						details.line++;
						details.column = 1;
						details.seenCR = true;
					} else {
						details.column++;
						details.seenCR = false;
					}
				}
			}

			if (peg$cachedPos !== pos) {
				if (peg$cachedPos > pos) {
					peg$cachedPos = 0;
					peg$cachedPosDetails = {line: 1, column: 1, seenCR: false};
				}
				advance(peg$cachedPosDetails, peg$cachedPos, pos);
				peg$cachedPos = pos;
			}

			return peg$cachedPosDetails;
		}

		function peg$fail(expected) {
			if (peg$currPos < peg$maxFailPos) {
				return;
			}

			if (peg$currPos > peg$maxFailPos) {
				peg$maxFailPos = peg$currPos;
				peg$maxFailExpected = [];
			}

			peg$maxFailExpected.push(expected);
		}

		function peg$buildException(message, expected, pos) {
			function cleanupExpected(expected) {
				var i = 1;

				expected.sort(function (a, b) {
					if (a.description < b.description) {
						return -1;
					} else if (a.description > b.description) {
						return 1;
					} else {
						return 0;
					}
				});

				while (i < expected.length) {
					if (expected[i - 1] === expected[i]) {
						expected.splice(i, 1);
					} else {
						i++;
					}
				}
			}

			function buildMessage(expected, found) {
				function stringEscape(s) {
					function hex(ch) {
						return ch.charCodeAt(0).toString(16).toUpperCase();
					}

					return s
						.replace(/\\/g, '\\\\')
						.replace(/"/g, '\\"')
						.replace(/\x08/g, '\\b')
						.replace(/\t/g, '\\t')
						.replace(/\n/g, '\\n')
						.replace(/\f/g, '\\f')
						.replace(/\r/g, '\\r')
						.replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
							return '\\x0' + hex(ch);
						})
						.replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
							return '\\x' + hex(ch);
						})
						.replace(/[\u0180-\u0FFF]/g, function (ch) {
							return '\\u0' + hex(ch);
						})
						.replace(/[\u1080-\uFFFF]/g, function (ch) {
							return '\\u' + hex(ch);
						});
				}

				var expectedDescs = new Array(expected.length),
					expectedDesc,
					foundDesc,
					i;

				for (i = 0; i < expected.length; i++) {
					expectedDescs[i] = expected[i].description;
				}

				expectedDesc =
					expected.length > 1
						? expectedDescs.slice(0, -1).join(', ') + ' or ' + expectedDescs[expected.length - 1]
						: expectedDescs[0];

				foundDesc = found ? '"' + stringEscape(found) + '"' : 'end of input';

				return 'Expected ' + expectedDesc + ' but ' + foundDesc + ' found.';
			}

			var posDetails = peg$computePosDetails(pos),
				found = pos < input.length ? input.charAt(pos) : null;

			if (expected !== null) {
				cleanupExpected(expected);
			}

			return new SyntaxError(
				message !== null ? message : buildMessage(expected, found),
				expected,
				found,
				pos,
				posDetails.line,
				posDetails.column,
			);
		}

		function peg$parsevisualFormatString() {
			var s0, s1, s2, s3, s4, s5, s6, s7;

			s0 = peg$currPos;
			s1 = peg$currPos;
			s2 = peg$parseorientation();
			if (s2 !== peg$FAILED) {
				if (input.charCodeAt(peg$currPos) === 58) {
					s3 = peg$c2;
					peg$currPos++;
				} else {
					s3 = peg$FAILED;
					if (peg$silentFails === 0) {
						peg$fail(peg$c3);
					}
				}
				if (s3 !== peg$FAILED) {
					s2 = [s2, s3];
					s1 = s2;
				} else {
					peg$currPos = s1;
					s1 = peg$c0;
				}
			} else {
				peg$currPos = s1;
				s1 = peg$c0;
			}
			if (s1 === peg$FAILED) {
				s1 = peg$c1;
			}
			if (s1 !== peg$FAILED) {
				s2 = peg$currPos;
				s3 = peg$parsesuperview();
				if (s3 !== peg$FAILED) {
					s4 = peg$parseconnection();
					if (s4 !== peg$FAILED) {
						s3 = [s3, s4];
						s2 = s3;
					} else {
						peg$currPos = s2;
						s2 = peg$c0;
					}
				} else {
					peg$currPos = s2;
					s2 = peg$c0;
				}
				if (s2 === peg$FAILED) {
					s2 = peg$c1;
				}
				if (s2 !== peg$FAILED) {
					s3 = peg$parseview();
					if (s3 !== peg$FAILED) {
						s4 = [];
						s5 = peg$currPos;
						s6 = peg$parseconnection();
						if (s6 !== peg$FAILED) {
							s7 = peg$parseview();
							if (s7 !== peg$FAILED) {
								s6 = [s6, s7];
								s5 = s6;
							} else {
								peg$currPos = s5;
								s5 = peg$c0;
							}
						} else {
							peg$currPos = s5;
							s5 = peg$c0;
						}
						while (s5 !== peg$FAILED) {
							s4.push(s5);
							s5 = peg$currPos;
							s6 = peg$parseconnection();
							if (s6 !== peg$FAILED) {
								s7 = peg$parseview();
								if (s7 !== peg$FAILED) {
									s6 = [s6, s7];
									s5 = s6;
								} else {
									peg$currPos = s5;
									s5 = peg$c0;
								}
							} else {
								peg$currPos = s5;
								s5 = peg$c0;
							}
						}
						if (s4 !== peg$FAILED) {
							s5 = peg$currPos;
							s6 = peg$parseconnection();
							if (s6 !== peg$FAILED) {
								s7 = peg$parsesuperview();
								if (s7 !== peg$FAILED) {
									s6 = [s6, s7];
									s5 = s6;
								} else {
									peg$currPos = s5;
									s5 = peg$c0;
								}
							} else {
								peg$currPos = s5;
								s5 = peg$c0;
							}
							if (s5 === peg$FAILED) {
								s5 = peg$c1;
							}
							if (s5 !== peg$FAILED) {
								peg$reportedPos = s0;
								s1 = peg$c5(s1, s2, s3, s4, s5);
								s0 = s1;
							} else {
								peg$currPos = s0;
								s0 = peg$c0;
							}
						} else {
							peg$currPos = s0;
							s0 = peg$c0;
						}
					} else {
						peg$currPos = s0;
						s0 = peg$c0;
					}
				} else {
					peg$currPos = s0;
					s0 = peg$c0;
				}
			} else {
				peg$currPos = s0;
				s0 = peg$c0;
			}

			return s0;
		}

		function peg$parseorientation() {
			var s0, s1;

			s0 = peg$currPos;
			if (input.charCodeAt(peg$currPos) === 72) {
				s1 = peg$c6;
				peg$currPos++;
			} else {
				s1 = peg$FAILED;
				if (peg$silentFails === 0) {
					peg$fail(peg$c7);
				}
			}
			if (s1 === peg$FAILED) {
				if (input.charCodeAt(peg$currPos) === 86) {
					s1 = peg$c8;
					peg$currPos++;
				} else {
					s1 = peg$FAILED;
					if (peg$silentFails === 0) {
						peg$fail(peg$c9);
					}
				}
			}
			if (s1 !== peg$FAILED) {
				peg$reportedPos = s0;
				s1 = peg$c10(s1);
			}
			s0 = s1;

			return s0;
		}

		function peg$parsesuperview() {
			var s0, s1;

			s0 = peg$currPos;
			if (input.charCodeAt(peg$currPos) === 124) {
				s1 = peg$c11;
				peg$currPos++;
			} else {
				s1 = peg$FAILED;
				if (peg$silentFails === 0) {
					peg$fail(peg$c12);
				}
			}
			if (s1 !== peg$FAILED) {
				peg$reportedPos = s0;
				s1 = peg$c13();
			}
			s0 = s1;

			return s0;
		}

		function peg$parseview() {
			var s0, s1, s2, s3, s4;

			s0 = peg$currPos;
			if (input.charCodeAt(peg$currPos) === 91) {
				s1 = peg$c14;
				peg$currPos++;
			} else {
				s1 = peg$FAILED;
				if (peg$silentFails === 0) {
					peg$fail(peg$c15);
				}
			}
			if (s1 !== peg$FAILED) {
				s2 = peg$parseviewName();
				if (s2 !== peg$FAILED) {
					s3 = peg$parsepredicateListWithParens();
					if (s3 === peg$FAILED) {
						s3 = peg$c1;
					}
					if (s3 !== peg$FAILED) {
						if (input.charCodeAt(peg$currPos) === 93) {
							s4 = peg$c16;
							peg$currPos++;
						} else {
							s4 = peg$FAILED;
							if (peg$silentFails === 0) {
								peg$fail(peg$c17);
							}
						}
						if (s4 !== peg$FAILED) {
							peg$reportedPos = s0;
							s1 = peg$c18(s2, s3);
							s0 = s1;
						} else {
							peg$currPos = s0;
							s0 = peg$c0;
						}
					} else {
						peg$currPos = s0;
						s0 = peg$c0;
					}
				} else {
					peg$currPos = s0;
					s0 = peg$c0;
				}
			} else {
				peg$currPos = s0;
				s0 = peg$c0;
			}

			return s0;
		}

		function peg$parseconnection() {
			var s0, s1, s2, s3;

			s0 = peg$currPos;
			if (input.charCodeAt(peg$currPos) === 45) {
				s1 = peg$c19;
				peg$currPos++;
			} else {
				s1 = peg$FAILED;
				if (peg$silentFails === 0) {
					peg$fail(peg$c20);
				}
			}
			if (s1 !== peg$FAILED) {
				s2 = peg$parsepredicateList();
				if (s2 !== peg$FAILED) {
					if (input.charCodeAt(peg$currPos) === 45) {
						s3 = peg$c19;
						peg$currPos++;
					} else {
						s3 = peg$FAILED;
						if (peg$silentFails === 0) {
							peg$fail(peg$c20);
						}
					}
					if (s3 !== peg$FAILED) {
						peg$reportedPos = s0;
						s1 = peg$c21(s2);
						s0 = s1;
					} else {
						peg$currPos = s0;
						s0 = peg$c0;
					}
				} else {
					peg$currPos = s0;
					s0 = peg$c0;
				}
			} else {
				peg$currPos = s0;
				s0 = peg$c0;
			}
			if (s0 === peg$FAILED) {
				s0 = peg$currPos;
				if (input.charCodeAt(peg$currPos) === 45) {
					s1 = peg$c19;
					peg$currPos++;
				} else {
					s1 = peg$FAILED;
					if (peg$silentFails === 0) {
						peg$fail(peg$c20);
					}
				}
				if (s1 !== peg$FAILED) {
					peg$reportedPos = s0;
					s1 = peg$c22();
				}
				s0 = s1;
				if (s0 === peg$FAILED) {
					s0 = peg$currPos;
					s1 = peg$c23;
					if (s1 !== peg$FAILED) {
						peg$reportedPos = s0;
						s1 = peg$c24();
					}
					s0 = s1;
				}
			}

			return s0;
		}

		function peg$parsepredicateList() {
			var s0;

			s0 = peg$parsesimplePredicate();
			if (s0 === peg$FAILED) {
				s0 = peg$parsepredicateListWithParens();
			}

			return s0;
		}

		function peg$parsesimplePredicate() {
			var s0, s1;

			s0 = peg$currPos;
			s1 = peg$parsenumber();
			if (s1 !== peg$FAILED) {
				peg$reportedPos = s0;
				s1 = peg$c25(s1);
			}
			s0 = s1;

			return s0;
		}

		function peg$parsepredicateListWithParens() {
			var s0, s1, s2, s3, s4, s5, s6;

			s0 = peg$currPos;
			if (input.charCodeAt(peg$currPos) === 40) {
				s1 = peg$c26;
				peg$currPos++;
			} else {
				s1 = peg$FAILED;
				if (peg$silentFails === 0) {
					peg$fail(peg$c27);
				}
			}
			if (s1 !== peg$FAILED) {
				s2 = peg$parsepredicate();
				if (s2 !== peg$FAILED) {
					s3 = [];
					s4 = peg$currPos;
					if (input.charCodeAt(peg$currPos) === 44) {
						s5 = peg$c28;
						peg$currPos++;
					} else {
						s5 = peg$FAILED;
						if (peg$silentFails === 0) {
							peg$fail(peg$c29);
						}
					}
					if (s5 !== peg$FAILED) {
						s6 = peg$parsepredicate();
						if (s6 !== peg$FAILED) {
							s5 = [s5, s6];
							s4 = s5;
						} else {
							peg$currPos = s4;
							s4 = peg$c0;
						}
					} else {
						peg$currPos = s4;
						s4 = peg$c0;
					}
					while (s4 !== peg$FAILED) {
						s3.push(s4);
						s4 = peg$currPos;
						if (input.charCodeAt(peg$currPos) === 44) {
							s5 = peg$c28;
							peg$currPos++;
						} else {
							s5 = peg$FAILED;
							if (peg$silentFails === 0) {
								peg$fail(peg$c29);
							}
						}
						if (s5 !== peg$FAILED) {
							s6 = peg$parsepredicate();
							if (s6 !== peg$FAILED) {
								s5 = [s5, s6];
								s4 = s5;
							} else {
								peg$currPos = s4;
								s4 = peg$c0;
							}
						} else {
							peg$currPos = s4;
							s4 = peg$c0;
						}
					}
					if (s3 !== peg$FAILED) {
						if (input.charCodeAt(peg$currPos) === 41) {
							s4 = peg$c30;
							peg$currPos++;
						} else {
							s4 = peg$FAILED;
							if (peg$silentFails === 0) {
								peg$fail(peg$c31);
							}
						}
						if (s4 !== peg$FAILED) {
							peg$reportedPos = s0;
							s1 = peg$c32(s2, s3);
							s0 = s1;
						} else {
							peg$currPos = s0;
							s0 = peg$c0;
						}
					} else {
						peg$currPos = s0;
						s0 = peg$c0;
					}
				} else {
					peg$currPos = s0;
					s0 = peg$c0;
				}
			} else {
				peg$currPos = s0;
				s0 = peg$c0;
			}

			return s0;
		}

		function peg$parsepredicate() {
			var s0, s1, s2, s3, s4, s5;

			s0 = peg$currPos;
			s1 = peg$parserelation();
			if (s1 === peg$FAILED) {
				s1 = peg$c1;
			}
			if (s1 !== peg$FAILED) {
				s2 = peg$parseobjectOfPredicate();
				if (s2 !== peg$FAILED) {
					s3 = peg$currPos;
					if (input.charCodeAt(peg$currPos) === 64) {
						s4 = peg$c33;
						peg$currPos++;
					} else {
						s4 = peg$FAILED;
						if (peg$silentFails === 0) {
							peg$fail(peg$c34);
						}
					}
					if (s4 !== peg$FAILED) {
						s5 = peg$parsepriority();
						if (s5 !== peg$FAILED) {
							s4 = [s4, s5];
							s3 = s4;
						} else {
							peg$currPos = s3;
							s3 = peg$c0;
						}
					} else {
						peg$currPos = s3;
						s3 = peg$c0;
					}
					if (s3 === peg$FAILED) {
						s3 = peg$c1;
					}
					if (s3 !== peg$FAILED) {
						peg$reportedPos = s0;
						s1 = peg$c35(s1, s2, s3);
						s0 = s1;
					} else {
						peg$currPos = s0;
						s0 = peg$c0;
					}
				} else {
					peg$currPos = s0;
					s0 = peg$c0;
				}
			} else {
				peg$currPos = s0;
				s0 = peg$c0;
			}

			return s0;
		}

		function peg$parserelation() {
			var s0, s1;

			s0 = peg$currPos;
			if (input.substr(peg$currPos, 2) === peg$c36) {
				s1 = peg$c36;
				peg$currPos += 2;
			} else {
				s1 = peg$FAILED;
				if (peg$silentFails === 0) {
					peg$fail(peg$c37);
				}
			}
			if (s1 !== peg$FAILED) {
				peg$reportedPos = s0;
				s1 = peg$c38();
			}
			s0 = s1;
			if (s0 === peg$FAILED) {
				s0 = peg$currPos;
				if (input.substr(peg$currPos, 2) === peg$c39) {
					s1 = peg$c39;
					peg$currPos += 2;
				} else {
					s1 = peg$FAILED;
					if (peg$silentFails === 0) {
						peg$fail(peg$c40);
					}
				}
				if (s1 !== peg$FAILED) {
					peg$reportedPos = s0;
					s1 = peg$c41();
				}
				s0 = s1;
				if (s0 === peg$FAILED) {
					s0 = peg$currPos;
					if (input.substr(peg$currPos, 2) === peg$c42) {
						s1 = peg$c42;
						peg$currPos += 2;
					} else {
						s1 = peg$FAILED;
						if (peg$silentFails === 0) {
							peg$fail(peg$c43);
						}
					}
					if (s1 !== peg$FAILED) {
						peg$reportedPos = s0;
						s1 = peg$c44();
					}
					s0 = s1;
				}
			}

			return s0;
		}

		function peg$parseobjectOfPredicate() {
			var s0;

			s0 = peg$parseconstant();
			if (s0 === peg$FAILED) {
				s0 = peg$parseviewName();
			}

			return s0;
		}

		function peg$parsepriority() {
			var s0, s1, s2;

			s0 = peg$currPos;
			s1 = [];
			if (peg$c45.test(input.charAt(peg$currPos))) {
				s2 = input.charAt(peg$currPos);
				peg$currPos++;
			} else {
				s2 = peg$FAILED;
				if (peg$silentFails === 0) {
					peg$fail(peg$c46);
				}
			}
			if (s2 !== peg$FAILED) {
				while (s2 !== peg$FAILED) {
					s1.push(s2);
					if (peg$c45.test(input.charAt(peg$currPos))) {
						s2 = input.charAt(peg$currPos);
						peg$currPos++;
					} else {
						s2 = peg$FAILED;
						if (peg$silentFails === 0) {
							peg$fail(peg$c46);
						}
					}
				}
			} else {
				s1 = peg$c0;
			}
			if (s1 !== peg$FAILED) {
				peg$reportedPos = s0;
				s1 = peg$c47(s1);
			}
			s0 = s1;

			return s0;
		}

		function peg$parseconstant() {
			var s0, s1;

			s0 = peg$currPos;
			s1 = peg$parsenumber();
			if (s1 !== peg$FAILED) {
				peg$reportedPos = s0;
				s1 = peg$c48(s1);
			}
			s0 = s1;

			return s0;
		}

		function peg$parseviewName() {
			var s0, s1, s2, s3, s4;

			s0 = peg$currPos;
			s1 = peg$currPos;
			s2 = [];
			if (peg$c49.test(input.charAt(peg$currPos))) {
				s3 = input.charAt(peg$currPos);
				peg$currPos++;
			} else {
				s3 = peg$FAILED;
				if (peg$silentFails === 0) {
					peg$fail(peg$c50);
				}
			}
			if (s3 !== peg$FAILED) {
				while (s3 !== peg$FAILED) {
					s2.push(s3);
					if (peg$c49.test(input.charAt(peg$currPos))) {
						s3 = input.charAt(peg$currPos);
						peg$currPos++;
					} else {
						s3 = peg$FAILED;
						if (peg$silentFails === 0) {
							peg$fail(peg$c50);
						}
					}
				}
			} else {
				s2 = peg$c0;
			}
			if (s2 !== peg$FAILED) {
				s2 = input.substring(s1, peg$currPos);
			}
			s1 = s2;
			if (s1 !== peg$FAILED) {
				s2 = peg$currPos;
				s3 = [];
				if (peg$c51.test(input.charAt(peg$currPos))) {
					s4 = input.charAt(peg$currPos);
					peg$currPos++;
				} else {
					s4 = peg$FAILED;
					if (peg$silentFails === 0) {
						peg$fail(peg$c52);
					}
				}
				while (s4 !== peg$FAILED) {
					s3.push(s4);
					if (peg$c51.test(input.charAt(peg$currPos))) {
						s4 = input.charAt(peg$currPos);
						peg$currPos++;
					} else {
						s4 = peg$FAILED;
						if (peg$silentFails === 0) {
							peg$fail(peg$c52);
						}
					}
				}
				if (s3 !== peg$FAILED) {
					s3 = input.substring(s2, peg$currPos);
				}
				s2 = s3;
				if (s2 !== peg$FAILED) {
					peg$reportedPos = s0;
					s1 = peg$c53(s1, s2);
					s0 = s1;
				} else {
					peg$currPos = s0;
					s0 = peg$c0;
				}
			} else {
				peg$currPos = s0;
				s0 = peg$c0;
			}

			return s0;
		}

		function peg$parsenumber() {
			var s0, s1, s2, s3, s4;

			s0 = peg$currPos;
			s1 = [];
			if (peg$c45.test(input.charAt(peg$currPos))) {
				s2 = input.charAt(peg$currPos);
				peg$currPos++;
			} else {
				s2 = peg$FAILED;
				if (peg$silentFails === 0) {
					peg$fail(peg$c46);
				}
			}
			if (s2 !== peg$FAILED) {
				while (s2 !== peg$FAILED) {
					s1.push(s2);
					if (peg$c45.test(input.charAt(peg$currPos))) {
						s2 = input.charAt(peg$currPos);
						peg$currPos++;
					} else {
						s2 = peg$FAILED;
						if (peg$silentFails === 0) {
							peg$fail(peg$c46);
						}
					}
				}
			} else {
				s1 = peg$c0;
			}
			if (s1 !== peg$FAILED) {
				if (input.charCodeAt(peg$currPos) === 46) {
					s2 = peg$c54;
					peg$currPos++;
				} else {
					s2 = peg$FAILED;
					if (peg$silentFails === 0) {
						peg$fail(peg$c55);
					}
				}
				if (s2 !== peg$FAILED) {
					s3 = [];
					if (peg$c45.test(input.charAt(peg$currPos))) {
						s4 = input.charAt(peg$currPos);
						peg$currPos++;
					} else {
						s4 = peg$FAILED;
						if (peg$silentFails === 0) {
							peg$fail(peg$c46);
						}
					}
					if (s4 !== peg$FAILED) {
						while (s4 !== peg$FAILED) {
							s3.push(s4);
							if (peg$c45.test(input.charAt(peg$currPos))) {
								s4 = input.charAt(peg$currPos);
								peg$currPos++;
							} else {
								s4 = peg$FAILED;
								if (peg$silentFails === 0) {
									peg$fail(peg$c46);
								}
							}
						}
					} else {
						s3 = peg$c0;
					}
					if (s3 !== peg$FAILED) {
						peg$reportedPos = s0;
						s1 = peg$c56(s1, s3);
						s0 = s1;
					} else {
						peg$currPos = s0;
						s0 = peg$c0;
					}
				} else {
					peg$currPos = s0;
					s0 = peg$c0;
				}
			} else {
				peg$currPos = s0;
				s0 = peg$c0;
			}
			if (s0 === peg$FAILED) {
				s0 = peg$currPos;
				s1 = [];
				if (peg$c45.test(input.charAt(peg$currPos))) {
					s2 = input.charAt(peg$currPos);
					peg$currPos++;
				} else {
					s2 = peg$FAILED;
					if (peg$silentFails === 0) {
						peg$fail(peg$c46);
					}
				}
				if (s2 !== peg$FAILED) {
					while (s2 !== peg$FAILED) {
						s1.push(s2);
						if (peg$c45.test(input.charAt(peg$currPos))) {
							s2 = input.charAt(peg$currPos);
							peg$currPos++;
						} else {
							s2 = peg$FAILED;
							if (peg$silentFails === 0) {
								peg$fail(peg$c46);
							}
						}
					}
				} else {
					s1 = peg$c0;
				}
				if (s1 !== peg$FAILED) {
					peg$reportedPos = s0;
					s1 = peg$c57(s1);
				}
				s0 = s1;
			}

			return s0;
		}

		function extend(dst, ...args: any[]) {
			for (var i = 1; i < arguments.length; i++) {
				for (var k in arguments[i]) {
					dst[k] = arguments[i][k];
				}
			}
			return dst;
		}

		peg$result = peg$startRuleFunction();

		if (peg$result !== peg$FAILED && peg$currPos === input.length) {
			return peg$result;
		} else {
			if (peg$result !== peg$FAILED && peg$currPos < input.length) {
				peg$fail({type: 'end', description: 'end of input'});
			}

			throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
		}
	}

	return {
		SyntaxError: SyntaxError,
		parse: parse,
	};
})();
