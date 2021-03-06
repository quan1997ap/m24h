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
import { MTopBar, DTopBar } from "controllers/Topbar";
import {
  DGetLoanSteps,
  MGetLoanSteps,
  MWhyBlock,
  DWhyBlock,
} from "controllers/Common";

import svgMenu from "assets/svg/menu.svg";
import svgMenuClose from "assets/svg/menu-close.svg";
import svgLogoMenuTop from "assets/svg/logo-mobile-top.svg";
import svgBike from "assets/svg/products/bike.svg";
import svgCar from "assets/svg/products/car.svg";
import svgCreditCard from "assets/svg/products/credit-card.svg";
import svgHouse from "assets/svg/products/house.svg";
import svgInvoice from "assets/svg/products/invoice.svg";
import svgMoney from "assets/svg/products/money.svg";
import svgPhone from "assets/svg/products/phone.svg";
import svgIMac from "assets/svg/products/imac.svg";
import svgWatch from "assets/svg/products/watch.svg";
import svgBuildings from "assets/svg/products/buildings.svg";
import svgDiamond from "assets/svg/products/diamond.svg";

import svgLoanStepBusinessman from "assets/svg/loan-steps/businessman.svg";
import svgLoanStepPayment from "assets/svg/loan-steps/payment.svg";
import svgLoanStepUsers from "assets/svg/loan-steps/users.svg";
import svgLoanStepWebsite from "assets/svg/loan-steps/website.svg";
import svgCheckIcon from "assets/svg/check-icon.svg";

import imgLoanBanner from "assets/images/banner/loan-banner.jpg";
import imgWhyBanner from "assets/images/home/why-banner@3x.png";
import imgQuickApplyBanner from "assets/images/home/quick-apply-loan@3x.png";
import imgSignInBanner from "assets/images/signin/banner@3x.png";

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
  svgPhone,
  svgIMac,
  svgBuildings,
  svgDiamond,
  svgWatch,
  svgLogoMenuTop,
  svgLoanStepBusinessman,
  svgLoanStepPayment,
  svgLoanStepUsers,
  svgLoanStepWebsite,
  svgCheckIcon,
  imgLoanBanner,
  imgQuickApplyBanner,
  imgWhyBanner,
  imgSignInBanner,
];

const productFlexItemStyle = {
  overflow: "visible",
};

const styleListApplicationItem = {
  overflow: "visible",
};

export class LoanProducts extends Component {
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
        <DProductList />
        <DGetLoanSteps />
        <DWhyBlock />
        <DFooter />
      </React.Fragment>
    );
  };

  showTablet = () => {};

  showMobile = () => {
    return (
      <React.Fragment>
        <MTopBar />
        <MProductList />
        <MGetLoanSteps />
        <MWhyBlock />
        <MFooter />
      </React.Fragment>
    );
  };

  render() {
    return (
      <Preload
        loadingIndicator={loadingIndicator}
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
            <div className={"page-loan-products"}>
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

export class PawnProducts extends Component {
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
        {" "}
        <DTopBar />
        <DProductListPawn />
        <DGetLoanSteps />
        <DWhyBlock />
        <DFooter />
      </React.Fragment>
    );
  };

  showTablet = () => {};

  showMobile = () => {
    return (
      <React.Fragment>
        <MTopBar />
        <MProductListPawn />
        <MGetLoanSteps />
        <MWhyBlock />
        <MFooter />
      </React.Fragment>
    );
  };

  render() {
    return (
      <Preload
        loadingIndicator={loadingIndicator}
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
            <div className={"page-loan-products"}>
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

function DListPawn(props) {
  return (
    <div
      className={"product-grid"}
      css={{
        background: "#fff",
        borderRadius: "5px",
        paddingTop: "18px",
        paddingBottom: "18px",
      }}
    >
      <div
        css={{
          textAlign: "center",
        }}
      >
        <h2
          css={{
            fontSize: "20px",
            color: config.color.txt_primary,
          }}
        >
          Vay c???m c???
        </h2>
      </div>
      <WhiteSpace size="lg" />
      <WingBlank size="lg">
        <Flex css={{ overflow: "visible" }} align={"start"}>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/computer-pawn";
            }}
          >
            <div className={"circle-96"}>
              <img src={svgIMac} alt={"C???m m??y t??nh"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            C???m m??y t??nh
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/mobile-phone-pawn";
            }}
          >
            <div className={"circle-96"}>
              <img src={svgPhone} alt={"C???m ??i???n tho???i"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            C???m ??i???n tho???i
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/car-pawn";
            }}
          >
            <div className={"circle-96"}>
              <img src={svgCar} alt={"C???m ?? t??"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            C???m ?? t??
            <WhiteSpace size="lg" />
          </Flex.Item>

          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/motorbike-pawn";
            }}
          >
            <div className={"circle-96"}>
              <img src={svgBike} alt={"C???m xe m??y"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            C???m xe m??y
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/jewel-pawn";
            }}
          >
            <div className={"circle-96"}>
              <img src={svgDiamond} alt={"C???m ???? qu??"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            C???m ???? qu??
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/watch-pawn";
            }}
          >
            <div className={"circle-96"}>
              <img src={svgWatch} alt={"C???m ?????ng h???"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            C???m ?????ng h???
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/house-mortage-loan";
            }}
          >
            <div className={"circle-96"}>
              <img src={svgBuildings} alt={"Vay th??? ch???p theo s??? ?????"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            Vay th??? ch???p <br />
            theo s??? ?????
            <WhiteSpace size="lg" />
          </Flex.Item>
        </Flex>
      </WingBlank>
    </div>
  );
}

