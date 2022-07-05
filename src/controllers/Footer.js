/* eslint-disable no-unused-vars */
import React, { Component } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
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
import config from "config.js";
import svgPhoneCall from "assets/svg/phone-call.svg";
import svgDesktopLogoMenuTop from "assets/svg/logo-desktop-top.svg";
import svgDesktopLogoBlack from "assets/svg/logo-black.svg";
const styleTextGrey = css`
  color: #939393;
`;

export function MFooter(props) {
  return (
    <React.Fragment>
      <div
        css={{
          background: "#FFF",
          padding: "10px 0 20px 0",
          color: "#fff",
        }}
      >
        <WingBlank size="lg">
          <WhiteSpace size="md" />

          <Flex css={{ overflow: "visible" }} align={"start"}>
            <Flex.Item css={{ overflow: "visible" }}>
              <ul className={"footer-list"}>
                <li>
                  <a href="/#/" css={styleTextGrey}>
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="/#/pawn-products" css={styleTextGrey}>
                    Cầm cố tài sản
                  </a>
                </li>

                {/* <li>
                  <a href="/#/loan-products" css={styleTextGrey}>
                    Đăng ký khoản vay
                  </a>
                </li> */}

                <li>
                  <a href="/#/account/signin" css={styleTextGrey}>
                    Đăng nhập
                  </a>
                </li>

                <li>
                  <a href="/#/account/signup" css={styleTextGrey}>
                    Đăng ký
                  </a>
                </li>

                <li>
                  <a href="/#/faq" css={styleTextGrey}>
                    Hỏi đáp
                  </a>
                </li>

                <li>
                  <a href="/#/terms" css={styleTextGrey}>
                    Điều khoản dịch vụ
                  </a>
                </li>

                <li>
                  <a href={"https://bit.ly/mf24hfb"} css={styleTextGrey}>
                    Facebook Page
                  </a>
                </li>
                <li>
                  <WhiteSpace size="lg" /> <WhiteSpace size="lg" />{" "}
                  <WhiteSpace size="lg" />
                </li>

                <li>
                  <a href="/#/pawn-products" css={styleTextGrey}>
                    Cầm đăng ký ô tô/ xe máy. KH vẫn sử dụng xe
                  </a>
                </li>

                <li>
                  <a href="/#/pawn-products" css={styleTextGrey}>
                    Cầm đồng hồ hàng hiệu, điện thoại, laptop
                  </a>
                </li>

                <li>
                  <a href="/#/pawn-products" css={styleTextGrey}>
                    Cầm cố vàng bạc, trang sức, kim cương
                  </a>
                </li>

                <li>
                  <a href="/#/pawn-products" css={styleTextGrey}>
                    Cầm cố sổ đỏ nhà đất
                  </a>
                </li>

                <li>
                  <a href="/#/pawn-products" css={styleTextGrey}>
                    Cầm cố giải ngân trong ngày, bảo mật, uy tín.
                  </a>
                </li>

                <li>
                  <a href="/#/pawn-products" css={styleTextGrey}>
                    Cầm cố đơn giản, thủ tục nhanh chóng
                  </a>
                </li>

                <li>
                  <a href="/#/pawn-products" css={styleTextGrey}>
                    Cầm cố tài sản chuyên nghiệp, tại địa chỉ KH lựa chọn
                  </a>
                </li>
              </ul>
            </Flex.Item>
          </Flex>
          <WhiteSpace size="lg" />
          <div
            css={{
              color: config.color.txt_primary,
              fontsize: "16px",
              fontWeight: "bold",
              display: "table",

              paddingLeft: "10px",
            }}
          >
            <img
              src={svgPhoneCall}
              alt={"hotline"}
              css={{ height: "20px", float: "left" }}
            />{" "}
            <div css={{ paddingLeft: "30px" }}>Hotline: {config.hotline}</div>
          </div>
          <WhiteSpace size="lg" />
          <img
            onClick={() => {
              window.location.href = "/#/";
            }}
            alt={"Logo MF24H"}
            src={svgDesktopLogoBlack}
            css={{ with: "180px !important", height: "40px !important" }}
          />
          <WhiteSpace size="lg" />
          <div css={styleTextGrey}>
            <div css={{ color: "#939393", fontSize: "18px" }}>
              <strong>Công ty Cổ phần MF24H</strong>
            </div>
            {/* <WhiteSpace size="xs" />
            Trụ sợ chính: Số 16, Ngõ 105/7 Bạch Mai, Phường Thanh Nhàn, Quận Hai
            Bà Trưng, TP. Hà Nội */}
            <WhiteSpace size="xs" />
            Giấy CN ĐKDN số 0109112713 được cấp bởi Sở Kế hoạch và Đầu tư TP. Hà
            Nội
            <br />
          </div>
        </WingBlank>
      </div>
    </React.Fragment>
  );
}

