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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass DomStuff {\n\n  constructor(\n    humanGameboard,\n    computerGameboard,\n    humanPlayer,\n    computerPlayer,\n    checkWinner,\n  ) {\n    this.app = document.querySelector('.app');\n\n    this.humanGameboard = humanGameboard;\n    this.computerGameboard = computerGameboard;\n    this.humanPlayer = humanPlayer;\n    this.computerPlayer = computerPlayer;\n\n    this.checkWinner = checkWinner;\n\n    this.orientation = 'horizontal';\n    this.shipLength = 5;\n    this.checkPlacementFunction = this.humanGameboard.canPlaceHorizontal;\n\n    this.name = '';\n\n    this.shipsPlaced = [];\n\n    this.shipName = '';\n    this.shipPlacementCommand = '';\n\n    this.renderTitleScreen();\n\n    this.noPlaceColor = 'red';\n    this.placeSafeColor = 'green';\n    this.alreadyPlacedColor = 'blue';\n  }\n\n  renderTitleScreen() {\n    const titlePage = document.createElement('div');\n    titlePage.classList.add('title-page');\n\n    const title = document.createElement('h1');\n    title.classList.add('title');\n\n    const nameEntry = document.createElement('form');\n    nameEntry.classList.add('name-entry');\n\n    const captainLabel = document.createElement('label');\n    captainLabel.classList.add('captain-label');\n    captainLabel.setAttribute('for', 'captain-name');\n    captainLabel.textContent = \"CAPTAIN'S NAME:\";\n\n    const captainName = document.createElement('input');\n    captainName.setAttribute('autocomplete', 'off');\n    captainName.setAttribute('type', 'text');\n    captainName.setAttribute('class', 'captain-name');\n    captainName.setAttribute('id', 'captain-name');\n\n    nameEntry.append(captainLabel);\n    nameEntry.append(captainName);\n\n    titlePage.append(title);\n    titlePage.append(nameEntry);\n\n    this.app.append(titlePage);\n\n    nameEntry.addEventListener('submit', (e) => {\n      e.preventDefault();\n      this.name = captainName.value;\n\n      this.shipsToPlace = [\n        ['patrolBoat', 2, `and finally, ${this.name}, the small but mighty patrol boat?`],\n        ['submarine', 3, `they'll never see it coming, the wily submarine. where to?`],\n        ['destroyer', 3, `place your destroyer VERY carefully, ${this.name}!`],\n        ['battleship', 4, `toward which icy waters shall the battleship head?`],\n        ['carrier', 5, `Cpt. ${this.name}, where would you like to place your carrier?`]\n      ];\n\n      titlePage.remove();\n      this.selectNextShip();\n      this.renderFleetPrep();\n    })\n\n  }\n\n  selectNextShip() {\n    const shipInfo = this.shipsToPlace.pop();\n    const [shipName, shipLength, command] = shipInfo;\n    this.shipLength = shipLength;\n    this.shipName = shipName;\n    this.shipPlacementCommand = command;\n    this.shipsPlaced.push(shipInfo);\n  }\n\n\n  renderFleetPrep() {\n\n    const fleetPrep = document.createElement('div');\n    fleetPrep.classList.add('fleet-prep');\n\n    const fleetPrepHeading = document.createElement('h2');\n    fleetPrepHeading.classList.add('fleet-prep-heading');\n    fleetPrepHeading.textContent = 'assemble your fleet.';\n\n    const fleetPrepInstructions = document.createElement('p');\n    fleetPrepInstructions.classList.add('fleet-prep-instructions');\n    fleetPrepInstructions.textContent = this.shipPlacementCommand;\n\n    const fleetPrepGrid = document.createElement('div');\n    fleetPrepGrid.classList.add('grid-container');\n\n    this.renderGrid(fleetPrepGrid, fleetPrepInstructions);\n\n    const rotateButton = document.createElement('button');\n    rotateButton.classList.add('rotate');\n    rotateButton.classList.add('button');\n    rotateButton.textContent = 'ROTATE SHIP';\n    rotateButton.addEventListener('click', () => {\n      if (this.orientation === 'horizontal') {\n        this.orientation = 'vertical';\n        this.checkPlacementFunction = this.humanGameboard.canPlaceVertical;\n      } else {\n        this.orientation = 'horizontal';\n        this.checkPlacementFunction = this.humanGameboard.canPlaceHorizontal;\n      }\n    })\n\n    fleetPrep.append(fleetPrepHeading, fleetPrepInstructions, fleetPrepGrid, rotateButton);\n    this.app.append(fleetPrep);\n  }\n\n  renderGrid(container, instructions) {\n    while (container.firstChild) {\n      container.removeChild(container.lastChild);\n    }\n\n    for (let row = 0; row < 10; row++) {\n      for (let column = 0; column < 10; column++) {\n        let square = document.createElement('div');\n        square.setAttribute('class', 'square');\n        square.dataset.position = `${row}${column}`;\n\n        if (this.humanGameboard.board[row][column].shipName !== undefined) {\n          square.style.backgroundColor = this.alreadyPlacedColor;\n          if (this.humanGameboard.board[row][column].shipPos === 0) {\n            const shipName = this.humanGameboard.board[row][column].shipName;\n            this.placeShipImage(square, shipName, this.humanGameboard.ships[shipName].orientation, 'large');\n          }\n        }\n\n\n        square.addEventListener('click', () => {\n          if (this.checkPlacementFunction(row, column, this.shipLength)) {\n            this.humanGameboard.place(row, column, this.shipName, this.orientation);\n\n            if (this.shipName === 'patrolBoat') {\n              this.renderGrid(container, instructions);\n\n              const rotateButton = document.querySelector('.rotate');\n\n              const startButton = document.createElement('button');\n              startButton.classList.add('start');\n              startButton.classList.add('button');\n              startButton.textContent = 'START GAME';\n              startButton.addEventListener('click', () => {\n                document.querySelector('.fleet-prep').remove();\n                this.renderGameplay();\n              });\n\n              rotateButton.insertAdjacentElement('afterend', startButton);\n              rotateButton.remove();\n\n              instructions.textContent = 'ready to play?';\n\n              while (container.firstChild) {\n                container.removeChild(container.lastChild);\n              }\n\n              for (let row = 0; row < 10; row++) {\n                for (let column = 0; column < 10; column++) {\n                  let square = document.createElement('div');\n                  square.setAttribute('class', 'square');\n                  square.dataset.position = `${row}${column}`;\n\n                  if (this.humanGameboard.board[row][column].shipName !== undefined) {\n                    square.style.backgroundColor = this.alreadyPlacedColor;\n                    if (this.humanGameboard.board[row][column].shipPos === 0) {\n                      const shipName = this.humanGameboard.board[row][column].shipName;\n                      this.placeShipImage(square, shipName, this.humanGameboard.ships[shipName].orientation, 'large');\n                    }\n                  }\n                  container.appendChild(square);\n                }\n              }\n\n            } else {\n              this.selectNextShip();\n              instructions.textContent = this.shipPlacementCommand;\n              this.renderGrid(container, instructions);\n            }\n          }\n        })\n        square.addEventListener('mouseenter', (e) => {\n          if (!this.checkPlacementFunction(row, column, this.shipLength)) {\n            square.style.backgroundColor = 'red';\n          } else {\n            if (this.orientation === 'horizontal') {\n              for (let i = 0; i < this.shipLength; i++) {\n                const nextSquare = document.querySelector(`[data-position='${row}${column + i}']`);\n                nextSquare.style.backgroundColor = 'green';\n              }\n            } else {\n              for (let i = 0; i < this.shipLength; i++) {\n                const nextSquare = document.querySelector(`[data-position='${row + i}${column}']`);\n                nextSquare.style.backgroundColor = 'green';\n              }\n            }\n          }\n        });\n        square.addEventListener('mouseleave', () => {\n          if (!this.checkPlacementFunction(row, column, this.shipLength)) {\n            if (this.humanGameboard.board[row][column].shipName !== undefined) {\n              square.style.backgroundColor = this.alreadyPlacedColor;\n            } else {\n              square.style.backgroundColor = 'black';\n            }\n          } else {\n            if (this.orientation === 'horizontal') {\n              for (let i = 0; i < this.shipLength; i++) {\n                const nextSquare = document.querySelector(`[data-position='${row}${column + i}']`);\n                nextSquare.style.backgroundColor = 'black';\n              }\n            } else {\n              for (let i = 0; i < this.shipLength; i++) {\n                const nextSquare = document.querySelector(`[data-position='${row + i}${column}']`);\n                nextSquare.style.backgroundColor = 'black';\n              }\n            }\n          }\n        })\n        container.appendChild(square);\n      }\n    }\n  }\n\n  placeShipImage(square, name, orientation, gridSize) {\n    const shipImage = document.createElement('img');\n    shipImage.classList.add('ship-image');\n\n    if (orientation === 'horizontal') {\n      if (gridSize === 'large') {\n        (name === 'patrolBoat') ? shipImage.classList.add('patrol-boat-horizontal-large') :\n          (name === 'submarine') ? shipImage.classList.add('submarine-horizontal-large') :\n            (name === 'destroyer') ? shipImage.classList.add('destroyer-horizontal-large') :\n              (name === 'battleship') ? shipImage.classList.add('battleship-horizontal-large') :\n                shipImage.classList.add('carrier-horizontal-large');\n      } else if (gridSize === 'small') {\n        (name === 'patrolBoat') ? shipImage.classList.add('patrol-boat-horizontal-small') :\n          (name === 'submarine') ? shipImage.classList.add('submarine-horizontal-small') :\n            (name === 'destroyer') ? shipImage.classList.add('destroyer-horizontal-small') :\n              (name === 'battleship') ? shipImage.classList.add('battleship-horizontal-small') :\n                shipImage.classList.add('carrier-horizontal-small');\n      }\n    } else if (orientation === 'vertical') {\n      if (gridSize === 'large') {\n        (name === 'patrolBoat') ? shipImage.classList.add('patrol-boat-vertical-large') :\n          (name === 'submarine') ? shipImage.classList.add('submarine-vertical-large') :\n            (name === 'destroyer') ? shipImage.classList.add('destroyer-vertical-large') :\n              (name === 'battleship') ? shipImage.classList.add('battleship-vertical-large') :\n                shipImage.classList.add('carrier-vertical-large');\n      } else if (gridSize === 'small') {\n        (name === 'patrolBoat') ? shipImage.classList.add('patrol-boat-vertical-small') :\n          (name === 'submarine') ? shipImage.classList.add('submarine-vertical-small') :\n            (name === 'destroyer') ? shipImage.classList.add('destroyer-vertical-small') :\n              (name === 'battleship') ? shipImage.classList.add('battleship-vertical-small') :\n                shipImage.classList.add('carrier-vertical-small');\n      }\n      shipImage.classList.add('vertical');\n    }\n\n    shipImage.src = `./battleships/${name}.png`;\n    square.append(shipImage);\n  }\n\n  renderGameplay() {\n    const gameplay = document.createElement('div');\n    gameplay.classList.add('gameplay');\n\n    const gameplayHeading = document.createElement('h2');\n    gameplayHeading.classList.add('gameplay-heading');\n    gameplayHeading.textContent = 'sink them before they sink you.';\n\n    const gameplayMain = document.createElement('div');\n    gameplayMain.classList.add('gameplay-main');\n\n    const gameplayHuman = document.createElement('div');\n    gameplayHuman.classList.add('gameplay-human');\n    const gameplayComputer = document.createElement('div');\n    gameplayComputer.classList.add('gameplay-computer');\n\n    const humanHeading = document.createElement('h3');\n    humanHeading.classList.add('human-heading');\n    humanHeading.textContent = 'your fleet';\n\n    const humanGrid = document.createElement('div');\n    humanGrid.classList.add('human-grid');\n    this.renderGameplayGrid(humanGrid, this.humanGameboard);\n\n    const computerHeading = document.createElement('h3');\n    computerHeading.classList.add('computer-heading');\n    computerHeading.textContent = 'enemy terrain';\n\n    const computerGrid = document.createElement('div');\n    computerGrid.classList.add('computer-grid');\n    this.renderGameplayGrid(computerGrid, this.computerGameboard);\n\n    const instructions = document.createElement('p');\n    instructions.classList.add('gameplay-instructions');\n    instructions.textContent = 'To play, fire upon (click on) the enemy gameboard to your right. But watch out! Every shot you fire will result in your getting fired upon as well! Try to beat the computer by being first to sink all 5 ships!';\n\n    gameplayHuman.append(humanHeading, humanGrid);\n    gameplayComputer.append(computerHeading, computerGrid);\n    gameplayMain.append(gameplayHuman, instructions, gameplayComputer);\n    gameplay.append(gameplayHeading, gameplayMain);\n    this.app.append(gameplay);\n  }\n\n  renderGameplayGrid(container, gameboard) {\n    for (let row = 0; row < 10; row++) {\n      for (let column = 0; column < 10; column++) {\n        let square = document.createElement('div');\n        square.setAttribute('class', 'square');\n        square.dataset.position = `${row}${column}`;\n\n        if (gameboard === this.humanGameboard) {\n          square.style.cursor = 'default';\n          if (gameboard.board[row][column].shipName !== undefined) {\n            square.style.backgroundColor = this.alreadyPlacedColor;\n            if (this.humanGameboard.board[row][column].shipPos === 0) {\n              const shipName = this.humanGameboard.board[row][column].shipName;\n              this.placeShipImage(square, shipName, this.humanGameboard.ships[shipName].orientation, 'small');\n            }\n          }\n        }\n\n        if (container.classList.contains('computer-grid')) {\n          square.addEventListener('click', () => {\n            this.playRound(row, column);\n            const winner = this.checkWinner(this.humanGameboard, this.computerGameboard);\n            if (winner === undefined) {\n              return\n            } else if (winner === 'computer') {\n              document.querySelector('.gameplay').remove();\n              this.renderComputerWins();\n            } else {\n              document.querySelector('.gameplay').remove();\n              this.renderHumanWins();\n            }\n          });\n        }\n\n        //Add highliting when player moves cursor over CPU gameboard\n        if (gameboard === this.computerGameboard) {\n          square.addEventListener('mouseenter', (e) => {\n            square.style.opacity = '.5';\n          });\n          square.addEventListener('mouseleave', () => {\n            square.style.opacity = '1';\n          });\n        };\n\n        container.appendChild(square);\n      }\n    }\n  }\n\n  playRound(row, column) {\n    if (this.computerGameboard.canAttack(row, column)) {\n      this.humanPlayer.move(row, column);\n      const [rowCPU, columnCPU] = this.computerPlayer.move();\n\n      const humanGrid = document.querySelector('.human-grid');\n      const computerGrid = document.querySelector('.computer-grid');\n\n      const shotByPlayer = computerGrid.querySelector(`[data-position='${row}${column}']`);\n      const shotByComputer = humanGrid.querySelector(`[data-position='${rowCPU}${columnCPU}']`);\n\n      const replacementSquare = document.createElement('div');\n      replacementSquare.setAttribute('class', 'square');\n      replacementSquare.dataset.position = `${row}${column}`;\n\n      this.addIconToSquare(shotByComputer, this.humanGameboard.board[rowCPU][columnCPU].status);\n      this.addIconToSquare(replacementSquare, this.computerGameboard.board[row][column].status);\n\n      computerGrid.replaceChild(replacementSquare, shotByPlayer);\n\n      const computerShipName = this.computerGameboard.board[row][column].shipName;\n      const humanShipName = this.humanGameboard.board[rowCPU][columnCPU].shipName;\n\n      this.handleSunk('computer', computerShipName, computerGrid);\n      this.handleSunk('human', humanShipName, humanGrid);\n\n    }\n  };\n\n  handleSunk(player, shipName, grid) {\n    const gameboard = (player === 'computer') ?\n      this.computerGameboard :\n      this.humanGameboard;\n\n    if (shipName && gameboard.ships[shipName].sunk) {\n      const [originRow, originColumn] = gameboard.ships[shipName].origin;\n      const orientation = gameboard.ships[shipName].orientation;\n      const length = gameboard.ships[shipName].length;\n\n      if (orientation === 'horizontal') {\n        for (let i = 0; i < length; i++) {\n          grid.querySelector(`[data-position='${originRow}${originColumn + i}']`).style.backgroundColor = 'red';\n        }\n      } else {\n        for (let i = 0; i < length; i++) {\n          grid.querySelector(`[data-position='${originRow + i}${originColumn}']`).style.backgroundColor = 'red';\n        }\n      }\n      if (player === 'computer') {\n        const originSquare = grid.querySelector(`[data-position='${originRow}${originColumn}']`);\n        this.placeShipImage(originSquare, shipName, orientation, 'small');\n      }\n    }\n  }\n\n  addIconToSquare(square, status) {\n    if (status === 'miss') {\n      const missIcon = document.createElement('img');\n      missIcon.classList.add('miss');\n      missIcon.src = \"./splash.png\";\n      square.append(missIcon);\n    } else {\n      const hitIcon = document.createElement('img');\n      hitIcon.classList.add('hit');\n      hitIcon.src = \"./explosion.png\";\n      square.append(hitIcon);\n    }\n  }\n\n  renderComputerWins() {\n    const loseScreen = document.createElement('div');\n    loseScreen.classList.add('lose-screen');\n\n    const loseMessage = document.createElement('h2');\n    loseMessage.classList.add('lose-message');\n    loseMessage.textContent = 'Aw, nuts. You lost!'\n\n    const playAgain = document.createElement('a');\n    playAgain.href = './';\n    playAgain.textContent = 'PLAY AGAIN?'\n    playAgain.classList.add('button');\n    playAgain.classList.add('play-again');\n\n    loseScreen.append(loseMessage, playAgain);\n\n    this.app.append(loseScreen);\n\n  }\n\n  renderHumanWins() {\n    const winScreen = document.createElement('div');\n    winScreen.classList.add('win-screen');\n\n    const winMessage = document.createElement('h2');\n    winMessage.classList.add('win-message');\n    winMessage.textContent = `Captain ${this.name}, you are a god.`\n\n    const playAgain = document.createElement('a');\n    playAgain.classList.add('button');\n    playAgain.href = './';\n    playAgain.textContent = 'PLAY AGAIN?';\n    playAgain.classList.add('play-again');\n\n    winScreen.append(winMessage, playAgain);\n\n    this.app.append(winScreen);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DomStuff);\n\n//# sourceURL=webpack://battleship/./src/dom/dom.js?");

/***/ }),