function DListLoan(props) {
  return (
    <div
      className={"product-grid"}
      css={{
        background: "#fff",
        borderRadius: "5px",
        paddingTop: "18px",
        paddingBottom: "18px",
      }}
    >
      <div
        css={{
          textAlign: "center",
        }}
      >
        <h2
          css={{
            fontSize: "20px",
            color: config.color.txt_primary,
          }}
        >
          Vay c?? nh??n
        </h2>
      </div>
      <WhiteSpace size="lg" />
      <WingBlank size="lg">
        <Flex css={{ overflow: "visible" }} align={"start"}>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/credit-loan";
            }}
          >
            <div className={"circle-96"}>
              <img src={svgCreditCard} alt={"Vay t??n ch???p theo l????ng"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            Vay t??n ch???p
            <br /> theo l????ng
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/household-registration-loan";
            }}
          >
            <div className={"circle-96"}>
              <img src={svgHouse} alt={"Vay theo s??? h??? kh???u"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            Vay theo
            <br /> s??? h??? kh???u
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/motorbike-registration-loan";
            }}
          >
            <div className={"circle-96"}>
              <img src={svgBike} alt={"Vay theo ????ng k?? xe m??y"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            Vay theo <br />
            ????ng k?? xe m??y
            <WhiteSpace size="lg" />
          </Flex.Item>

          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/installment-loan";
            }}
          >
            <div className={"circle-96"}>
              <img src={svgMoney} alt={"Vay tr??? g??p"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            Vay tr??? g??p
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/utility-bill-loan";
            }}
          >
            <div className={"circle-96"}>
              <img src={svgInvoice} alt={"Vay theo ho?? ????n ??i???n n?????c"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            Vay theo <br />
            ho?? ????n ??i???n n?????c
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/car-registration-loan";
            }}
          >
            <div className={"circle-96"} css={{ margin: "auto" }}>
              <img src={svgCar} alt={"Vay theo ????ng k?? xe ?? t??"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            Vay theo <br />
            ????ng k?? xe ?? t??
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/icloud-loan";
            }}
          >
            <div className={"circle-96"}>
              <img src={svgPhone} alt={"Vay theo iCloud iPhone"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            Vay theo <br />
            iCloud iPhone
            <WhiteSpace size="lg" />
          </Flex.Item>
        </Flex>
      </WingBlank>
    </div>
  );
}

function DProductList(props) {
  return (
    <div className={"product-list"}>
      <div className={"bulma-container"}>
        <div
          css={{
            textAlign: "center",
          }}
        >
          <h2
            css={{
              fontSize: "26px",
              color: "#707070",
            }}
          >
            M???i b???n ch???n g??i s???n ph???m vay
          </h2>
        </div>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <DListLoan />
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <DListPawn />
        </WingBlank>
      </div>
    </div>
  );
}

function DProductListPawn(props) {
  return (
    <div className={"product-list"}>
      <div className={"bulma-container"}>
        <div
          css={{
            textAlign: "center",
          }}
        >
          <h2
            css={{
              fontSize: "26px",
              color: "#707070",
            }}
          >
            M???i b???n ch???n g??i s???n ph???m c???m c??? t??i s???n
          </h2>
        </div>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <DListPawn />
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <DListLoan />
        </WingBlank>
      </div>{" "}
    </div>
  );
}

