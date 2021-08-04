/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom/dom.js":
/*!************************!*\
  !*** ./src/dom/dom.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass DomStuff {\n\n  constructor(humanGameboard) {\n    this.app = document.querySelector('.app');\n\n    this.humanGameboard = humanGameboard;\n\n    this.orientation = 'horizontal';\n    this.shipLength = 5;\n    this.checkPlacementFunction = this.humanGameboard.canPlaceHorizontal;\n\n    this.name = '';\n\n    this.shipsPlaced = [];\n\n    this.shipName = '';\n    this.shipPlacementCommand = '';\n\n    this.renderTitleScreen();\n\n    this.noPlaceColor = 'red';\n    this.placeSafeColor = 'green';\n    this.alreadyPlacedColor = 'blue';\n  }\n\n  renderTitleScreen() {\n    const titlePage = document.createElement('div');\n    titlePage.classList.add('title-page');\n\n    const title = document.createElement('h1');\n    title.classList.add('title');\n\n    const nameEntry = document.createElement('form');\n    nameEntry.classList.add('name-entry');\n\n    const captainLabel = document.createElement('label');\n    captainLabel.classList.add('captain-label');\n    captainLabel.setAttribute('for', 'captain-name');\n    captainLabel.textContent = \"CAPTAIN'S NAME:\";\n\n    const captainName = document.createElement('input');\n    captainName.setAttribute('autocomplete', 'off');\n    captainName.setAttribute('type', 'text');\n    captainName.setAttribute('class', 'captain-name');\n    captainName.setAttribute('id', 'captain-name');\n\n    nameEntry.append(captainLabel);\n    nameEntry.append(captainName);\n\n    titlePage.append(title);\n    titlePage.append(nameEntry);\n\n    this.app.append(titlePage);\n\n    nameEntry.addEventListener('submit', (e) => {\n      e.preventDefault();\n      this.name = captainName.value;\n\n      this.shipsToPlace = [\n        ['patrolBoat', 2, `and finally, ${this.name}, the small but mighty tugboat?`],\n        ['submarine', 3, `they'll never see it coming, the mighty submarine. where to?`],\n        ['destroyer', 3, `place your destroyer VERY carefully, ${this.name}!`],\n        ['battleship', 4, `toward which icy waters shall the battleship head?`],\n        ['carrier', 5, `Cpt. ${this.name}, where would you like to place your carrier?`]\n      ];\n\n      titlePage.remove();\n      this.selectNextShip();\n      this.renderFleetPrep();\n    })\n\n  }\n\n  selectNextShip() {\n    const shipInfo = this.shipsToPlace.pop();\n    const [shipName, shipLength, command] = shipInfo;\n    this.shipLength = shipLength;\n    this.shipName = shipName;\n    this.shipPlacementCommand = command;\n    this.shipsPlaced.push(shipInfo);\n  }\n\n\n  renderFleetPrep() {\n\n    const fleetPrep = document.createElement('div');\n    fleetPrep.classList.add('fleet-prep');\n\n    const fleetPrepHeading = document.createElement('h2');\n    fleetPrepHeading.classList.add('fleet-prep-heading');\n    fleetPrepHeading.textContent = 'assemble your fleet.';\n\n    const fleetPrepInstructions = document.createElement('p');\n    fleetPrepInstructions.classList.add('fleet-prep-instructions');\n    fleetPrepInstructions.textContent = this.shipPlacementCommand;\n\n    const fleetPrepGrid = document.createElement('div');\n    fleetPrepGrid.classList.add('grid-container');\n\n    this.renderGrid(fleetPrepGrid, fleetPrepInstructions);\n\n    const rotateButton = document.createElement('button');\n    rotateButton.classList.add('rotate');\n    rotateButton.textContent = 'ROTATE SHIP';\n    rotateButton.addEventListener('click', () => {\n      if (this.orientation === 'horizontal') {\n        this.orientation = 'vertical';\n        this.checkPlacementFunction = this.humanGameboard.canPlaceVertical;\n      } else {\n        this.orientation = 'horizontal';\n        this.checkPlacementFunction = this.humanGameboard.canPlaceHorizontal;\n      }\n    })\n\n    fleetPrep.append(fleetPrepHeading, fleetPrepInstructions, fleetPrepGrid, rotateButton);\n    this.app.append(fleetPrep);\n  }\n\n  renderGrid(container, instructions) {\n    while (container.firstChild) {\n      container.removeChild(container.lastChild);\n    }\n\n    for (let row = 0; row < 10; row++) {\n      for (let column = 0; column < 10; column++) {\n        let square = document.createElement('div');\n        square.setAttribute('class', 'square');\n        square.dataset.position = `${row}${column}`;\n\n        if (this.humanGameboard.board[row][column].shipName !== undefined) {\n          square.style.backgroundColor = this.alreadyPlacedColor;\n        }\n\n        square.addEventListener('click', () => {\n          if (this.checkPlacementFunction(row, column, this.shipLength)) {\n            this.humanGameboard.place(row, column, this.shipName, this.orientation);\n            this.selectNextShip();\n            instructions.textContent = this.shipPlacementCommand;\n            this.renderGrid(container, instructions);\n          }\n        })\n        square.addEventListener('mouseenter', (e) => {\n          if (!this.checkPlacementFunction(row, column, this.shipLength)) {\n            square.style.backgroundColor = 'red';\n          } else {\n            if (this.orientation === 'horizontal') {\n              for (let i = 0; i < this.shipLength; i++) {\n                const nextSquare = document.querySelector(`[data-position='${row}${column + i}']`);\n                nextSquare.style.backgroundColor = 'green';\n              }\n            } else {\n              for (let i = 0; i < this.shipLength; i++) {\n                const nextSquare = document.querySelector(`[data-position='${row + i}${column}']`);\n                nextSquare.style.backgroundColor = 'green';\n              }\n            }\n          }\n        });\n        square.addEventListener('mouseleave', () => {\n          if (!this.checkPlacementFunction(row, column, this.shipLength)) {\n            if (this.humanGameboard.board[row][column].shipName !== undefined) {\n              square.style.backgroundColor = this.alreadyPlacedColor;\n            } else {\n              square.style.backgroundColor = 'black';\n            }\n          } else {\n            if (this.orientation === 'horizontal') {\n              for (let i = 0; i < this.shipLength; i++) {\n                const nextSquare = document.querySelector(`[data-position='${row}${column + i}']`);\n                nextSquare.style.backgroundColor = 'black';\n              }\n            } else {\n              for (let i = 0; i < this.shipLength; i++) {\n                const nextSquare = document.querySelector(`[data-position='${row + i}${column}']`);\n                nextSquare.style.backgroundColor = 'black';\n              }\n            }\n          }\n        })\n        container.appendChild(square);\n      }\n    }\n  }\n\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DomStuff);\n\n//# sourceURL=webpack://battleship/./src/dom/dom.js?");

/***/ }),

