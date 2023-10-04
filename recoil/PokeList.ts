"use client";
import { atom } from "recoil";

export const poketMonList = atom({
  key: "poketMonList", // unique ID (with respect to other atoms/selectors)
  default: {
    curNum: 0,
    list: [],
  }, // default value (aka initial value)
});
