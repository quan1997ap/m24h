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
  Accordion,
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
import imgQuestion4 from "assets/images/home/question4.png";

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


export function DQuestions(props) {
  return (
    <WingBlank size="lg">
      <Accordion
          accordion
          openAnimation={{}}
          className="my-accordion"
          onChange={() => {}}
          >
          <Accordion.Panel
            header="Công ty MF24H cho vay theo những hình thức gì?"
            className="pad"
          >
            <p>MF24H là công ty cung cấp dịch vụ vay bằng hình thức cầm cố tài sản .Đặc biệt, đối với tài sản là xe máy và ô tô, MF24H có hình thức hỗ trợ Khách hàng bằng cách cho Khách hàng mượn lại tài sản trong quá trình cầm cố để hỗ trợ khách hàng có phương tiện di chuyển.Ngoài ra, MF24H còn là công ty cung cấp rất nhiều sản phẩm bảo hiểm phi nhân thọ như bảo hiểm cứu hộ xe máy, bảo hiểm thân vỏ xe,… </p>
          </Accordion.Panel>

          <Accordion.Panel
            header="Vay tiền tại MF24h thì cần các giấy tờ, thủ tục gì?"
            className="pad"
          >
            <ul>
              <li>
                Vay cầm cố bằng xe máy/ô tô: CMND/CCCD/Hộ chiếu và Đăng ký xe (cà vẹt) chính chủ.
              </li>
              <li>
                Vay cầm cố bằng tài sản khác: CMND/CCCD/Hộ chiếu và tài sản.
              </li>
            </ul>
          </Accordion.Panel>

          <Accordion.Panel
            header={
              <div>
                Vay tiền tại MF24H có bảo mật thông tin không?
              </div>
            }
            className="pad2"
          >
            <p>MF24H cam kết bảo mật 100% thông tin khoản vay của Khách hàng. </p>
          </Accordion.Panel>

          <Accordion.Panel
            header={
              <div>
                Chi phí vay tại MF24h như thế nào?
              </div>
            }
            className="pad2"
          >
            <ul>
              <li>Chi phí vay MF24H rất linh hoạt theo giá trị khoản vay, thời gian vay và số tiền vay với lãi suất chỉ 1.1%/tháng và các khoản chi phí vay bao gồm phí thẩm định điều kiện cho vay, phí quản lý tài sản cầm cố.</li>
              <li>Tổng chi phí vay tính theo dư nợ giảm dần theo bảng minh hoạ cho gói vay 10 triệu, kỳ hạn 6 tháng dưới đây:</li>
            </ul>
            <img css={{ 'display': 'block', 'margin': '0 auto' }} src={imgQuestion4} alt={"Chi phí vay tại MF24h như thế nào?"} />
          </Accordion.Panel>


          <Accordion.Panel
            header={
              <div>
                Kể từ lúc MF24H nhận hồ sơ của tôi thì sau bao lâu tôi nhận được tiền?
              </div>
            }
            className="pad2"
          >
            <p>Tùy từng khoản vay, thời gian để Khách hàng nhận được tiền kể từ khi đủ hồ sơ sẽ khác nhau, thông thường từ 15 – 30 phút. </p>
          </Accordion.Panel>

          <Accordion.Panel
            header={
              <div>
                Tôi có thể nhận tiền qua hình thức nào?
              </div>
            }
            className="pad2"
          >
            <p>MF24H linh hoạt hình thức nhận tiền theo yêu cầu của Khách hàng như: Tiền mặt hoặc chuyển khoản. </p>
          </Accordion.Panel>

          <Accordion.Panel
            header={
              <div>
                MF24H vay được bao lâu hoặc thời gian vay tại MF24H được bao lâu/Kỳ hạn khoản vay tại MF24H là như thế nào?
              </div>
            }
            className="pad2"
          >
            <p>MF24H có nhiều thời gian vay linh hoạt, tối thiểu từ 3 tháng và tối đa tới 12 tháng.</p>
          </Accordion.Panel>

          <Accordion.Panel
            header={
              <div>
                Tài sản của tôi MF24H trông giữ có được an toàn không?
              </div>
            }
            className="pad2"
          >
            <ul>
              <li>Tùy từng loại, tài sản sẽ được bảo quản trong két hoặc kho của MF24H đảm bảo tiêu chuẩn về An toàn phòng cháy chữa cháy. Trong quá trình bảo quản, nhân viên tuyệt đối không sử dụng tài sản của Khách hàng.</li>
              <li>Đối với tài sản là ô tô/ xe máy, tài sản sẽ được rửa sạch sẽ trước khi bàn giao lại cho Khách hàng.</li>
            </ul>
          </Accordion.Panel>

          <Accordion.Panel
            header={
              <div>
                Số tiền tối đa có thể vay được tại MF24H là bao nhiêu?
              </div>
            }
            className="pad2"
          >
          <p>Tại F88, Khách hàng có thể vay lên tới 2 tỷ VNĐ.</p>
          </Accordion.Panel>


      </Accordion>
    </WingBlank>
  );
}