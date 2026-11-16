const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');

// eslint-disable-next-line max-len
// const iconURI = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path fill="none" stroke="#fff" stroke-width="11.51815371" d="M24.457 7.707a18.41 18.41 0 0 0-.365 2.31c-.02.224 0 .507.06.852.061.405.092.689.092.851 0 .527-.345.79-1.034.79-.446 0-.74-.131-.881-.395-.02-.446-.01-1.054.03-1.824.04-.912.061-1.52.061-1.824-.02 0-.05-.02-.091-.06a98.522 98.522 0 0 0-5.32.364c-.04.264-.04.588 0 .973l.122 1.094c-.081.629-.122 1.56-.122 2.797.061.527.091 2.786.091 6.779v2.219c0 .344.051.587.152.73h1.885c.77-.102 1.155.222 1.155.972 0 .446-.213.76-.638.942-.264.102-.73.122-1.399.061-.405-.04-.881-.05-1.428-.03-.75.101-1.662.182-2.736.243-1.094.06-1.763-.091-2.006-.456-.162-.243-.162-.496 0-.76.283-.446 1.023-.669 2.219-.669.628 0 .942-.172.942-.516 0-.183-.01-.355-.03-.517 0-.507.01-.953.03-1.338.06-1.094.06-2.634 0-4.62-.081-2.878-.05-5.462.091-7.752l-.09-.09c-.63.04-1.805.03-3.527-.031-.081 0-.7.04-1.854.121.283 1.946.446 3.334.486 4.165l-.06.82c-.021.305-.274.457-.76.457-.386 0-.71-.73-.973-2.19-.122-.87-.244-1.752-.365-2.644 0-.142-.071-.385-.213-.73-.122-.364-.39-.97-.39-1.152 0-.641.593-.489 1.363-.61.06 0 .162.01.304.03.142.02.243.03.304.03H17.1a57.098 57.098 0 0 0 5.411-.486c.122-.06.304-.121.547-.182.426-.04.79.06 1.095.304.304.223.405.547.304.972z"/><path fill="none" stroke="#ff4c4c" stroke-width="5.75909785" d="M24.333 7.71q-.244 1.065-.365 2.311-.03.335.06.851.092.608.092.851 0 .79-1.034.79-.669 0-.881-.394-.03-.67.03-1.824.06-1.368.06-1.824-.03 0-.09-.061-2.827.122-5.32.365-.06.395 0 .973l.122 1.094q-.122.942-.122 2.796.091.79.091 6.78v2.218q0 .517.152.73h1.885q1.155-.152 1.155.973 0 .668-.638.942-.396.152-1.399.06-.608-.06-1.428-.03-1.125.152-2.736.243-1.642.092-2.006-.456-.244-.364 0-.76.425-.668 2.219-.668.942 0 .942-.517 0-.274-.03-.517 0-.76.03-1.337.091-1.642 0-4.62-.122-4.317.091-7.752l-.091-.091q-.942.06-3.526-.03-.122 0-1.854.12.425 2.919.486 4.165l-.06.821q-.031.456-.76.456-.578 0-.974-2.189-.182-1.307-.364-2.644 0-.213-.213-.73-.182-.547-.182-.82 0-.76 1.155-.943.09 0 .304.03.212.03.304.03h7.538q2.797-.12 5.411-.485.182-.092.547-.183.639-.06 1.095.304.456.335.304.973z"/><path fill="#fff" d="M24.31 7.714q-.243 1.064-.365 2.31-.03.335.061.852.091.608.091.85 0 .791-1.033.791-.67 0-.882-.395-.03-.669.03-1.824.061-1.368.061-1.824-.03 0-.09-.06-2.828.121-5.32.364-.061.396 0 .973l.121 1.094q-.121.943-.121 2.797.09.79.09 6.779v2.219q0 .517.153.73h1.884q1.156-.153 1.156.972 0 .669-.639.942-.395.152-1.398.061-.608-.06-1.429-.03-1.125.152-2.736.243-1.641.091-2.006-.456-.243-.365 0-.76.426-.669 2.22-.669.941 0 .941-.516 0-.274-.03-.517 0-.76.03-1.338.092-1.641 0-4.62-.121-4.317.092-7.752l-.092-.09q-.942.06-3.526-.031-.121 0-1.854.121.426 2.919.486 4.165l-.06.82q-.03.457-.76.457-.578 0-.973-2.19-.182-1.306-.365-2.644 0-.212-.213-.73-.182-.546-.182-.82 0-.76 1.155-.942.091 0 .304.03t.304.03h7.539q2.796-.121 5.41-.486.183-.091.548-.182.638-.061 1.094.304.456.334.304.972z"/></svg>')}`;

 const iconURI = `data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxODAuNjM4NTkiIGhlaWdodD0iMjYxLjA5MDQ3IiB2aWV3Qm94PSIwLDAsMTgwLjYzODU5LDI2MS4wOTA0NyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0OC4wOTA1OCwtNTIuMzM1NjMpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0zMjAuNzI5MTcsMjM2LjUxNTQ2Yy05Ljg4ODExLDI3LjM5ODk1IC0zNi43NjY2Myw0NC4wNTI2MSAtNzkuODcwMjMsNDkuNTAxNzhjLTEuOTU5MjUsMC4yNDQ5MSAtMy44ODc5LDAuMzk3OTcgLTUuODE2NTQsMC40NTkyYy0yLjUxMDI5LDMuNjczNiAtNS43ODU5Miw2Ljg1NzM5IC05LjY0MzIsOS4zMzcwN2MtMTAuMTAyNDEsNi40NTk0MiAtMTkuNTYxOTMsOS42MTI1OSAtMjguODk5LDkuNjEyNTljLTE5LjE5NDU3LDAgLTM5Ljg1ODU4LC0xNC4zMjcwNSAtMzkuODU4NTgsLTQ1Ljc5NzU3YzAsLTIuMTQyOTMgMC4wOTE4NCwtNC45Mjg3NSAwLjMwNjEzLC04Ljc4NjAzYzAuMDkxODQsLTEuNjUzMTIgMC4xODM2OCwtMi45Mzg4OCAwLjIxNDI5LC0zLjg4NzljLTAuNTIwNDMsLTIuMzg3ODQgLTAuNzk1OTUsLTQuODA2MyAtMC43OTU5NSwtNy4yNTUzNnYtMTQuODE2ODZjMCwtMi40MTg0NSAwLjI0NDkxLC00LjgzNjkxIDAuNzM0NzIsLTcuMjU1MzZjMC4wMzA2MSwtMi4wNTEwOSAwLjEyMjQ1LC00LjM0NzEgMC4yNzU1MiwtNi44NTczOWMtMC43MzQ3MiwtMi42OTM5NyAtMS4yODU3NiwtNS44MTY1NCAtMS4yODU3NiwtOS4zMDY0NmMwLC0xLjU5MTg5IDAuMTIyNDUsLTMuMTgzNzkgMC4zMzY3NSwtNC43NDUwN2MxLjE2MzMxLC04LjIwNDM4IDQuODA2MywtMTYuNDM5MzcgMTAuOTU5NTgsLTIzLjAyMTI0Yy0yLjExMjMyLC01LjkwODM4IC0zLjIxNDQsLTEyLjE1MzUgLTMuMjE0NCwtMTguNTUxNjl2LTE1LjYxMjgxYzAsLTYuMzM2OTYgMS4yNTUxNSwtMTQuMjM1MjEgNy40MDg0MywtMzMuODg4OThjMi41NzE1MiwtOC40NDkyOCAzLjM5ODA4LC0xMS4wODIwMyA0LjUzMDc4LC0xMy41MzExYzYuMDMwODMsLTEzLjUzMTEgMTUuMTIyOTksLTIwLjI5NjY1IDIxLjczNTQ4LC0yMy42MzM1MWMxMC44MDY1MSwtNS4zODc5NSAyMi40MDg5NywtOC4xNDMxNSAzNC40NzA2MywtOC4xNDMxNWM1LjU3MTYzLDAgMTAuODk4MzUsMC41ODE2NSAxNS45ODAxNywxLjY4MzczYzIuMjY1MzksLTEuNTMwNjcgNC42ODM4NCwtMi44MTY0MyA3LjI1NTM2LC0zLjg4NzljMy4yNzU2MywtMS40MDgyMSA2Ljc2NTU1LC0yLjM4Nzg0IDEwLjYyMjgzLC0zLjAwMDExYzkuNjQzMiwtMS42NTMxMiAxOS44Mzc0NSwwLjM5Nzk3IDI4LjcxNTMyLDUuNzg1OTJjOS4zMzcwNyw1LjY5NDA4IDIwLjA1MTc0LDE3LjUxMDg0IDE4LjczNTM3LDQxLjgxNzgzYy0wLjIxNDI5LDQuMjg1ODcgLTAuNTgxNjUsMTAuMDEwNTcgLTEuMTMyNjksMTcuNDgwMjJjLTAuMDMwNjEsMC4xODM2OCAtMC4wMzA2MSwwLjM2NzM2IC0wLjA2MTIzLDAuNTUxMDRjLTAuNDg5ODEsNS40MTg1NiAtMS4xOTM5MiwxMy41MDA0OSAtMi4xNDI5MywyNC4xODQ1NWMwLjI0NDkxLDQuMTMyOCAwLjE1MzA3LDguNzU1NDIgLTAuMjE0MjksMTQuMjA0NTljLTAuMTUzMDcsMi4wODE3MSAtMC40ODk4MSw0LjE2MzQyIC0xLjA0MDg1LDYuMTgzOWMtMC4xMjI0NSwwLjQ1OTIgLTAuMjQ0OTEsMC44ODc3OSAtMC4zNjczNiwxLjI4NTc2YzQuMTMyOCw1LjI5NjExIDYuOTQ5MjMsMTAuNTkyMjIgOC44Nzc4NywxNS4xODQyMmMxLjgwNjE5LDMuNjQyOTkgMy4zMzY4Niw3LjgzNzAyIDQuNjgzODQsMTIuOTQ5NDVjMC41MjA0MywxLjkyODY0IDAuODU3MTcsMy44ODc5IDEuMDEwMjQsNS44Nzc3NmMxLjM3NzYsMTcuMTc0MDkgMC42NzM0OSwyNy4zMDcxMSAtMi41MTAyOSwzNS44Nzg4NHoiIGZpbGw9IiM0YTg4MDAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxNiIvPjxwYXRoIGQ9Ik0yODkuNjc0OTksMjAzLjM0MjgzYzAuODk2OTcsMTEuMTM0MDcgMC43MTMyOSwxOC4zMDk4NCAtMC41Mzg3OSwyMS41NDI2MWMtNS4yMTAzOSwxNC43MjE5NiAtMjIuNzE1MSwyMy45NjQxMyAtNTIuNTA4MDIsMjcuNzM1NjljLTEwLjA1NjQ5LDEuMjU4MjEgLTIwLjEwNjg1LC0zLjQ5OTExIC0zMC4xNjMzMywtMTQuMjcxOTRjMCwxLjYxNjM4IDAuMzU4MTgsNi40NjI0OCAxLjA4MDY1LDE0LjU0NDRjMC41Mzg3OSw1LjkyMzY4IDAuNDQ2OTUsMTAuNzY5NzggLTAuMjY5NCwxNC41MzgyOGMtNC40OTA5OCwyLjg3MTUzIC04LjA3ODg2LDQuMzEwMzYgLTEwLjc3Mjg0LDQuMzEwMzZjLTQuMTMyOCwwIC02LjE5MzA4LC00LjAzNzkgLTYuMTkzMDgsLTEyLjExOTgyYzAsLTEuNDM1NzcgMC4wODg3OCwtMy43MjI1OCAwLjI2OTQsLTYuODYzNTFjMC4xNzc1NiwtMy4xMzc4NyAwLjI2OTQsLTUuMzM4OTcgMC4yNjk0LC02LjU5NzE4YzAsLTMuMDUyMTUgLTAuMjY5NCwtNS4yMDQyNyAtMC44MDgxOSwtNi40NjI0OHYtMTQuODEwNzRjMCwtMC4zNTgxOCAwLjA4ODc4LC0wLjc2MjI3IDAuMjY5NCwtMS4yMTIyOWMwLjE3NzU2LC0wLjQ0Njk1IDAuMzU4MTgsLTAuODUxMDUgMC41Mzg3OSwtMS4yMTIyOWMtMC4xODA2MiwtMi41MTAyOSAtMC4wOTE4NCwtNi4zNzA2NCAwLjI2OTQsLTExLjU3Nzk3YzAuMzU4MTgsLTMuMjMyNzcgMC4zNTgxOCwtNS4yOTMwNSAwLC02LjE5MzA4Yy0wLjkwMDAzLC0xLjc5MDg4IC0xLjM0MzkzLC0yLjg2ODQ3IC0xLjM0MzkzLC0zLjIyOTcxYzAuNzEzMjksLTUuMDI2NzEgNC4zOTkxNCwtNy41NDAwNyAxMS4wMzkxNywtNy41NDAwN2M0LjMwNzMsMCA2LjkwOTQzLDEuNTI3NjEgNy44MDk0Nyw0LjU3NjdjMCwyLjg3MTUzIDAuMzU4MTgsNy4wOTMxMSAxLjA3NzU5LDEyLjY1NTU2YzEuMDgwNjUsNi40NjI0OCA0LjQ4NzkyLDEyLjkyODAyIDEwLjIzNDA0LDE5LjM4NzQzYzYuMjgxODYsNy4zNjI1MSAxMi4yOTQzMiwxMC43NzI4NCAxOC4wNDM1MSwxMC4yMzQwNGM2LjQ2MjQ4LC0wLjcxMzI5IDEyLjkyNDk2LC0yLjI0MDkgMTkuMzg3NDMsLTQuNTc2N2M4Ljk3NTgzLC0zLjIzMjc3IDE0LjM2MDcyLC03LjAwMTI3IDE2LjE1NzczLC0xMS4zMDg1N2MxLjI1MjA5LC0zLjIzMjc3IDEuODgyNzIsLTYuNjQwMDQgMS44ODI3MiwtMTAuMjM0MDRjMCwtMTAuOTQ3MzMgLTQuMDM3OSwtMTkuMTE4MDQgLTEyLjExNjc2LC0yNC41MDI5MmMtMy41OTQwMSwtMi4zMzI3NCAtMTAuMjM0MDQsLTQuMjE4NTIgLTE5LjkyOTI5LC01LjY1NzM1Yy01LjU2NTUxLC0wLjcxMzI5IC04Ljk3ODksLTEuMDc3NTkgLTEwLjIzMDk4LC0xLjA3NzU5Yy04LjYxNzY2LDAuMTgwNjIgLTE2LjY1MzY2LC0yLjYwMjEzIC0yNC4xMDE4OSwtOC4zNDgyNmMtNy40NTEyOSwtNS43NDMwNiAtMTEuMTczODcsLTEyLjM4OTIyIC0xMS4xNzM4NywtMTkuOTI5Mjl2LTE1LjYxNTg3YzAsLTMuNDA3MjcgMS45NzQ1NiwtMTEuMzk3MzUgNS45MjY3NCwtMjMuOTY0MTNjMS43OTA4OCwtNS45MjY3NCAyLjc3OTY5LC05LjA2NDYxIDIuOTYzMzcsLTkuNDI1ODVjMS42MTMzMiwtMy43Njg1IDMuNjc2NjYsLTYuMjgxODYgNi4xOTAwMiwtNy41NDAwN2M2LjEwMTI0LC0zLjA0OTA5IDEyLjU2MzcyLC00LjU3NjcgMTkuMzg3NDMsLTQuNTc2N2MxMy4yODMxMywwIDIzLjA2NzE2LDUuMzg0ODkgMjkuMzUyMDgsMTYuMTU0NjZjMC41Mzg3OSwwLjUzODc5IDEuNDM1NzcsMS4zNDY5OSAyLjY5Mzk3LDIuNDI0NThjMC4xNzc1NiwtMi41MTAyOSAwLjUzODc5LC02LjM3MDY0IDEuMDc3NTksLTExLjU3Nzk3Yy0wLjE4MDYyLC0yLjMzMjc0IC0wLjM2MTI0LC00LjU3NjcgLTAuNTM4NzksLTYuNzMxODhjMCwtMi41MTAyOSAxLjI1MjA5LC00LjIxNTQ2IDMuNzY4NSwtNS4xMTU0OWMwLjcxNjM1LC0wLjM1ODE4IDEuNzA1MTYsLTAuNjI3NTcgMi45NjMzNywtMC44MDgxOWMxLjc5Mzk0LC0wLjM1ODE4IDMuNzI1NjQsMC4wOTE4NCA1Ljc5MjA1LDEuMzQzOTNjMi4wNjAyOCwxLjI1ODIxIDIuOTE0MzksNS4wMjk3NyAyLjU1NjIxLDExLjMwODU3Yy0wLjE4MDYyLDMuOTQ5MTIgLTAuNTM4NzksOS41MTQ2MyAtMS4wNzc1OSwxNi42OTM0NmMtMC41Mzg3OSw1LjkyNjc0IC0xLjM0MzkzLDE0Ljk5MTM2IC0yLjQyNDU4LDI3LjE5OTk2YzAuMzU4MTgsMi44NzE1MyAwLjM1ODE4LDYuODIzNzIgMCwxMS44NDczN2MtMC45MDAwMywzLjQxMDMzIC0zLjU5NDAxLDUuMTE1NDkgLTguMDc4ODYsNS4xMTU0OWMtMi4zMzU4LDAgLTQuNTc2NywtMC42Mjc1NyAtNi43MzE4OCwtMS44ODI3MmMtMS4wNzc1OSwtMy40MDcyNyAtMS42MTMzMiwtNC44NDkxNSAtMS42MTMzMiwtNC4zMTAzNmMwLjM1NTExLC00Ljg0NjA5IC0wLjYzMDYzLC0xMS4zMDg1NyAtMi45NjMzNywtMTkuMzg3NDNjLTEuOTc3NjIsLTQuMTI2NjggLTQuNzExMzksLTEwLjAwNDQ0IC04LjIxMzU2LC0xNy42MzYzNWMtMy41MDIxNywtNy42Mjg4NSAtOC4xMjQ3OCwtMTEuNzE1NzMgLTEzLjg2Nzg1LC0xMi4yNTQ1MmMtNy4xODE4OSwtMC41Mzg3OSAtMTEuODQ3MzcsMS44ODU3OCAtMTQuMDAyNTUsNy4yNzA2N2MtMC43MTYzNSwyLjMzNTggLTEuNzA4MjIsNS43NDkxOSAtMi45NjAzMSwxMC4yMzQwNGMtMi4xNTUxOCw2LjY0MzEgLTMuNTAyMTcsMTMuMDE2OCAtNC4wNDA5NiwxOS4xMTgwNGMtMC4xODA2MiwxLjk3NzYyIC0wLjM2MTI0LDIuNzg1ODEgLTAuNTM4NzksMi40MjQ1OGMwLjUzODc5LDMuNTk0MDEgMS4xNjYzNyw3LjE4MTg5IDEuODg1NzgsMTAuNzcyODRjMC44OTY5Nyw0LjQ4NzkyIDMuMDk4MDcsNy45MDEzMSA2LjU5NzE4LDEwLjIzMDk4YzMuNTAyMTcsMi4zMzU4IDEwLjE4NTA2LDMuNzY4NSAyMC4wNjA5Myw0LjMwNzNjMjQuMjMzNTMsMS40NDE4OSAzOS4yMjE4Miw5Ljg3ODkzIDQ0Ljk2Nzk1LDI1LjMxNDE4YzAuODkzOTEsMS40Mzg4MyAxLjc5MDg4LDMuODYwMzQgMi42OTA5MSw3LjI2NzYxeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPg==`;