/***/ "./src/gameboard/gameboard.js":
/*!************************************!*\
  !*** ./src/gameboard/gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ship/ship */ \"./src/ship/ship.js\");\n\n\nconst gameboardFactory = () => {\n\n  const shipDetailsObject = {\n    patrolBoat: 2,\n    submarine: 3,\n    destroyer: 3,\n    battleship: 4,\n    carrier: 5,\n  }\n\n  const board = [];\n\n  const ships = {};\n\n  const shotsFired = [];\n\n  //Instantiate board as 2-dim Array (10x10) of objects\n  for (let i = 0; i < 10; i++) {\n    board[i] = [];\n    for (let j = 0; j < 10; j++) {\n      board[i][j] = {\n        shipName: undefined,\n        shipPos: undefined,\n      };\n    }\n  };\n\n  //Check if horizontal placement of ships will collide with edge or other ships\n  const canPlaceHorizontal = (row, column, length) => {\n    if (column + length > 10) {\n      return false;\n    }\n    for (let i = 0; i < length; i++) {\n      if (board[row][column + i].shipName !== undefined) {\n        return false;\n      }\n    }\n    return true;\n  }\n\n  const canPlaceVertical = (row, column, length) => {\n    if (row + length > 10) {\n      return false;\n    }\n    for (let i = 0; i < length; i++) {\n      if (board[row + i][column].shipName !== undefined) {\n        return false;\n      }\n    }\n    return true;\n  }\n\n  const place = (row, column, shipName, orientation) => {\n\n    const shipLength = shipDetailsObject[shipName];\n\n    if (orientation === 'horizontal') {\n      if (!canPlaceHorizontal(row, column, shipLength)) {\n        throw new Error('check canPlaceHorizontal before calling place')\n      }\n      for (let i = 0; i < shipLength; i++) {\n        board[row][column + i].shipName = shipName;\n        board[row][column + i].shipPos = i;\n      }\n    } else if (orientation === 'vertical') {\n      if (!canPlaceVertical(row, column, shipLength)) {\n        return;\n        // throw new Error('check canPlaceVertical before calling place')\n      }\n      for (let i = 0; i < shipLength; i++) {\n        board[row + i][column].shipName = shipName;\n        board[row + i][column].shipPos = i;\n      }\n    } else {\n      throw new Error(\"orientation must be 'horizontal' or 'vertical'\");\n    }\n\n    const { hit, isSunk } = (0,_ship_ship__WEBPACK_IMPORTED_MODULE_0__.default)(shipLength);\n\n    ships[shipName] = {\n      hit,\n      isSunk,\n      length: shipLength,\n      orientation,\n      origin: [row, column],\n      sunk: false,\n    };\n  };\n\n  const hitInfoOrMiss = (row, column) => {\n    console.log(board);\n    if (board[row][column].shipName === undefined) {\n      return 'miss';\n    } else {\n      return { ...board[row][column] };\n    }\n  };\n\n  const canAttack = (row, column) => {\n    for (const shot of shotsFired) {\n      if (row === shot[0] && column === shot[1]) {\n        return false\n      }\n    }\n    return true;\n  }\n\n  //takes x and y coordinates\n  //checks if hit/miss,\n  //\n  //Records misses/sends hit function to hit ships/\n  const handleAttack = (row, column) => {\n    if (!canAttack(row, column)) {\n      throw new Error('Space already fired upon');\n    }\n    const hitInfo = hitInfoOrMiss(row, column);\n\n    if (hitInfo === 'miss') {\n      shotsFired.push([row, column, 'miss']);\n    } else {\n      shotsFired.push([row, column, 'hit']);\n\n      const shipName = board[row][column].shipName;\n      const shipPos = board[row][column].shipPos;\n      const currentShip = ships[shipName];\n\n      currentShip.hit(shipPos);\n      if (currentShip.isSunk) currentShip.sunk = true;\n    }\n  };\n\n  const allSunk = () => {\n    for (const currentShip in ships) {\n      if (!ships[currentShip].sunk) {\n        return false;\n      }\n    }\n    return true;\n  }\n\n  return { board, place, canPlaceHorizontal, canPlaceVertical, ships, handleAttack, hitInfoOrMiss, shotsFired, allSunk, canAttack };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboardFactory);\n\n//# sourceURL=webpack://battleship/./src/gameboard/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/dom */ \"./src/dom/dom.js\");\n/* harmony import */ var _player_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player/player */ \"./src/player/player.js\");\n/* harmony import */ var _gameboard_gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard/gameboard */ \"./src/gameboard/gameboard.js\");\n\n\n\n\nlet name;\nlet computerPlayer = {};\nlet humanPlayer = {};\nlet computerGameboard = {};\nlet humanGameboard = {};\n\n\nfunction startNewGame() {\n  computerPlayer = (0,_player_player__WEBPACK_IMPORTED_MODULE_1__.default)('computer');\n  humanPlayer = (0,_player_player__WEBPACK_IMPORTED_MODULE_1__.default)('human');\n  computerGameboard = (0,_gameboard_gameboard__WEBPACK_IMPORTED_MODULE_2__.default)();\n  humanGameboard = (0,_gameboard_gameboard__WEBPACK_IMPORTED_MODULE_2__.default)();\n  const domStuff = new _dom_dom__WEBPACK_IMPORTED_MODULE_0__.default(\n    humanGameboard);\n}\n\nstartNewGame();\n\n\n\n\n// computerGameboard.place(0,0, 'patrolBoat', 'horizontal');\n// computerGameboard.place(1,0, 'submarine', 'horizontal');\n// computerGameboard.place(2,0, 'destroyer', 'horizontal');\n// computerGameboard.place(3,0, 'battleship', 'horizontal');\n// computerGameboard.place(4,0, 'carrier', 'horizontal');\n\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player/player.js":
