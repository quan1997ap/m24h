/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
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
import { DFooter, MFooter } from "controllers/Footer";
import { DTopBar, MTopBar } from "controllers/Topbar";
import { MGetLoanSteps, MWhyBlock } from "controllers/Common";
import svgMenu from "assets/svg/menu.svg";
import svgMenuClose from "assets/svg/menu-close.svg";
import svgLogoMenuTop from "assets/svg/logo-mobile-top.svg";
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
import svgCheckIcon from "assets/svg/check-icon.svg";

const uuidv4 = require("uuid/v4");
const axios = require("axios");
const numeral = require("numeral");
const ListItem = List.Item;
const Brief = ListItem.Brief;
const Preload = require("react-preload").Preload;

const preloadImages = [
  svgMenu,
  svgMenuClose,
  svgMoney,
  svgBike,
  svgCar,
  svgCreditCard,
  svgHouse,
  svgInvoice,
  svgLogoMenuTop,
];

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate(prevProps) {
    // window.scrollTo(0, 0);
  }

  UNSAFE_componentWillMount() {}
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  showDesktop = () => {
    return (
      <React.Fragment>
        <DTopBar />
        <DSignInForm />
        <DFooter />
      </React.Fragment>
    );
  };

  showTablet = () => {};

  showMobile = () => {
    return (
      <React.Fragment>
        <MTopBar />
        <MSignInForm />
        <MFooter />
      </React.Fragment>
    );
  };

  render() {
    return (
      <Preload
        loadingIndicator={loadingIndicator()}
        images={preloadImages}
        autoResolveDelay={3000}
        // onError={this._handleImageLoadError}
        // onSuccess={this._handleImageLoadSuccess}
        resolveOnError={true}
        mountChildren={true}
      >
        <React.Fragment>
          <Helmet>
            <title>MF24H.com - T??i ch??nh m???i nh??</title>
          </Helmet>

          <JSONLD>
            <Product name="T??i ch??nh m???i nh??">
              <AggregateRating ratingValue={4.7} reviewCount={23197} />
            </Product>
          </JSONLD>
          <div className={"mf24 "}>
            <div className={"page-signin"}>
              <Desktop>{this.showDesktop()}</Desktop>
              <Tablet>{this.showMobile()}</Tablet>
              <Mobile>{this.showMobile()}</Mobile>
            </div>{" "}
          </div>
        </React.Fragment>
      </Preload>
    );
  }
}

