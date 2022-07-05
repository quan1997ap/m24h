import { Base64 } from "js-base64";
import XXH from "xxhashjs";
import { ls, lg, lr } from "common/local_storage";
import { ed, fromB64, toB64 } from "common/hash/ed";
import randomstring from "randomstring";
import config from "config.js";

let as1 = "sha";
let as2 = "red";
let as3 = "dat";
let as4 = "sal";
let as5 = "a";
let as6 = "t";

let xab1 = 16;
let xab2 = 48;
let xab3 = 248;

let xg = randomstring.generate;
let xh = XXH.h32;
let jstr = JSON.stringify;
let aab1 = config.store_key.user_data;
let aab2 = config.store_key.user_data_hash;
let xsl = config.xxsalt;

function xhs(p, x) {
  return xh(p, x).toString(xab1);
}

export function setUserDataLocalStorage(input) {
  // Save profile data to local storage
  let p = jstr(input);
  let k1 = aab1;
  let k2 = aab2;
  let g48 = xg(xab2);
  let g248 = xg(xab3 + p.length);
  let g248x = ed(g248);
  let b1 = toB64(p);
  let bx = ed(b1);
  let xh16 = xhs(p, xsl);
  let h = g48 + xh16;
  let h2 = ed(h);
  let c1 = as1 + as2 + "_" + as3 + as5;
  let c2 = as1 + as2 + "_" + as4 + as6;
  ls(ed(k1), bx);
  ls(ed(k2), h2);
  ls(ed(c1), g248x);
  ls(ed(c2), ed(config.shared_salt));
}
