/* eslint-disable no-unused-vars */
/** @jsx jsx */
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
import { css, jsx } from "@emotion/core";
import { JSONLD, Product, AggregateRating } from "react-structured-data";
import _ from "lodash";
import { Helmet } from "react-helmet";
import Loader from "react-loader-spinner";
import randomstring from "randomstring";
import { Base64 } from "js-base64";
import XXH from "xxhashjs";
import config from "config.js";
import log from "common/log.js";
import MediaQuery from "react-responsive";
import { useMediaQuery } from "react-responsive";
import { ed, fromB64, toB64 } from "common/hash/ed";
import { SpaceLg, SpaceMd, loadingIndicator } from "common/component";
import { Desktop, Tablet, Mobile } from "common/responsive";
import { slide as Menu } from "react-burger-menu";
import { Footer, MFooter } from "controllers/Footer";
import svgMenu from "assets/svg/menu.svg";
import svgMenuClose from "assets/svg/menu-close.svg";
import svgLogoMenuTop from "assets/svg/logo-mobile-top.svg";
import svgDesktopLogoMenuTop from "assets/svg/logo-desktop-top.svg";
import svgPhoneCall from "assets/svg/phone-call.svg";
import svgBike from "assets/svg/products/bike.svg";
import svgCar from "assets/svg/products/car.svg";
import svgCreditCard from "assets/svg/products/credit-card.svg";
import svgHouse from "assets/svg/products/house.svg";
import svgInvoice from "assets/svg/products/invoice.svg";
import svgMoney from "assets/svg/products/money.svg";
import svgLoanStepBusinessman from "assets/svg/loan-steps/businessman.svg";
import svgLoanStepPayment from "assets/svg/loan-steps/payment.svg";
import svgLoanStepUsers from "assets/svg/loan-steps/users.svg";
import svgLoanStepWebsite from "assets/svg/loan-steps/website.svg";

const styleMenuItem = css`
  color: #939393;
  padding-bottom: 20px;
`;

const styleTopbar = {
  height: "52px",
  borderBottom: "1px solid #fafafa",
};

export function MTopBar(props) {
  return (
    <React.Fragment>
      <NavBar
        className={"topbar"}
        mode="light"
        css={styleTopbar}
        icon={
          <img
            onClick={() => {
              window.location.href = "/#/";
            }}
            alt={"Logo MF24H"}
            src={svgLogoMenuTop}
            css={{ with: "154px !important", height: "36px !important" }}
          />
        }
        rightContent={
          <Menu
            right
            customBurgerIcon={<img src={svgMenu} alt={"Icon Menu"} />}
            customCrossIcon={<img src={svgMenuClose} alt={"Close Menu"} />}
          >
            <div className="menu-item">
              <div
                css={{
                  color: config.color.txt_primary,
                  fontsize: "16px",
                  fontWeight: "bold",
                  display: "table",

                  // paddingLeft: "10px",
                }}
              >
                <img
                  src={svgPhoneCall}
                  alt={"hotline"}
                  css={{ height: "20px", float: "left", marginTop: "5px" }}
                />{" "}
                <div css={{ paddingLeft: "30px" }}>{config.hotline}</div>
              </div>{" "}
              <WhiteSpace size="lg" />
              <WhiteSpace size="lg" />
              <WhiteSpace size="lg" />
            </div>

            <div
              className="menu-item"
              css={styleMenuItem}
              onClick={() => {
                window.location.href = "/#/";
              }}
            >
              Trang chủ
            </div>
            <div
              className="menu-item"
              css={styleMenuItem}
              onClick={() => {
                window.location.href = "/#/pawn-products";
              }}
            >
              Cầm cố tài sản
            </div>
            {/*
            <div
              className="menu-item"
              css={styleMenuItem}
              onClick={() => {
                window.location.href = "/#/loan-products";
              }}
            >
              Đăng ký khoản vay
            </div> */}

            <div
              className="menu-item"
              css={styleMenuItem}
              onClick={() => {
                window.location.href = "/#/account/signin";
              }}
            >
              Đăng nhập
            </div>

            <div
              className="menu-item"
              css={styleMenuItem}
              onClick={() => {
                window.location.href = "/#/account/signup";
              }}
            >
              Đăng ký
            </div>

            <div
              className="menu-item"
              css={styleMenuItem}
              onClick={() => {
                window.location.href = "/#/faq";
              }}
            >
              Hỏi đáp
            </div>
            <div
              className="menu-item"
              css={styleMenuItem}
              onClick={() => {
                window.location.href = "/#/terms";
              }}
            >
              Điều khoản dịch vụ
            </div>

            <div
              className="menu-item"
              css={styleMenuItem}
              onClick={() => {
                window.location.href = "https://bit.ly/mf24hfb";
              }}
            >
              Facebook Page
            </div>
          </Menu>
        }
        onLeftClick={() => {}}
      ></NavBar>
    </React.Fragment>
  );
}