/**
 * Class for NitroBolt blocks
 * @constructor
 */
class SpinachModBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'tw',
            name: 'SpinachMod',
            color1: '#00B208',
            color2: '#009600',
            color3: '#006900',
            docsURI: 'https://docs.turbowarp.org/blocks',
            menuIconURI: iconURI,
            blockIconURI: iconURI,
            blocks: [
                {
                    opcode: 'getLastKeyPressed',
                    text: formatMessage({
                        id: 'tw.blocks.lastKeyPressed',
                        default: 'last key pressed',
                        description: 'Block that returns the last key that was pressed'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getButtonIsDown',
                    text: formatMessage({
                        id: 'tw.blocks.buttonIsDown',
                        default: '[MOUSE_BUTTON] mouse button down?',
                        description: 'Block that returns whether a specific mouse button is down'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        MOUSE_BUTTON: {
                            type: ArgumentType.NUMBER,
                            menu: 'mouseButton',
                            defaultValue: '0'
                        }
                    }
                }
            ],
            menus: {
                mouseButton: {
                    items: [
                        {
                            text: formatMessage({
                                id: 'tw.blocks.mouseButton.primary',
                                default: '(0) primary',
                                description: 'Dropdown item to select primary (usually left) mouse button'
                            }),
                            value: '0'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.mouseButton.middle',
                                default: '(1) middle',
                                description: 'Dropdown item to select middle mouse button'
                            }),
                            value: '1'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.mouseButton.secondary',
                                default: '(2) secondary',
                                description: 'Dropdown item to select secondary (usually right) mouse button'
                            }),
                            value: '2'
                        }
                    ],
                    acceptReporters: true
                }
            }
        };
    }

    getLastKeyPressed (args, util) {
        return util.ioQuery('keyboard', 'getLastKeyPressed');
    }

    getButtonIsDown (args, util) {
        const button = Cast.toNumber(args.MOUSE_BUTTON);
        return util.ioQuery('mouse', 'getButtonIsDown', [button]);
    }
}

module.exports = SpinachModBlocks;