/***/ "./src/gameboard/gameboard.js":
/*!************************************!*\
  !*** ./src/gameboard/gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ship/ship */ \"./src/ship/ship.js\");\n\n\nconst gameboardFactory = () => {\n\n  const shipDetailsObject = {\n    patrolBoat: 2,\n    submarine: 3,\n    destroyer: 3,\n    battleship: 4,\n    carrier: 5,\n  }\n\n  const board = [];\n\n  const ships = {};\n\n  const shotsFired = [];\n\n  //Instantiate board as 2-dim Array (10x10) of objects\n  for (let i = 0; i < 10; i++) {\n    board[i] = [];\n    for (let j = 0; j < 10; j++) {\n      board[i][j] = {\n        shipName: undefined,\n        shipPos: undefined,\n        status: undefined,\n      };\n    }\n  };\n\n  //Check if horizontal placement of ships will collide with edge or other ships\n  const canPlaceHorizontal = (row, column, length) => {\n    if (column + length > 10) {\n      return false;\n    }\n    for (let i = 0; i < length; i++) {\n      if (board[row][column + i].shipName !== undefined) {\n        return false;\n      }\n    }\n    return true;\n  }\n\n  const canPlaceVertical = (row, column, length) => {\n    if (row + length > 10) {\n      return false;\n    }\n    for (let i = 0; i < length; i++) {\n      if (board[row + i][column].shipName !== undefined) {\n        return false;\n      }\n    }\n    return true;\n  }\n\n  const place = (row, column, shipName, orientation) => {\n\n    const shipLength = shipDetailsObject[shipName];\n\n    if (orientation === 'horizontal') {\n      if (!canPlaceHorizontal(row, column, shipLength)) {\n        throw new Error('check canPlaceHorizontal before calling place')\n      }\n      for (let i = 0; i < shipLength; i++) {\n        board[row][column + i].shipName = shipName;\n        board[row][column + i].shipPos = i;\n      }\n    } else if (orientation === 'vertical') {\n      if (!canPlaceVertical(row, column, shipLength)) {\n        return;\n        // throw new Error('check canPlaceVertical before calling place')\n      }\n      for (let i = 0; i < shipLength; i++) {\n        board[row + i][column].shipName = shipName;\n        board[row + i][column].shipPos = i;\n      }\n    } else {\n      throw new Error(\"orientation must be 'horizontal' or 'vertical'\");\n    }\n\n    const { hit, isSunk } = (0,_ship_ship__WEBPACK_IMPORTED_MODULE_0__.default)(shipLength);\n\n    ships[shipName] = {\n      hit,\n      isSunk,\n      length: shipLength,\n      orientation,\n      origin: [row, column],\n      sunk: false,\n    };\n  };\n\n  const hitInfoOrMiss = (row, column) => {\n    if (board[row][column].shipName === undefined) {\n      return 'miss';\n    } else {\n      return { ...board[row][column] };\n    }\n  };\n\n  const canAttack = (row, column) => {\n    if ((row < 0 || row > 9 || column < 0 || column > 9)) {\n      return false;\n    }\n    for (const shot of shotsFired) {\n      if (row === shot[0] && column === shot[1]) {\n        return false;\n      }\n    }\n    return true;\n  }\n\n  //takes x and y coordinates\n  //checks if hit/miss,\n  //\n  //Records misses/sends hit function to hit ships/\n  const handleAttack = (row, column) => {\n    if (!canAttack(row, column)) {\n      throw new Error('Space already fired upon');\n    }\n    const hitInfo = hitInfoOrMiss(row, column);\n\n    if (hitInfo === 'miss') {\n      board[row][column].status = 'miss';\n      shotsFired.push([row, column, 'miss']);\n    } else {\n      const shipName = board[row][column].shipName;\n      const shipPos = board[row][column].shipPos;\n      const currentShip = ships[shipName];\n      let sunkStatus = false;\n\n      board[row][column].status = 'hit';\n      currentShip.hit(shipPos);\n\n      if (currentShip.isSunk()) {\n        currentShip.sunk = true;\n        sunkStatus = true;\n      };\n\n      shotsFired.push([row, column, 'hit', shipName, sunkStatus]);\n    }\n  };\n\n  const allSunk = () => {\n    for (const currentShip in ships) {\n      if (!ships[currentShip].sunk) {\n        return false;\n      }\n    }\n    return true;\n  }\n\n  return { board, place, canPlaceHorizontal, canPlaceVertical, ships, handleAttack, hitInfoOrMiss, shotsFired, allSunk, canAttack, shipDetailsObject };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboardFactory);\n\n//# sourceURL=webpack://battleship/./src/gameboard/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/dom */ \"./src/dom/dom.js\");\n/* harmony import */ var _player_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player/player */ \"./src/player/player.js\");\n/* harmony import */ var _gameboard_gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard/gameboard */ \"./src/gameboard/gameboard.js\");\n\n\n\n\nlet name;\nlet computerPlayer = {};\nlet humanPlayer = {};\nlet computerGameboard = {};\nlet humanGameboard = {};\n\n\nfunction startNewGame() {\n  computerGameboard = (0,_gameboard_gameboard__WEBPACK_IMPORTED_MODULE_2__.default)();\n  humanGameboard = (0,_gameboard_gameboard__WEBPACK_IMPORTED_MODULE_2__.default)();\n  computerPlayer = (0,_player_player__WEBPACK_IMPORTED_MODULE_1__.default)('computer', humanGameboard);\n  humanPlayer = (0,_player_player__WEBPACK_IMPORTED_MODULE_1__.default)('human', computerGameboard);\n\n  placeComputerShips(computerGameboard);\n\n  const domStuff = new _dom_dom__WEBPACK_IMPORTED_MODULE_0__.default(\n    humanGameboard,\n    computerGameboard,\n    humanPlayer,\n    computerPlayer,\n    checkWinner,\n  );\n}\n\nfunction placeComputerShips(gameboard) {\n  for (const shipName in gameboard.shipDetailsObject) {\n    const shipLength = gameboard.shipDetailsObject[shipName];\n    const orientations = ['horizontal', 'vertical'];\n    let orientation = orientations[Math.floor(Math.random() * 2)];\n    let row = Math.floor(Math.random() * 10);\n    let column = Math.floor(Math.random() * 10);\n    let checkPlacementFunction =\n      (orientation === 'horizontal') ?\n        gameboard.canPlaceHorizontal :\n        gameboard.canPlaceVertical;\n\n    while (!checkPlacementFunction(row, column, shipLength)) {\n      orientation = orientations[Math.floor(Math.random() * 2)];\n      row = Math.floor(Math.random() * 10);\n      column = Math.floor(Math.random() * 10);\n      checkPlacementFunction =\n        (orientation === 'horizontal') ?\n          gameboard.canPlaceHorizontal :\n          gameboard.canPlaceVertical;\n    }\n    gameboard.place(row, column, shipName, orientation);\n  }\n}\n\nfunction checkWinner(humanGameboard, computerGameboard) {\n  if (humanGameboard.allSunk()) {\n    return 'computer';\n  } else if (computerGameboard.allSunk()) {\n    return 'human';\n  }\n}\n\nstartNewGame();\n\n\n\n\n// computerGameboard.place(0,0, 'patrolBoat', 'horizontal');\n// computerGameboard.place(1,0, 'submarine', 'horizontal');\n// computerGameboard.place(2,0, 'destroyer', 'horizontal');\n// computerGameboard.place(3,0, 'battleship', 'horizontal');\n// computerGameboard.place(4,0, 'carrier', 'horizontal');\n\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player/player.js":