export function DFooter(props) {
  return (
    <React.Fragment>
      <div className={"bulma-container "} css={{ clear: "both" }}>
        <div
          css={{
            background: "#FFF",
            padding: "10px 0 10px 0",
            color: "#fff",
          }}
        >
          <WhiteSpace size="md" />
          <nav
            className={"bulma-navbar footerbar"}
            role="navigation"
            aria-label="main navigation"
          >
            <div id="navbarBasicExample" className={"bulma-navbar-menu"}>
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
                <a className={"bulma-navbar-item menu-item"} href={"/#/faq"}>
                  Hỏi đáp
                </a>
                <a className={"bulma-navbar-item menu-item"} href={"/#/terms"}>
                  Điều khoản dịch vụ
                </a>

                <a
                  className={"bulma-navbar-item menu-item"}
                  href={"https://bit.ly/mf24hfb"}
                >
                  Facebook Page
                </a>
              </div>
            </div>
          </nav>

          <nav
            className={"bulma-navbar"}
            css={{ height: "32px !important", minHeight: "32px !important" }}
            role="navigation"
            aria-label="main navigation"
          >
            <div id="navbarBasicExample" className={"bulma-navbar-menu"}>
              <div className={"bulma-navbar-start"}>
                <a
                  className={"bulma-navbar-item menu-item"}
                  href={"/#/pawn-products"}
                >
                  Cầm đăng ký ô tô/ xe máy. KH vẫn sử dụng xe
                </a>{" "}
                <a
                  className={"bulma-navbar-item menu-item"}
                  href={"/#/pawn-products"}
                >
                  Cầm đồng hồ hàng hiệu, điện thoại, laptop
                </a>{" "}
                <a
                  className={"bulma-navbar-item menu-item"}
                  href={"/#/pawn-products"}
                >
                  Cầm cố vàng bạc, trang sức, kim cương
                </a>{" "}
                <a
                  className={"bulma-navbar-item menu-item"}
                  href={"/#/pawn-products"}
                >
                  Cầm cố sổ đỏ nhà đất
                </a>
              </div>
            </div>
          </nav>

          <nav
            className={"bulma-navbar"}
            css={{ height: "32px !important", minHeight: "32px !important" }}
            role="navigation"
            aria-label="main navigation"
          >
            <div id="navbarBasicExample" className={"bulma-navbar-menu"}>
              <div className={"bulma-navbar-start"}>
                <a
                  className={"bulma-navbar-item menu-item"}
                  href={"/#/pawn-products"}
                >
                  Cầm cố giải ngân trong ngày, bảo mật, uy tín.
                </a>
                <a
                  className={"bulma-navbar-item menu-item"}
                  href={"/#/pawn-products"}
                >
                  Cầm cố đơn giản, thủ tục nhanh chóng
                </a>
                <a
                  className={"bulma-navbar-item menu-item"}
                  href={"/#/pawn-products"}
                >
                  Cầm cố tài sản chuyên nghiệp, tại địa chỉ KH lựa chọn
                </a>
              </div>
            </div>
          </nav>
          <WhiteSpace size="lg" />
          <div
            css={{
              color: config.color.txt_primary,
              fontsize: "16px",
              fontWeight: "bold",
              display: "table",
              // width: "500px",
              paddingLeft: "10px",
            }}
          >
            <img
              src={svgPhoneCall}
              alt={"hotline"}
              css={{ height: "20px", float: "left" }}
            />{" "}
            <div css={{ paddingLeft: "30px" }}>Hotline: {config.hotline}</div>
          </div>
          <WhiteSpace size="lg" />

          <WhiteSpace size="lg" />

          <img
            onClick={() => {
              window.location.href = "/#/";
            }}
            alt={"Logo MF24H"}
            src={svgDesktopLogoBlack}
            css={{ with: "180px !important", height: "40px !important" }}
          />

          <div css={{ padding: "10px" }}>
            <div css={styleTextGrey}>
              <div css={{ color: "#939393", fontSize: "18px" }}>
                <strong>Công ty Cổ phần MF24H</strong>
              </div>
              {/* <WhiteSpace size="xs" />
              Trụ sợ chính: Số 16, Ngõ 105/7 Bạch Mai, Phường Thanh Nhàn, Quận
              Hai Bà Trưng, TP. Hà Nội */}
              <WhiteSpace size="xs" />
              Giấy CN ĐKDN số 0109112713 được cấp bởi Sở Kế hoạch và Đầu tư TP.
              Hà Nội
              <br />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export function Footer(props) {
  return "";
}
