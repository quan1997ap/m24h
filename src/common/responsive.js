/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { useMediaQuery } from "react-responsive";

export function Desktop({ children }) {
  const isDesktop = useMediaQuery({ minWidth: 1025 });
  return isDesktop ? children : null;
}
export function Tablet({ children }) {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  return isTablet ? children : null;
}
export function Mobile({ children }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
}
