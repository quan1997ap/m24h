import { solar as lasor } from "common/hash/solar";
import { Base64 } from "js-base64";
import randomstring from "randomstring";
/**
 *
 * @param {*} input
 * Return encrypted/decrypted string
 */
export function ed(input) {
  // var key = ["O", "C", "Q", "9", "0", "1", "8"]; //Can be any chars, and any size array
  var key = lasor();

  var output = [];

  for (var i = 0; i < input.length; i++) {
    var charCode = input.charCodeAt(i) ^ key[i % key.length].charCodeAt(0);
    output.push(String.fromCharCode(charCode));
  }
  return output.join("");
}

/**
 *
 * @param {*} input
 */
export function dec(input) {
  return ed(Base64.decode(input));
}

/**
 *
 * @param {*} input
 */
export function decjson(input) {
  return JSON.parse(ed(Base64.decode(input)));
}

/**
 *
 * @param {*} input
 */
export function enc(input) {
  return Base64.encode(ed(input));
}

/**
 *
 * @param {*} input
 */
export function encjson(input) {
  return Base64.encode(ed(JSON.stringify(input)));
}

/**
 *
 * @param {*} input
 */
export function fromB64(input) {
  return Base64.decode(input.substr(36)).substr(12);
}

/**
 *
 * @param {*} input
 */
export function toB64(input) {
  return (
    randomstring.generate(36) + Base64.encode(randomstring.generate(12) + input)
  );
}