/*!******************************!*\
  !*** ./src/player/player.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst playerFactory = (type, gameboard) => {\n\n  let computerMove;\n  let removeFromList;\n  const computerMoveList = {};\n  let computerMoveStatus = 'random';\n  let unresolvedComputerMoves = [];\n\n  if (type === 'computer') {\n    for (let i = 0; i < 10; i++) {\n      computerMoveList[i.toString()] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];\n    }\n\n    removeFromList = (row, column) => {\n      const rowString = row.toString();\n      const positionInArrayOfColumns = computerMoveList[rowString].indexOf(column);\n      computerMoveList[rowString].splice(positionInArrayOfColumns, 1);\n      if (computerMoveList[rowString].length === 0) {\n        delete computerMoveList[rowString];\n      }\n    }\n\n    computerMove = () => {\n      if (unresolvedComputerMoves.length === 0) {\n        computerMoveStatus = 'random';\n      }\n      if (computerMoveStatus === 'random') {\n        const keys = Object.keys(computerMoveList);\n        const rowString = keys[Math.floor(keys.length * Math.random())];\n        const positionInArrayOfColumns = Math.floor(computerMoveList[rowString].length * Math.random());\n        const columnNum = computerMoveList[rowString][positionInArrayOfColumns];\n\n        const rowNum = parseInt(rowString);\n\n        computerMoveList[rowString].splice(positionInArrayOfColumns, 1);\n        if (computerMoveList[rowString].length === 0) {\n          delete computerMoveList[rowString];\n        }\n        const move = [rowNum, columnNum];\n        return move;\n\n      } else if (computerMoveStatus === 'tactical') {\n\n        const remainingMoves = unresolvedComputerMoves.length;\n\n        //check for horizontal alignment\n        for (let i = 0; i < remainingMoves; i++) {\n          const unresolvedMove = unresolvedComputerMoves[i];\n          for (let j = 0; j < remainingMoves; j++) {\n            const comparisonMove = unresolvedComputerMoves[j];\n            if (Math.abs(unresolvedMove[1] - comparisonMove[1]) === 1) {\n              if (gameboard.canAttack(unresolvedMove[0], unresolvedMove[1] + 1)) {\n                const move = [unresolvedMove[0], unresolvedMove[1] + 1];\n                removeFromList(...move);\n                return move;\n              }\n              else if (gameboard.canAttack(unresolvedMove[0], unresolvedMove[1] - 1)) {\n                const move = [unresolvedMove[0], unresolvedMove[1] - 1];\n                removeFromList(...move);\n                return move;\n              }\n            }\n          }\n        }\n\n        //check for vertical alignment\n        for (let i = 0; i < remainingMoves; i++) {\n          const unresolvedMove = unresolvedComputerMoves[i];\n          for (let j = 0; j < remainingMoves; j++) {\n            const comparisonMove = unresolvedComputerMoves[j];\n            if (Math.abs(unresolvedMove[0] - comparisonMove[0]) === 1) {\n              console.log('in vertical line')\n              if (gameboard.canAttack(unresolvedMove[0] + 1, unresolvedMove[1])) {\n                const move = [unresolvedMove[0] + 1, unresolvedMove[1]];\n                removeFromList(...move);\n                return move;\n              }\n              else if (gameboard.canAttack(unresolvedMove[0] - 1, unresolvedMove[1])) {\n                const move = [unresolvedMove[0] - 1, unresolvedMove[1]];\n                removeFromList(...move);\n                return move;\n              }\n            }\n          }\n        }\n\n        for (let i = 0; i < remainingMoves; i++) {\n          const unresolvedMove = unresolvedComputerMoves[i];\n          const potentialMoves = [[unresolvedMove[0] + 1, unresolvedMove[1]], [unresolvedMove[0] - 1, unresolvedMove[1]], [unresolvedMove[0], unresolvedMove[1] + 1], [unresolvedMove[0], unresolvedMove[1] - 1]];\n\n          //randomize moves\n          for (let i = potentialMoves.length - 1; i > 0; i--) {\n            const j = Math.floor(Math.random() * (i + 1));\n            const temp = potentialMoves[i];\n            potentialMoves[i] = potentialMoves[j];\n            potentialMoves[j] = temp;\n          }\n\n          for (const move of potentialMoves) {\n            if (gameboard.canAttack(...move)) {\n              removeFromList(...move);\n              return move;\n            }\n          }\n        }\n      }\n    };\n  }\n\n  const move = (row, column) => {\n    if (type === \"human\") {\n      gameboard.handleAttack(row, column);\n    } else {\n      const [rowCPU, columnCPU] = computerMove();\n      gameboard.handleAttack(rowCPU, columnCPU);\n      const lastShot = gameboard.shotsFired[gameboard.shotsFired.length - 1]\n      if (lastShot[2] === 'hit') {\n        unresolvedComputerMoves.push([rowCPU, columnCPU, lastShot[3]]);\n        computerMoveStatus = 'tactical';\n        if (lastShot[4]) {\n          unresolvedComputerMoves = unresolvedComputerMoves.filter((computerMove) => {\n            return computerMove[2] !== lastShot[3];\n          })\n        }\n      }\n      return [rowCPU, columnCPU];\n    };\n  }\n  return { move, computerMove };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playerFactory);\n\n//# sourceURL=webpack://battleship/./src/player/player.js?");

/***/ }),

/***/ "./src/ship/ship.js":
/*!**************************!*\
  !*** ./src/ship/ship.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst shipFactory = (length) => {\n  const hitArray = Array(length).fill(0);\n\n\n  const hit = (position) => {\n    hitArray[position] = 1;\n  }\n\n  const isSunk = () => {\n    for (let i = 0; i < hitArray.length; i++) {\n      if (hitArray[i] === 0) {\n        return false;\n      };\n    }\n    return true;\n  }\n\n  return {\n    length, hitArray, hit, isSunk,\n  };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipFactory);\n\n//# sourceURL=webpack://battleship/./src/ship/ship.js?");

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