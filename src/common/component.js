/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {
  Card,
  WingBlank,
  Carousel,
  WhiteSpace,
  Button,
  Flex,
  NavBar,
  Icon,
  List,
} from "antd-mobile";
import Loader from "react-loader-spinner";
import config from "config.js";

export function SpaceLg(props) {
  return (
    <React.Fragment>
      <WhiteSpace size="lg" />
    </React.Fragment>
  );
}

export function SpaceMd(props) {
  return (
    <React.Fragment>
      <WhiteSpace size="md" />
    </React.Fragment>
  );
}

export function loadingIndicator(props) {
  return (
    <WingBlank
      size="lg"
      style={{ paddingBottom: "100px", textAlign: "center" }}
    >
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <Loader
        type="ThreeDots"
        color={config.color.primary}
        height={120}
        width={120}
      />
    </WingBlank>
  );
}