export function DTopBar(props) {
  return (
    <React.Fragment>
      <div className={"bulma-container"}>
        <div
          className={"top-mini"}
          css={{
            paddingTop: "8px",
            paddingBottom: "4px",
            paddingRight: "10px",
          }}
        >
          <a className={"item"} href={"/#/account/signin"}>
            Đăng nhập
          </a>
          <a className={"item"} href={"/#/account/signup"}>
            Đăng ký
          </a>
        </div>
        <nav
          css={{ clear: "both" }}
          className={"bulma-navbar topbar "}
          role="navigation"
          aria-label="main navigation"
        >
          <div className={"bulma-navbar-brand"}>
            <a className={"bulma-navbar-item topbar-logo"} href={"/#/"}>
              <img
                onClick={() => {
                  window.location.href = "/#/";
                }}
                alt={"Logo MF24H"}
                src={svgDesktopLogoMenuTop}
                css={{ with: "260px !important", height: "60px !important" }}
              />
            </a>
          </div>

          <div className={"bulma-navbar-menu"}>
            {" "}
            <div
              className={"bulma-navbar-item menu-item"}
              css={{ marginLeft: "50px", color: config.color.txt_primary }}
            >
              <img src={svgPhoneCall} alt={"hotline"} />{" "}
              <div css={{ marginLeft: "10px" }}>Hotline: {config.hotline}</div>
            </div>
          </div>

          <div id="navbarBasicExample" className={"bulma-navbar-end"}>
            <div className={"bulma-navbar-start"}>
              <a className={"bulma-navbar-item menu-item"} href={"/#/"}>
                Trang chủ
              </a>
              <a
                className={"bulma-navbar-item menu-item"}
                href={"/#/pawn-products"}
              >
                Cầm cố tài sản
              </a>
              {/* <a
                className={"bulma-navbar-item menu-item"}
                href={"/#/loan-products"}
              >
                Đăng ký khoản vay
              </a> */}

              <a className={"bulma-navbar-item menu-item"} href={"/#/terms"}>
                Điều khoản
              </a>

              <a className={"bulma-navbar-item menu-item"} href={"/#/faq"}>
                Hỏi đáp
              </a>

              <a
                className={"bulma-navbar-item menu-item"}
                href={"https://bit.ly/mf24hfb"}
              >
                Facebook Page
              </a>

              {/* <div
                className={
                  "bulma-navbar-item bulma-has-dropdown bulma-is-hoverable"
                }
              >
                <a className="bulma-navbar-link">More</a>

                <div className={"bulma-navbar-dropdown"}>
                  <a className={"bulma-navbar-item"}>About</a>
                  <a className={"bulma-navbar-item"}>Jobs</a>
                  <a className={"bulma-navbar-item"}>Contact</a>
                  <hr className={"bulma-navbar-divider"} />
                  <a className={"bulma-navbar-item"}>Report an issue</a>
                </div>
              </div> */}
            </div>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
}
