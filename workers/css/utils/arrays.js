!function(e){if("object"==typeof module&&"object"==typeof module.exports){var o=e(require,exports);void 0!==o&&(module.exports=o)}else"function"==typeof define&&define.amd&&define(["require","exports"],e)}(function(e,o){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function t(e,o){var t=0,r=e.length;if(0===r)return 0;for(;t<r;){var f=Math.floor((t+r)/2);o(e[f])?r=f:t=f+1}return t}Object.defineProperty(o,"__esModule",{value:!0}),o.findFirst=t});