/*!******************************!*\
  !*** ./src/player/player.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst playerFactory = (type, gameboard, humanMove) => {\n\n  let computerMove;\n  const computerMoveList = [];\n\n  if (type === 'computer') {\n    for (let i = 0; i < 10; i++) {\n      computerMoveList[i] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];\n    }\n\n    computerMove = () => {\n      const row = Math.floor(Math.random() * computerMoveList.length);\n      const column = Math.floor(Math.random() * computerMoveList[row].length);\n\n      if (computerMoveList[row].length === 1) {\n        computerMoveList.splice(row, 1);\n        return [row, column];\n      }\n\n      computerMoveList[row].splice(column, 1);\n      return [row, column];\n    }\n  }\n\n  const move = () => {\n    (type === \"human\") ?\n      gameboard.handleAttack(...humanMove()) :\n      gameboard.handleAttack(...computerMove())\n  };\n\n  return { move, computerMove };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playerFactory);\n\n//# sourceURL=webpack://battleship/./src/player/player.js?");

/***/ }),

/***/ "./src/ship/ship.js":
/*!**************************!*\
  !*** ./src/ship/ship.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst shipFactory = (length) => {\n  const hitArray = Array(length).fill(0);\n\n  const hit = (position) => {\n    hitArray[position] = 1;\n  }\n\n  const isSunk = () => {\n    for (const pos of hitArray) {\n      if (hitArray[pos] === 0) {\n        return false;\n      }\n    }\n    return true;\n  }\n\n  return {\n    length, hitArray, hit, isSunk,\n  };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipFactory);\n\n//# sourceURL=webpack://battleship/./src/ship/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;