function DSignInForm(props) {
  return (
    <React.Fragment>
      <div className={"block-grey"}>
        <div className={"bulma-container desktop-login"}>
          <div
            className={"banner-image"}
            css={{ float: "left", border: "1px solid #D8D8D8" }}
          ></div>
          <div
            className={"desktop-login-form"}
            css={{
              float: "right",
              border: "1px solid #D8D8D8",
              width: "456px",
              height: "459px",
              background: "#fff",
            }}
          >
            <div
              css={{
                borderBottom: "1px solid #E8E8E8",
                display: "table",
                width: "100%",
                paddingBottom: "8px",
              }}
            >
              <WhiteSpace size="lg" />
              <WingBlank size="lg">
                {" "}
                <div
                  css={{
                    float: "left",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#707070",
                  }}
                >
                  ????NG NH???P
                </div>
                <div
                  css={{
                    float: "right",
                    textDecoration: "underline",
                    color: "#FD6565",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  ????ng k?? t??i kho???n
                </div>
              </WingBlank>
            </div>
            <WingBlank
              size="lg"
              css={{ paddingTop: "22px", paddingBottom: "22px" }}
            >
              <WhiteSpace size="lg" />

              <div css={{ textAlign: "center" }}>
                M???i b???n ????ng nh???p ????? xem v?? qu???n l?? kho???n vay
              </div>
              <WhiteSpace size="lg" />
              <div className={"bulma-field"}>
                <div className={"bulma-control"}>
                  <input
                    className={"bulma-input"}
                    type="text"
                    placeholder="M???i nh???p s??? ??i???n tho???i"
                    id="formFullName"
                    name="['full_name']"
                    // value={this.state.userProfileData.full_name}
                    // onChange={this.handleProfileDataChange}
                  />
                </div>
              </div>
              <div className={"bulma-field"}>
                <div className={"bulma-control"}>
                  <input
                    className={"bulma-input"}
                    type="text"
                    placeholder="M???i nh???p m???t kh???u"
                    id="formFullName"
                    name="['full_name']"
                    // value={this.state.userProfileData.full_name}
                    // onChange={this.handleProfileDataChange}
                  />
                </div>
              </div>
              <div
                css={{
                  display: "table",
                  width: "100%",
                  paddingBottom: "8px",
                }}
              >
                {" "}
                <div
                  css={{
                    float: "left",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#707070",
                  }}
                >
                  {/* Nh??? t??i kho???n */}
                </div>
                <div
                  css={{
                    float: "right",
                    textDecoration: "underline",
                    color: "#FD6565",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  Qu??n m???t kh???u
                </div>
              </div>
              <WhiteSpace size="lg" />
              <WhiteSpace size="lg" />
              <WhiteSpace size="lg" />
              <div css={{ textAlign: "center" }}>
                <Button
                  className={"button-primary-color"}
                  type="primary"
                  onClick={() => {}}
                >
                  ????ng nh???p ngay
                </Button>{" "}
              </div>
            </WingBlank>

            <div
              css={{
                borderTop: "1px solid #E8E8E8",
                display: "table",
                textAlign: "center",
                width: "100%",
                paddingTop: "18px",
                paddingBottom: "18px",
              }}
            >
              <WingBlank size="lg">
                {" "}
                <div
                  css={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#707070",
                  }}
                >
                  B???n ch??a c?? t??i kho???n?
                </div>
                <div
                  css={{
                    textDecoration: "underline",
                    color: "#FD6565",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  H??y ????ng k?? ngay b??y gi???
                </div>
              </WingBlank>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function MSignInForm(props) {
  return (
    <div className={"signin-form block-grey"}>
      <div className={"banner-image"}></div>
      <WhiteSpace size="lg" />
      <WingBlank size="lg">
        <div
          css={{
            background: "#fff",
            minHeight: "438px",
            borderRadius: "5px",
            paddingTop: "10px",
            paddingBottom: "18px",
          }}
        >
          <div
            css={{
              borderBottom: "1px solid #E8E8E8",
              display: "table",
              width: "100%",
              paddingBottom: "8px",
            }}
          >
            <WingBlank size="lg">
              {" "}
              <div
                css={{
                  float: "left",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#707070",
                }}
              >
                ????NG NH???P
              </div>
              <div
                css={{
                  float: "right",
                  textDecoration: "underline",
                  color: "#FD6565",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                ????ng k?? t??i kho???n
              </div>
            </WingBlank>
          </div>
          <WingBlank
            size="lg"
            css={{ paddingTop: "22px", paddingBottom: "22px" }}
          >
            M???i b???n ????ng nh???p ????? xem v?? qu???n l?? kho???n vay{" "}
            <WhiteSpace size="lg" />
            <div className={"bulma-field"}>
              <div className={"bulma-control"}>
                <input
                  className={"bulma-input"}
                  type="text"
                  placeholder="M???i nh???p s??? ??i???n tho???i"
                  id="formFullName"
                  name="['full_name']"
                  // value={this.state.userProfileData.full_name}
                  // onChange={this.handleProfileDataChange}
                />
              </div>
            </div>
            <div className={"bulma-field"}>
              <div className={"bulma-control"}>
                <input
                  className={"bulma-input"}
                  type="text"
                  placeholder="M???i nh???p m???t kh???u"
                  id="formFullName"
                  name="['full_name']"
                  // value={this.state.userProfileData.full_name}
                  // onChange={this.handleProfileDataChange}
                />
              </div>
            </div>
            <div
              css={{
                display: "table",
                width: "100%",
                paddingBottom: "8px",
              }}
            >
              {" "}
              <div
                css={{
                  float: "left",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#707070",
                }}
              >
                {/* Nh??? t??i kho???n */}
              </div>
              <div
                css={{
                  float: "right",
                  textDecoration: "underline",
                  color: "#FD6565",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                Qu??n m???t kh???u
              </div>
            </div>
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <div css={{ textAlign: "center" }}>
              <Button
                className={"button-primary-color"}
                type="primary"
                onClick={() => {}}
              >
                ????ng nh???p ngay
              </Button>{" "}
            </div>
          </WingBlank>

          <div
            css={{
              borderTop: "1px solid #E8E8E8",
              display: "table",
              textAlign: "center",
              width: "100%",
              paddingTop: "18px",
              paddingBottom: "18px",
            }}
          >
            <WingBlank size="lg">
              {" "}
              <div
                css={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#707070",
                }}
              >
                B???n ch??a c?? t??i kho???n?
              </div>
              <div
                css={{
                  textDecoration: "underline",
                  color: "#FD6565",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                H??y ????ng k?? ngay b??y gi???
              </div>
            </WingBlank>
          </div>

          <div></div>
        </div>
      </WingBlank>
    </div>
  );
}

export default Signin;