function MListLoan(props) {
  return (
    <div
      className={"product-grid"}
      css={{
        background: "#fff",
        minHeight: "532px",
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
        paddingTop: "18px",
        paddingBottom: "18px",
      }}
    >
      <div
        css={{
          textAlign: "center",
        }}
      >
        <h2
          css={{
            fontSize: "20px",
            color: config.color.txt_primary,
          }}
        >
          Vay c?? nh??n
        </h2>
      </div>
      <WhiteSpace size="lg" />
      <WingBlank size="lg">
        <Flex css={{ overflow: "visible" }} align={"start"}>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/credit-loan";
            }}
          >
            <div className={"circle-76"}>
              <img src={svgCreditCard} alt={"Vay t??n ch???p theo l????ng"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            Vay t??n ch???p
            <br /> theo l????ng
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/household-registration-loan";
            }}
          >
            <div className={"circle-76"}>
              <img src={svgHouse} alt={"Vay theo s??? h??? kh???u"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            Vay theo
            <br /> s??? h??? kh???u
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/motorbike-registration-loan";
            }}
          >
            <div className={"circle-76"}>
              <img src={svgBike} alt={"Vay theo ????ng k?? xe m??y"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            Vay theo <br />
            ????ng k?? xe m??y
            <WhiteSpace size="lg" />
          </Flex.Item>
        </Flex>
        <Flex css={{ overflow: "visible" }} align={"start"}>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/installment-loan";
            }}
          >
            <div className={"circle-76"}>
              <img src={svgMoney} alt={"Vay tr??? g??p"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            Vay tr??? g??p
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/utility-bill-loan";
            }}
          >
            <div className={"circle-76"}>
              <img src={svgInvoice} alt={"Vay theo ho?? ????n ??i???n n?????c"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            Vay theo <br />
            ho?? ????n ??i???n n?????c
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/car-registration-loan";
            }}
          >
            <div className={"circle-76"} css={{ margin: "auto" }}>
              <img src={svgCar} alt={"Vay theo ????ng k?? xe ?? t??"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            Vay theo <br />
            ????ng k?? xe ?? t??
            <WhiteSpace size="lg" />
          </Flex.Item>
        </Flex>{" "}
        <Flex css={{ overflow: "visible" }} align={"start"}>
          <Flex.Item css={productFlexItemStyle}></Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/icloud-loan";
            }}
          >
            <div className={"circle-76"}>
              <img src={svgPhone} alt={"Vay theo iCloud iPhone"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            Vay theo <br />
            iCloud iPhone
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
          ></Flex.Item>
        </Flex>{" "}
      </WingBlank>
    </div>
  );
}

function MListPawn(props) {
  return (
    <div
      className={"product-grid"}
      css={{
        background: "#fff",
        minHeight: "474px",
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
        paddingTop: "18px",
        paddingBottom: "18px",
      }}
    >
      <div
        css={{
          textAlign: "center",
        }}
      >
        <h2
          css={{
            fontSize: "20px",
            color: config.color.txt_primary,
          }}
        >
          Vay c???m c???
        </h2>
      </div>
      <WhiteSpace size="lg" />
      <WingBlank size="lg">
        <Flex css={{ overflow: "visible" }} align={"start"}>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/computer-pawn";
            }}
          >
            <div className={"circle-76"}>
              <img src={svgIMac} alt={"C???m m??y t??nh"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            C???m m??y t??nh
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/mobile-phone-pawn";
            }}
          >
            <div className={"circle-76"}>
              <img src={svgPhone} alt={"C???m ??i???n tho???i"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            C???m ??i???n tho???i
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/car-pawn";
            }}
          >
            <div className={"circle-76"}>
              <img src={svgCar} alt={"C???m ?? t??"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            C???m ?? t??
            <WhiteSpace size="lg" />
          </Flex.Item>
        </Flex>
        <Flex css={{ overflow: "visible" }} align={"start"}>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/motorbike-pawn";
            }}
          >
            <div className={"circle-76"}>
              <img src={svgBike} alt={"C???m xe m??y"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            C???m xe m??y
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/jewel-pawn";
            }}
          >
            <div className={"circle-76"}>
              <img src={svgDiamond} alt={"C???m ???? qu??"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            C???m ???? qu??
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/watch-pawn";
            }}
          >
            <div className={"circle-76"}>
              <img src={svgWatch} alt={"C???m ?????ng h???"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            C???m ?????ng h???
            <WhiteSpace size="lg" />
          </Flex.Item>
        </Flex>{" "}
        <Flex css={{ overflow: "visible" }} align={"start"}>
          <Flex.Item css={productFlexItemStyle}></Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
            onClick={() => {
              window.location.href = "/#/products/house-mortage-loan";
            }}
          >
            <div className={"circle-76"}>
              <img src={svgBuildings} alt={"Vay th??? ch???p theo s??? ?????"} />
            </div>{" "}
            <WhiteSpace size="lg" />
            Vay th??? ch???p <br />
            theo s??? ?????
            <WhiteSpace size="lg" />
          </Flex.Item>
          <Flex.Item
            css={productFlexItemStyle}
            className={"product-item"}
          ></Flex.Item>
        </Flex>{" "}
      </WingBlank>
    </div>
  );
}

function MProductList(props) {
  return (
    <div className={"product-list"}>
      <div
        css={{
          textAlign: "center",
        }}
      >
        <h2
          css={{
            fontSize: "20px",
            color: "#707070",
          }}
        >
          M???i b???n ch???n g??i s???n ph???m vay
        </h2>
      </div>
      <WhiteSpace size="lg" />
      <WingBlank size="lg">
        <MListLoan />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <MListPawn />
      </WingBlank>
    </div>
  );
}

function MProductListPawn(props) {
  return (
    <div className={"product-list"}>
      <div
        css={{
          textAlign: "center",
        }}
      >
        <h2
          css={{
            fontSize: "20px",
            color: "#707070",
          }}
        >
          M???i b???n ch???n g??i s???n ph???m c???m c??? t??i s???n
        </h2>
      </div>
      <WhiteSpace size="lg" />
      <WingBlank size="lg">
        <MListPawn />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <MListLoan />
      </WingBlank>
    </div>
  );
}
