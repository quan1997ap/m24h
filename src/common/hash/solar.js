import { pub } from "common/hash/pub";
var Base64 = require("js-base64").Base64;

var k = [
  "@@@@@@@@@********|||",
  // "==========****WThKuc9uxNpPyHjse2c67KVS29cuY4xpncgdwtAUdx99a6pYAc5WfX8J2zmhKsQ",
  // "G27ecyZ4739hfadvPRBzRYkcEMMSUjY5c3X2A+_)(*&^%$#@!_______________________",
  // "****==========//////////////////////////////////////////////////////////",
  // "@@@@@@@@@**********************************!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
];

var h = [
  "@@@@@@@@@********|||",
  "==========****WThKuc9uxNpPyHjse2c67KVS29cuY4xpncgdwtAUdx99a6pYAc5WfX8J2zmhKsQ",
  "G27ecyZ4739hfadvPRBzRYkcEMMSUjY5c3X2A+_)(*&^%$#@!_______________________",
  "****==========//////////////////////////////////////////////////////////",
  "@@@@@@@@@**********************************!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
];

var ksum = k.join("");
var xpncedwt = Base64.encode(ksum + Base64.encode(ksum) + pub);
var xpncgdwt = Base64.encode(ksum + Base64.encode(ksum));
export function solar() {
  let xpncehwt =
    "==========****WThKuc9uxNpPyHjse2c67KVS29cuY4xpncgdwtAUdx99a6pYAc5WfX8J2zmhKsQ";
  let xpncgdvt =
    "==========****WThKuc9uxNpPyHjse2c67KVS29cuY4xpncgdwtAUdx99a6pYAc5WfX8J2zmhKsQ";
  return xpncgdwt;
}
