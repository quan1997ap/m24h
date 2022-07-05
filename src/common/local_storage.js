import { dec, enc } from "common/hash/ed";
import XXH from "xxhashjs";
import config from "config.js";

export function ls(k, v) {
  let k2 = XXH.h32(enc(k), config.xxsalt).toString(16);
  localStorage.setItem(k2, enc(v));
}

export function lg(k) {
  let k2 = XXH.h32(enc(k), config.xxsalt).toString(16);
  return localStorage.getItem(k2) !== null
    ? dec(localStorage.getItem(k2))
    : null;
}

export function lr(k) {
  let k2 = XXH.h32(enc(k), config.xxsalt).toString(16);
  localStorage.removeItem(k2);
}

export function lgd(k, d) {
  let k2 = XXH.h32(enc(k), config.xxsalt).toString(16);
  return localStorage.getItem(k2) !== null ? dec(localStorage.getItem(k2)) : d;
}
