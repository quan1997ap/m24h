/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React, {
  Component,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import PropTypes from "prop-types";
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
import {
  Carousel as DCarousel,
  Table as DTable,
  Row as DRow,
  Col as DCol,
} from "antd";
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
import { ls, lg, lr, lgd } from "common/local_storage";
import {
  ed as pachiu,
  fromB64,
  toB64,
  dec as simla,
  decjson as simlason,
  enc as lasim,
  encjson as lasimson,
} from "common/hash/ed";
import { SpaceLg, SpaceMd, loadingIndicator } from "common/component";
import { Desktop, Tablet, Mobile } from "common/responsive";
import { slide as Menu } from "react-burger-menu";
import { DFooter, MFooter } from "controllers/Footer";
import { MTopBar, DTopBar, DQuestions } from "controllers/Topbar";
import {
  MGetLoanSteps,
  DGetLoanSteps,
  SideWhyBlockItem,
} from "controllers/Common";
import { moneyFormat, toCapitalLetter } from "common/strings";
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
import imgQuickApplyBannerDesktop from "assets/images/home/quick@3x.png";
import imgQuickApplyBanner from "assets/images/home/quick-apply-loan@3x.png";
import imgSignInBanner from "assets/images/signin/banner@3x.png";

import queryString from "query-string";
const uuidv4 = require("uuid/v4");
const axios = require("axios");
const numeral = require("numeral");
const ListItem = List.Item;
const Brief = ListItem.Brief;
const Preload = require("react-preload").Preload;

const preloadImages = [
  // svgMenu,
  // svgMenuClose,
  // svgMoney,
  // svgBike,
  // svgCar,
  // svgCreditCard,
  // svgHouse,
  // svgInvoice,
  // svgPhone,
  // svgIMac,
  // svgBuildings,
  // svgDiamond,
  // svgWatch,
  // svgLogoMenuTop,
  // svgLoanStepBusinessman,
  // svgLoanStepPayment,
  // svgLoanStepUsers,
  // svgLoanStepWebsite,
  // svgCheckIcon,
  // imgLoanBanner,
  // imgQuickApplyBanner,
  // imgWhyBanner,
  // imgSignInBanner,
];

const productFlexItemStyle = {
  overflow: "visible",
};

const styleListApplicationItem = {
  overflow: "visible",
};

const styleLatestApplications = {
  background: "#fff",
  height: "758px",
  borderRadius: "5px",
  paddingTop: "18px",
  paddingBottom: "18px",
};

const styleQuickApplyLoan = {
  background: "#fff",
  borderBottomLeftRadius: "5px",
  borderBottomRightRadius: "5px",
  paddingTop: "18px",
  paddingBottom: "18px",
};

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visit_source: lgd("visit_source", "mf24h"),
      product_list: config.product_list,
      latest_applications: [],
      city_provinces: config.city_provinces.data,
      form_product: "not-selected",
      form_loan_money: "not-selected",
      form_loan_period: "not-selected",

      form_full_name: lgd("form_full_name", ""),
      form_mobile_phone: lgd("form_mobile_phone", ""),
      lock_mobile_phone: lgd("form_mobile_phone", "") !== "" ? true : false,
      form_city_provinces: lgd("form_city_provinces", "not-selected"),
      form_city_districts: lgd("form_city_districts", "not-selected"),
    };

    // log(config);
  }

  componentDidUpdate(prevProps) {}

  UNSAFE_componentWillMount() {
    this.writeVisitSource();
    if (this.state.form_city_provinces !== "not-selected") {
      this.loadDistrictByCityProvince();
    }

    this.loadLastestLoanApplications();
  }
  componentDidMount() {
    this.writeVisitSource();
    window.scrollTo(0, 0);
  }

  writeVisitSource = () => {
    let pq = queryString.parse(this.props.location.search);
    console.log(pq);

    if (pq["utm_source"]) {
      ls("visit_source", pq["utm_source"]);
      this.setState({
        visit_source: pq["utm_source"],
      });
    } else if (pq["visit_source"]) {
      ls("visit_source", pq["visit_source"]);
      this.setState({
        visit_source: pq["visit_source"],
      });
    } else if (pq["source"]) {
      ls("visit_source", pq["source"]);
      this.setState({
        visit_source: pq["source"],
      });
    }
  };

  handleFormSubmit = () => {
    let $this = this;
    let applicationData = {
      brave: true,
      visit_source: this.state.visit_source,
      form_product: this.state.form_product,
      form_loan_money: this.state.form_loan_money,
      form_loan_period: this.state.form_loan_period,
      form_full_name: this.state.form_full_name,
      form_mobile_phone: this.state.form_mobile_phone,
      form_city_provinces: this.state.form_city_provinces,
      form_city_districts: this.state.form_city_districts,
    };
    let hasAlerted = false;
    let isOK = true;

    if (applicationData.form_product === "not-selected") {
      isOK = false;
    }

    if (applicationData.form_loan_money === "not-selected") {
      isOK = false;
    }

    if (applicationData.form_loan_period === "not-selected") {
      isOK = false;
    }

    // if (applicationData.form_city_provinces === "not-selected") {
    //   isOK = false;
    // }

    // if (applicationData.form_city_districts === "not-selected") {
    //   isOK = false;
    // }

    if (applicationData.form_full_name === "") {
      isOK = false;
    }

    if (applicationData.form_mobile_phone === "") {
      isOK = false;
    } else {
      var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      var mobile = applicationData.form_mobile_phone;
      var mobile_vn;
      var mobile_with_country_code;
      var is_mobile_ok = false;

      if (mobile.startsWith("+84")) {
        mobile_vn = "0" + mobile.substring(3);
        mobile_with_country_code = mobile;
      } else if (mobile.startsWith("84")) {
        mobile_vn = "0" + mobile.substring(2);
        mobile_with_country_code = "+" + mobile;
      } else if (mobile.startsWith("0") && mobile.length === 10) {
        mobile_vn = mobile;
        mobile_with_country_code = "+84" + mobile.substring(1);
      }

      applicationData.mobile_with_country_code = mobile_with_country_code;

      if (mobile_vn !== "") {
        if (vnf_regex.test(mobile) === false) {
          hasAlerted = true;
          alert("S??? ??i???n tho???i c???a b???n kh??ng ????ng ?????nh d???ng!");
        } else {
          is_mobile_ok = true;
        }
      } else {
        hasAlerted = true;
        alert("B???n ch??a ??i???n s??? ??i???n tho???i!");
      }

      if (is_mobile_ok === false) {
        isOK = false;
      }
    }

    if (isOK === true) {
      axios
        .post(
          config.api.loan_application.create,
          { data: lasimson(applicationData) },
          {
            headers: {},
          }
        )
        .then(function (response) {
          let res = simlason(response.data.data);
          if (res.success) {
            alert(
              "Xin c???m ??n. B???n s??? ???????c MF24H li??n h??? trong th???i gian s???m nh???t. Chi ti???t xin g???i: " +
                config.hotline
            );
          }
        })
        .catch(function (error) {
          let res = simlason(error.response.data.data);
          if (res.message) {
            alert(res.message);
          } else {
            alert("Xin h??y nh???p ????ng th??ng tin v?? th??? l???i.");
          }
        })
        .then(function () {});
    } else {
      if (hasAlerted === false) {
        alert("M???i b???n nh???p ?????y ????? th??ng tin tr??n form.");
      }
    }
  };

  handleFormInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState(
      {
        [name]: value,
      },
      () => {
        if (
          [
            "form_full_name",
            "form_mobile_phone",
            "form_city_provinces",
            "form_city_districts",
          ].includes(name)
        ) {
          ls(name, value);
        }

        if (name === "form_city_provinces") {
          this.loadDistrictByCityProvince();
        }
        log(this.state);
      }
    );
  };

  loadLastestLoanApplications = () => {
    let $this = this;
    axios
      .get(config.api.loan_application.latest)
      .then(function (response) {
        // handle success
        let latest_applications = simlason(response.data.data).data;
        log(latest_applications);
        $this.setState(
          (state) => ({
            latest_applications: latest_applications,
          }),
          () => {}
        );
      })
      .catch(function (error) {
        // handle error
        log(error);
      })
      .then(function () {});
  };

  loadDistrictByCityProvince = () => {
    let $this = this;
    let districts = lg("city_province_id" + $this.state.form_city_provinces);

    if (districts !== null) {
      $this.setState(
        (state) => ({
          city_districts: JSON.parse(districts),
        }),
        () => {}
      );
    } else {
      axios
        .get(config.api.city.city_districts, {
          params: {
            city_province_id: $this.state.form_city_provinces,
          },
        })
        .then(function (response) {
          // handle success
          let districts = simlason(response.data.data).data;
          $this.setState(
            (state) => ({
              city_districts: districts,
            }),
            () => {
              ls(
                "city_province_id" + $this.state.form_city_provinces,
                JSON.stringify(districts)
              );
            }
          );
        })
        .catch(function (error) {
          // handle error
          log(error);
        })
        .then(function () {});
    }
  };

  createProductOptions = () => {
    let table = [];
    if (this.state.product_list) {
      // Outer loop to create parent
      for (let i = 0; i < this.state.product_list.length; i++) {
        let opt = this.state.product_list[i];

        table.push(
          <option key={"product_" + i} value={opt.product_id}>
            {opt.product_name}
          </option>
        );
      }
    }

    return table;
  };

  createLoanMoneyOptions = () => {
    let table = [];
    if (this.state.form_product !== "not-selected") {
      let list = [].concat(
        _.map(config.products[this.state.form_product].money, (v, k, c) => {
          let cardlimit = v;
          if (cardlimit >= 1000000000) {
            let cardLimitNum = cardlimit.toString();
            if (cardLimitNum.length >= 9) {
              cardLimitNum = cardLimitNum.substr(0, cardLimitNum.length - 9);
              cardLimitNum = cardLimitNum + " T???";
              v = cardLimitNum;
            }
          } else if (cardlimit >= 100000000) {
            let cardLimitNum = cardlimit.toString();
            if (cardLimitNum.length >= 7) {
              cardLimitNum = cardLimitNum.substr(0, cardLimitNum.length - 6);
              cardLimitNum = cardLimitNum + " Tri???u";
              v = cardLimitNum;
            }
          } else if (cardlimit >= 1000000) {
            let cardLimitNum = cardlimit.toString();
            if (cardLimitNum.length >= 7) {
              cardLimitNum = cardLimitNum.substr(0, cardLimitNum.length - 6);
              cardLimitNum = cardLimitNum + " Tri???u";
              v = cardLimitNum;
            }
          }

          return {
            k: k,
            v: v + " VN??",
          };
        })
      );

      // Outer loop to create parent
      for (let i = 0; i < list.length; i++) {
        let opt = list[i];

        table.push(
          <option key={"money_opts" + i} value={opt.k}>
            {opt.v}
          </option>
        );
      }
    }

    return table;
  };

  createLoanPeriodOptions = () => {
    let table = [];
    if (this.state.form_product !== "not-selected") {
      let list = [].concat(
        _.map(config.products[this.state.form_product].period, (v, k, c) => {
          if (k.includes("m")) {
            return {
              k: k,
              v: v + " Th??ng",
            };
          } else if (k.includes("d")) {
            return {
              k: k,
              v: v + " Ng??y",
            };
          }
        })
      );

      // Outer loop to create parent
      for (let i = 0; i < list.length; i++) {
        let opt = list[i];

        table.push(
          <option key={"period_opts" + i} value={opt.k}>
            {opt.v}
          </option>
        );
      }
    }

    return table;
  };

  createCityProvinceOptions = () => {
    let table = [];
    if (this.state.city_provinces) {
      // Outer loop to create parent
      for (let i = 0; i < this.state.city_provinces.length; i++) {
        let opt = this.state.city_provinces[i];

        table.push(
          <option key={"city_opts" + i} value={opt.city_province_id}>
            {opt.name}
          </option>
        );
      }
    }

    return table;
  };

  createDistrictOptions = () => {
    let table = [];
    if (this.state.city_districts) {
      // Outer loop to create parent
      for (let i = 0; i < this.state.city_districts.length; i++) {
        let opt = this.state.city_districts[i];

        table.push(
          <option key={"district_opts" + i} value={opt.district_id}>
            {opt.name}
          </option>
        );
      }
    }

    return table;
  };

  showDesktop = () => {
    return (
      <React.Fragment>
        <DTopBar />
        <DCarouselTop />
        {/* <DLatestApplications parentState={this.state} /> */}
        <div className={"home-question"}>
            <div className={"bulma-container"}>
            <h2 style={{
                textAlign: 'center', 
                padding: '20px 0 20px 0', 
                fontSize: '26px', 
                color: 'rgb(255, 82, 82)' }}>
                C??u h???i th?????ng g???p
            </h2>
                <DQuestions/>           
            </div>
        </div>
        <DCarouselProducts />
        <DGetLoanSteps />

        <DQuickApplyLoan
          parentState={this.state}
          handleFormInputChange={this.handleFormInputChange}
          handleFormSubmit={this.handleFormSubmit}
          createProductOptions={this.createProductOptions}
          createLoanMoneyOptions={this.createLoanMoneyOptions}
          createLoanPeriodOptions={this.createLoanPeriodOptions}
          createCityProvinceOptions={this.createCityProvinceOptions}
          createDistrictOptions={this.createDistrictOptions}
        />
        <DFooter />
      </React.Fragment>
    );
  };

  showTablet = () => {
    return "";
  };

  showMobile = () => {
    return (
      <React.Fragment>
        <MTopBar />
        <MQuickApplyLoan
          parentState={this.state}
          handleFormInputChange={this.handleFormInputChange}
          handleFormSubmit={this.handleFormSubmit}
          createProductOptions={this.createProductOptions}
          createLoanMoneyOptions={this.createLoanMoneyOptions}
          createLoanPeriodOptions={this.createLoanPeriodOptions}
          createCityProvinceOptions={this.createCityProvinceOptions}
          createDistrictOptions={this.createDistrictOptions}
        />  
        <div style={{background: 'transparent', padding: '30px 0 40px 0'  }}>
          <h2 style={{textAlign: 'center', padding: '0px 0 30px 0', fontSize: '20px', color: 'rgb(255, 82, 82)' }}>
            C??u h???i th?????ng g???p
          </h2>
          <DQuestions/>    
        </div>
        {/* <MCarouselTop /> */}
        <MCarouselProducts />
        {/* <MLatestApplications parentState={this.state} /> */}     
        <MGetLoanSteps />
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
          <div className={"mf24"}>
            <div className={"page-home"}>
              <Desktop>{this.showDesktop()}</Desktop>
              <Tablet>{this.showMobile()}</Tablet>
              <Mobile>{this.showMobile()}</Mobile>
            </div>
          </div>
        </React.Fragment>
      </Preload>
    );
  }
}

HomePage.propTypes = {
  location: Object,
};

function DCarouselTop(props) {
  return (
    <DCarousel autoplay={true}>
      {["home-slide3", "home-slide1", "home-slide2"].map((val) => (
        <div className={val} key={val} />
      ))}
    </DCarousel>
  );
}

function MCarouselTop(props) {
  return (
    <Carousel
      autoplay={true}
      infinite
      // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
      // afterChange={index => console.log("slide to", index)}
      dotActivecss={{ background: "#fff" }}
    >
      {["home-slide1", "home-slide2"].map((val) => (
        <div className={val} key={val} />
      ))}
    </Carousel>
  );
}

function DCarouselProducts(props) {
  return (
    <React.Fragment>
      <div className={"bulma-container"}>
        <WhiteSpace size="lg" />
        <div
          css={{
            textAlign: "center",
          }}
        >
          <h2
            css={{
              fontSize: "30px",
              color: config.color.txt_primary,
            }}
          >
            M???i b???n ch???n g??i s???n ph???m
          </h2>
        </div>
        <WhiteSpace size="lg" />
        <Carousel
          className="carousel-products product-grid"
          autoplay={false}
          infinite
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log("slide to", index)}
          dotStyle={{ background: "#E0E0E0", top: "100px" }}
          dotActiveStyle={{
            background: config.color.primary,
            top: "100px",
          }}
        >
          <WingBlank size="xs" css={{}}>
            <Flex css={{ overflow: "visible" }} align={"start"}>
              <Flex.Item
                css={productFlexItemStyle}
                className={"product-item"}
                onClick={() => {
                  window.location.href = "/#/products/computer-pawn";
                }}
              >
                <div className={"circle-96"} css={{ margin: "auto" }}>
                  <img
                    src={svgIMac}
                    alt={"C???m m??y t??nh"}
                    css={{ width: "50px", height: "45px", marginTop: "-6px" }}
                  />
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
                <div className={"circle-96"} css={{ margin: "auto" }}>
                  <img
                    src={svgPhone}
                    alt={"C???m ??i???n tho???i"}
                    css={{ width: "28px", height: "50px", marginTop: "-6px" }}
                  />
                </div>{" "}
                <WhiteSpace size="lg" />
                C???m ??i???n tho???i
                <WhiteSpace size="lg" />
              </Flex.Item>{" "}
              <Flex.Item
                css={productFlexItemStyle}
                className={"product-item"}
                onClick={() => {
                  window.location.href = "/#/products/car-pawn";
                }}
              >
                <div className={"circle-96"} css={{ margin: "auto" }}>
                  <img
                    src={svgCar}
                    alt={"C???m ?? t??"}
                    css={{ width: "64px", height: "30px", marginTop: "-6px" }}
                  />
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
                <div className={"circle-96"} css={{ margin: "auto" }}>
                  <img
                    src={svgBike}
                    alt={"C???m xe m??y"}
                    css={{ width: "40px", height: "55px", marginTop: "-6px" }}
                  />
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
                <div className={"circle-96"} css={{ margin: "auto" }}>
                  <img
                    src={svgDiamond}
                    alt={"C???m ???? qu??"}
                    css={{ width: "52px", height: "52px", marginTop: "-6px" }}
                  />
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
                <div className={"circle-96"} css={{ margin: "auto" }}>
                  <img
                    src={svgWatch}
                    alt={"C???m ?????ng h???"}
                    css={{ width: "33px", height: "50px", marginTop: "-6px" }}
                  />
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
                <div className={"circle-96"} css={{ margin: "auto" }}>
                  <img
                    src={svgBuildings}
                    alt={"Vay th??? ch???p theo s??? ?????"}
                    css={{ width: "48px", height: "48px", marginTop: "-6px" }}
                  />
                </div>{" "}
                <WhiteSpace size="lg" />
                Vay th??? ch???p <br />
                theo s??? ?????
                <WhiteSpace size="lg" />
              </Flex.Item>
            </Flex>
          </WingBlank>

          <WingBlank size="lg" css={{}}>
            <Flex css={{ overflow: "visible" }} align={"start"}>
              <Flex.Item
                css={productFlexItemStyle}
                className={"product-item"}
                onClick={() => {
                  window.location.href = "/#/products/credit-loan";
                }}
              >
                <div className={"circle-96"} css={{ margin: "auto" }}>
                  <img
                    src={svgCreditCard}
                    alt={"Vay t??n ch???p theo l????ng"}
                    css={{ width: "60px", height: "44px", marginTop: "-6px" }}
                  />
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
                  window.location.href =
                    "/#/products/household-registration-loan";
                }}
              >
                <div className={"circle-96"} css={{ margin: "auto" }}>
                  <img
                    src={svgHouse}
                    alt={"Vay theo s??? h??? kh???u"}
                    css={{ width: "50px", height: "50px", marginTop: "-6px" }}
                  />
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
                  window.location.href =
                    "/#/products/motorbike-registration-loan";
                }}
              >
                <div className={"circle-96"} css={{ margin: "auto" }}>
                  <img
                    src={svgBike}
                    alt={"Vay theo ????ng k?? xe m??y"}
                    css={{ width: "40px", height: "55px", marginTop: "-6px" }}
                  />
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
                <div className={"circle-96"} css={{ margin: "auto" }}>
                  <img
                    src={svgMoney}
                    alt={"Vay tr??? g??p"}
                    css={{ width: "52px", height: "52px", marginTop: "-6px" }}
                  />
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
                <div className={"circle-96"} css={{ margin: "auto" }}>
                  <img
                    src={svgInvoice}
                    alt={"Vay theo ho?? ????n ??i???n n?????c"}
                    css={{ width: "38px", height: "52px", marginTop: "-6px" }}
                  />
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
                  <img
                    src={svgCar}
                    alt={"Vay theo ????ng k?? xe ?? t??"}
                    css={{ width: "64px", height: "30px", marginTop: "-6px" }}
                  />
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
                <div className={"circle-96"} css={{ margin: "auto" }}>
                  <img
                    src={svgPhone}
                    alt={"Vay theo iCloud iPhone"}
                    css={{ width: "28px", height: "50px", marginTop: "-6px" }}
                  />
                </div>{" "}
                <WhiteSpace size="lg" />
                Vay theo <br />
                iCloud iPhone
                <WhiteSpace size="lg" />
              </Flex.Item>
            </Flex>
          </WingBlank>
        </Carousel>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
      </div>
    </React.Fragment>
  );
}

function MCarouselProducts(props) {
  return (
    <React.Fragment>
      <WhiteSpace size="lg" />
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
          M???i b???n ch???n g??i s???n ph???m
        </h2>
      </div>
      <WhiteSpace size="lg" />
      <Carousel
        className="carousel-products product-grid"
        autoplay={false}
        infinite
        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        // afterChange={index => console.log("slide to", index)}
        dotStyle={{ background: "#E0E0E0", top: "100px" }}
        dotActiveStyle={{
          background: config.color.primary,
          top: "100px",
        }}
      >
        <WingBlank size="xs" css={{}}>
          <Flex css={{ overflow: "visible" }} align={"start"}>
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

            {/* <Flex.Item
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
            </Flex.Item> */}
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
          </Flex>
          <Flex css={{ overflow: "visible" }} align={"start"}>
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
          </Flex>{" "}
        </WingBlank>

        <WingBlank size="lg" css={{}}>
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
                window.location.href =
                  "/#/products/household-registration-loan";
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
                window.location.href =
                  "/#/products/motorbike-registration-loan";
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
        </WingBlank>
      </Carousel>
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
    </React.Fragment>
  );
}

function DLatestApplicationItem(props) {
  let cssFlexItem = { paddingLeft: "20px" };
  let cssNoBorderRight = { borderRight: "none" };

  return (
    <Flex
      css={styleListApplicationItem}
      className={`loan-application-item ${props.data.class}`}
      align={"start"}
    >
      <Flex.Item css={cssFlexItem}>
        <div className="item-name">{props.data.name}</div>
      </Flex.Item>
      <Flex.Item css={cssFlexItem}>
        <div className="item-phone">{props.data.phone}</div>
      </Flex.Item>
      <Flex.Item css={cssFlexItem}>
        <div className="item-address">{props.data.address}</div>
      </Flex.Item>
      <Flex.Item css={cssFlexItem}>
        <div className="item-money">{props.data.money}</div>
      </Flex.Item>
      <Flex.Item css={[cssFlexItem, cssNoBorderRight]}>
        <div className="item-product">{props.data.product}</div>
      </Flex.Item>
    </Flex>
  );
}

function MLatestApplicationItem(props) {
  return (
    <Flex
      css={styleListApplicationItem}
      className={"loan-application-item"}
      align={"start"}
    >
      <Flex.Item>
        <div className="item-name">{props.data.name}</div>
        <div className="item-phone">{props.data.phone}</div>
        <div className="item-address">{props.data.address}</div>
      </Flex.Item>
      <Flex.Item>
        <div className="item-money">{props.data.money}</div>
        <div className="item-product">{props.data.product}</div>
      </Flex.Item>
    </Flex>
  );
}

function DLatestApplications(props) {
  const styleLatestApplicationsDesktop = {
    background: "#fff",
    height: "auto",
    borderRadius: "5px",
    paddingTop: "18px",
    paddingBottom: "18px",
  };

  let elems = [1, 2, 3, 4, 5];
  return (
    <React.Fragment>
      <div className={" block-grey"}>
        <div className={"bulma-container latest-loan-applications"}>
          <WingBlank size="lg">
            <div css={styleLatestApplicationsDesktop}>
              <DRow>
                <DCol span={18} css={{ borderRight: "1px solid #F0F0F0" }}>
                  <WingBlank size="lg">
                    <div css={{ textAlign: "center" }}>
                      <div
                        css={{
                          color: "#404040",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        DANH S??CH ????N XIN VAY M???I NH???T
                      </div>
                      <WhiteSpace size="md" />
                    </div>

                    <ul>
                      <li>
                        <DLatestApplicationItem
                          data={{
                            class: "head",
                            name: "Kh??ch h??ng",
                            phone: "S??? ??i???n tho???i",
                            address: "T???nh/ Th??nh ph???",
                            money: "Nhu c???u vay",
                            product: "S???n ph???m",
                          }}
                        />
                      </li>

                      {props.parentState.latest_applications
                        ? props.parentState.latest_applications.map(
                            (value, index) => {
                              return (
                                <li key={index}>
                                  <DLatestApplicationItem
                                    data={{
                                      class: "normal",
                                      name: value.form_full_name,
                                      phone: "***********",
                                      address: value.address,
                                      money:
                                        moneyFormat(value.loan_money) + " VN??",
                                      product:
                                        config.products[value.form_product]
                                          .name,
                                    }}
                                  />
                                </li>
                              );
                            }
                          )
                        : ""}
                    </ul>
                  </WingBlank>
                </DCol>
                <DCol span={6}>
                  {" "}
                  <WingBlank size="lg">
                    <div
                      css={{
                        textAlign: "center",
                        paddingTop: "40px",
                        paddingBottom: "20px",
                      }}
                    >
                      <div css={{ color: "#404040", fontWeight: 500 }}>
                        {" "}
                        ????ng k?? vay ????n gi???n ch??? v??i b?????c !
                      </div>{" "}
                      <WhiteSpace size="md" />
                      <Button
                        className={"button-green"}
                        css={{
                          background: config.color.btn_green,
                          borderColor: config.color.btn_green,
                        }}
                        type="primary"
                        onClick={() => {
                          window.location.href = "/#/products/credit-loan";
                        }}
                      >
                        ????ng k?? vay ngay
                      </Button>{" "}
                    </div>{" "}
                    <WingBlank size="lg">
                      <div
                        style={{
                          padding: "8px 0",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <strong css={{ color: "#25b009" }}>???</strong> ????ng k??
                        vay online ????n gi???n
                      </div>
                      <div
                        style={{
                          padding: "8px 0",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <strong css={{ color: "#25b009" }}>???</strong> Duy???t
                        th??ng tin ????ng k?? nhanh
                        <br />
                        qua ??i???n tho???i
                      </div>
                      <div
                        style={{
                          padding: "8px 0",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <strong css={{ color: "#25b009" }}>???</strong> K?? h???p
                        ?????ng t???i ?????a ??i???m
                        <br />
                        kh??ch h??ng ch??? ?????nh
                      </div>
                      <div
                        style={{
                          padding: "8px 0",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <strong css={{ color: "#25b009" }}>???</strong> Gi???i ng??n
                        trong ng??y
                      </div>
                      <div
                        style={{
                          padding: "8px 0",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <strong css={{ color: "#25b009" }}>???</strong> B???o m???t
                        kho???n vay tuy???t ?????i
                      </div>
                      <div
                        style={{
                          padding: "8px 0",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <strong css={{ color: "#25b009" }}>???</strong> Kh??ng gi???
                        t??i s???n
                      </div>{" "}
                    </WingBlank>
                  </WingBlank>
                </DCol>
              </DRow>{" "}
            </div>
          </WingBlank>
        </div>
      </div>
    </React.Fragment>
  );
}

DLatestApplications.propTypes = {
  parentState: PropTypes.object,
};

function MLatestApplications(props) {
  let elems = [1, 2, 3, 4, 5];
  return (
    <div className={"latest-loan-applications block-grey"}>
      <WingBlank size="lg">
        <div css={styleLatestApplications}>
          <WingBlank size="lg">
            <div css={{ textAlign: "center" }}>
              <div
                css={{
                  color: "#404040",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {" "}
                DANH S??CH ????N XIN VAY M???I NH???T
              </div>{" "}
              <WhiteSpace size="md" />
            </div>

            <ul>
              {props.parentState.latest_applications.map((value, index) => {
                return (
                  <li key={index}>
                    <MLatestApplicationItem
                      data={{
                        class: "normal",
                        name: value.form_full_name,
                        phone: "***********",
                        address: value.address,
                        money: moneyFormat(value.loan_money) + " VN??",
                        product: config.products[value.form_product].name,
                      }}
                    />
                  </li>
                );
              })}
            </ul>

            <div css={{ textAlign: "center", paddingTop: "18px" }}>
              <div css={{ color: "#404040", fontWeight: 500 }}>
                {" "}
                ????ng k?? vay ????n gi???n ch??? v??i b?????c !
              </div>{" "}
              <WhiteSpace size="md" />
              <Button
                className={"button-green"}
                css={{
                  background: config.color.btn_green,
                  borderColor: config.color.btn_green,
                }}
                type="primary"
                onClick={() => {
                  window.location.href = "/#/products/credit-loan";
                }}
              >
                ????ng k?? vay ngay
              </Button>{" "}
            </div>
          </WingBlank>
        </div>
      </WingBlank>
    </div>
  );
}

MLatestApplications.propTypes = {
  parentState: PropTypes.object,
};

function DQuickApplyLoan(props) {
  const refForm = useRef();
  const [cWidth, setCWidth] = useState("680px");

  const styleQuickApplyLoanDesktop = {
    display: "table",
    width: "100%",
    background: "#fff",
    borderRadius: "10px",
  };

  useLayoutEffect(() => {
    function updateSize() {
      const { current } = refForm;
      // console.log(current.clientWidth);
      let newWidth = current.clientWidth - 447;

      setCWidth(newWidth.toString() + "px");
    }

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <React.Fragment>
      <div className={"block-grey"}>
        <div className={"bulma-container quick-apply-loan quick-form"}>
          <WingBlank size="lg">
            <div
              css={styleQuickApplyLoanDesktop}
              className={"form-container"}
              ref={refForm}
            >
              <div className={"banner-image"} css={{ float: "left" }}></div>
              <div
                css={{
                  float: "left",
                  width: cWidth,
                }}
              >
                <WingBlank size="lg" css={{ width: "100%", margin: "auto" }}>
                  <div
                    css={{
                      margin: "auto",
                    }}
                  >
                    <div css={{ textAlign: "left", minWidth: "680px" }}>
                      <div
                        css={{
                          color: "#404040",
                          fontWeight: "bold",
                          fontSize: "20px",
                          padding: "30px 0",
                          borderBottom: "1px solid #ececf1",
                          width: "100%",
                          textTransform: "uppercase",
                        }}
                      >
                        ????NG K?? VAY NHANH, ????n gi???n ch??? v??i b?????c !
                      </div>{" "}
                      <WhiteSpace size="md" />
                    </div>
                    <WhiteSpace size="md" />
                    <Flex>
                      <Flex.Item>
                        <div className={"bulma-field primary-field"}>
                          <label className={"bulma-label"}>S???n ph???m vay</label>
                          <div className={"bulma-control"}>
                            <div className={"bulma-select bulma-is-fullwidth"}>
                              <select
                                id="formProduct"
                                name="form_product"
                                value={props.parentState.form_product}
                                onChange={props.handleFormInputChange}
                              >
                                <option value="not-selected">
                                  M???i b???n ch???n s???n ph???m vay
                                </option>
                                {props.createProductOptions()}
                              </select>
                            </div>
                          </div>
                        </div>
                      </Flex.Item>{" "}
                      <Flex.Item> </Flex.Item>
                    </Flex>
                    <WhiteSpace size="md" />
                    <Flex>
                      <Flex.Item>
                        <div className={"bulma-field primary-field"}>
                          <label className={"bulma-label"}>
                            S??? ti???n mu???n vay
                          </label>
                          <div className={"bulma-control"}>
                            <div className={"bulma-select bulma-is-fullwidth"}>
                              {props.parentState.form_product &&
                              props.parentState.form_product !==
                                "not-selected" ? (
                                <select
                                  id="formLoanMoney"
                                  name="form_loan_money"
                                  value={props.parentState.form_loan_money}
                                  onChange={props.handleFormInputChange}
                                >
                                  <option value="not-selected">
                                    M???i b???n ch???n s??? ti???n vay
                                  </option>
                                  {props.createLoanMoneyOptions()}
                                </select>
                              ) : (
                                <select
                                  id="formLoanMoney"
                                  name="form_loan_money"
                                  value={props.parentState.form_loan_money}
                                  onChange={props.handleFormInputChange}
                                >
                                  <option value="not-selected">
                                    M???i b???n ch???n s???n ph???m vay tr?????c
                                  </option>
                                </select>
                              )}
                            </div>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={"bulma-field primary-field"}>
                          <label className={"bulma-label"}>Th???i gian vay</label>
                          <div className={"bulma-control"}>
                            <div className={"bulma-select bulma-is-fullwidth"}>
                              {props.parentState.form_product &&
                              props.parentState.form_product !==
                                "not-selected" ? (
                                <select
                                  id="formLoanPeriod"
                                  name="form_loan_period"
                                  value={props.parentState.form_loan_period}
                                  onChange={props.handleFormInputChange}
                                >
                                  <option value="not-selected">
                                    M???i b???n ch???n th???i gian vay
                                  </option>
                                  {props.createLoanPeriodOptions()}
                                </select>
                              ) : (
                                <select
                                  id="formLoanPeriod"
                                  name="form_loan_period"
                                  value={props.parentState.form_loan_period}
                                  onChange={props.handleFormInputChange}
                                >
                                  <option value="not-selected">
                                    M???i b???n ch???n s???n ph???m vay tr?????c
                                  </option>
                                </select>
                              )}
                            </div>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>{" "}
                    <WhiteSpace size="md" />
                    <Flex>
                      {" "}
                      <Flex.Item>
                        {" "}
                        <div className={"bulma-field"}>
                          <label className={"bulma-label"}>H??? v?? t??n</label>
                          <div className={"bulma-control"}>
                            <input
                              className={"bulma-input"}
                              type="text"
                              placeholder="M???i nh???p h??? v?? t??n "
                              id="formFullName"
                              name="form_full_name"
                              value={props.parentState.form_full_name}
                              onChange={props.handleFormInputChange}
                            />
                          </div>
                        </div>{" "}
                      </Flex.Item>{" "}
                      <Flex.Item>
                        {" "}
                        <div className={"bulma-field"}>
                          <label className={"bulma-label"}>S??? ??i???n tho???i</label>
                          <div className={"bulma-control"}>
                            {props.parentState.lock_mobile_phone === true ? (
                              <input
                                className={"bulma-input"}
                                type="tel"
                                placeholder="M???i nh???p s??? ??i???n tho???i"
                                id="formMobilePhone"
                                name="form_mobile_phone"
                                value={props.parentState.form_mobile_phone}
                                onChange={props.handleFormInputChange}
                                disabled
                              />
                            ) : (
                              <input
                                className={"bulma-input"}
                                type="tel"
                                placeholder="M???i nh???p s??? ??i???n tho???i"
                                id="formMobilePhone"
                                name="form_mobile_phone"
                                value={props.parentState.form_mobile_phone}
                                onChange={props.handleFormInputChange}
                              />
                            )}

                            {/* <input
                              className={"bulma-input"}
                              type="tel"
                              placeholder="M???i nh???p s??? ??i???n tho???i"
                              id="formMobilePhone"
                              name="form_mobile_phone"
                              value={props.parentState.form_mobile_phone}
                              onChange={props.handleFormInputChange}
                            /> */}
                          </div>
                        </div>{" "}
                      </Flex.Item>{" "}
                    </Flex>

                    {/* Display for desktop */}
                    <Flex css={{ display: "none" }}>
                      <Flex.Item>
                        {" "}
                        <div className={"bulma-field"}>
                          <label className={"bulma-label"}>
                            T???nh /th??nh ph???
                          </label>
                          <div className={"bulma-control"}>
                            <div className={"bulma-select bulma-is-fullwidth"}>
                              <select
                                id="formCityProvince"
                                name="form_city_provinces"
                                value={props.parentState.form_city_provinces}
                                onChange={props.handleFormInputChange}
                              >
                                <option value="not-selected">
                                  M???i ch???n t???nh/ th??nh ph???
                                </option>
                                {props.createCityProvinceOptions()}
                              </select>
                            </div>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={"bulma-field"}>
                          <label className={"bulma-label"}>Qu???n/ huy???n</label>
                          <div className={"bulma-control"}>
                            <div
                              className={
                                props.parentState.city_districts &&
                                props.parentState.city_districts.length > 0
                                  ? "bulma-select bulma-is-fullwidth"
                                  : "bulma-select bulma-select-disabled bulma-is-fullwidth"
                              }
                            >
                              {props.parentState.city_districts &&
                              props.parentState.city_districts.length > 0 ? (
                                <select
                                  id="formCityDistricts"
                                  name="form_city_districts"
                                  value={props.parentState.form_city_districts}
                                  onChange={props.handleFormInputChange}
                                >
                                  <option value="not-selected">
                                    M???i ch???n qu???n/ huy???n
                                  </option>
                                  {props.createDistrictOptions()}
                                </select>
                              ) : (
                                <select
                                  disabled
                                  id="formCityDistricts"
                                  name="form_city_districts"
                                  value={props.parentState.form_city_districts}
                                  onChange={props.handleFormInputChange}
                                >
                                  <option value="not-selected">
                                    M???i ch???n qu???n/ huy???n
                                  </option>
                                </select>
                              )}
                            </div>
                          </div>
                        </div>
                      </Flex.Item>{" "}
                    </Flex>
                    <div css={{ textAlign: "center" }}>
                      <WhiteSpace size="md" /> <WhiteSpace size="md" />{" "}
                      <Button
                        className={"button-green"}
                        css={{
                          background: config.color.btn_green,
                          borderColor: config.color.btn_green,
                        }}
                        type="primary"
                        onClick={props.handleFormSubmit}
                      >
                        ????ng k?? vay ngay
                      </Button>{" "}
                    </div>
                  </div>
                </WingBlank>
              </div>
            </div>
          </WingBlank>
        </div>
      </div>
    </React.Fragment>
  );
}

function MQuickApplyLoan(props) {
  return (
    <div className={"quick-apply-loan block-grey"}>
      <WingBlank size="lg">
        <div className={"banner-image"} />
        <div css={styleQuickApplyLoan}>
          <WingBlank size="lg">
            <div className={"bulma-field primary-field"}>
              <div className={"bulma-control"}>
                <div className={"bulma-select bulma-is-fullwidth"}>
                  <select
                    id="formProduct"
                    name="form_product"
                    value={props.parentState.form_product}
                    onChange={props.handleFormInputChange}
                  >
                    <option value="not-selected">
                      B???n mu???n vay b???ng
                    </option>
                    {props.createProductOptions()}
                  </select>
                </div>
              </div>
            </div>
            <div className={"bulma-field primary-field"}>
              <div className={"bulma-control"}>
                <div className={"bulma-select bulma-is-fullwidth"}>
                  {props.parentState.form_product &&
                  props.parentState.form_product !== "not-selected" ? (
                    <select
                      id="formLoanMoney"
                      name="form_loan_money"
                      value={props.parentState.form_loan_money}
                      onChange={props.handleFormInputChange}
                    >
                      <option value="not-selected">
                        M???i b???n ch???n s??? ti???n vay
                      </option>
                      {props.createLoanMoneyOptions()}
                    </select>
                  ) : (
                    <select
                      id="formLoanMoney"
                      name="form_loan_money"
                      value={props.parentState.form_loan_money}
                      onChange={props.handleFormInputChange}
                    >
                      <option value="not-selected">
                        M???i b???n ch???n s???n ph???m vay tr?????c
                      </option>
                    </select>
                  )}
                </div>
              </div>
            </div>
            <div className={"bulma-field primary-field"}>
              <div className={"bulma-control"}>
                <div className={"bulma-select bulma-is-fullwidth"}>
                  {props.parentState.form_product &&
                  props.parentState.form_product !== "not-selected" ? (
                    <select
                      id="formLoanPeriod"
                      name="form_loan_period"
                      value={props.parentState.form_loan_period}
                      onChange={props.handleFormInputChange}
                    >
                      <option value="not-selected">
                        M???i b???n ch???n th???i gian vay
                      </option>
                      {props.createLoanPeriodOptions()}
                    </select>
                  ) : (
                    <select
                      id="formLoanPeriod"
                      name="form_loan_period"
                      value={props.parentState.form_loan_period}
                      onChange={props.handleFormInputChange}
                    >
                      <option value="not-selected">
                        M???i b???n ch???n s???n ph???m vay tr?????c
                      </option>
                    </select>
                  )}
                </div>
              </div>
            </div>
            <div className={"bulma-field"}>
              <div className={"bulma-control"}>
                <input
                  className={"bulma-input"}
                  type="text"
                  placeholder="M???i nh???p h??? v?? t??n "
                  id="formFullName"
                  name="form_full_name"
                  value={props.parentState.form_full_name}
                  onChange={props.handleFormInputChange}
                />
              </div>
            </div>
            <div className={"bulma-field"}>
              <div className={"bulma-control"}>
                {props.parentState.lock_mobile_phone === true ? (
                  <input
                    className={"bulma-input"}
                    type="tel"
                    placeholder="M???i nh???p s??? ??i???n tho???i"
                    id="formMobilePhone"
                    name="form_mobile_phone"
                    value={props.parentState.form_mobile_phone}
                    onChange={props.handleFormInputChange}
                    disabled
                  />
                ) : (
                  <input
                    className={"bulma-input"}
                    type="tel"
                    placeholder="M???i nh???p s??? ??i???n tho???i"
                    id="formMobilePhone"
                    name="form_mobile_phone"
                    value={props.parentState.form_mobile_phone}
                    onChange={props.handleFormInputChange}
                  />
                )}
              </div>
            </div>
            <div className={"bulma-field"} css={{ display: "none" }}> 
              <div className={"bulma-control"}>
                <div className={"bulma-select bulma-is-fullwidth"}>
                  <select
                    id="formCityProvince"
                    name="form_city_provinces"
                    value={props.parentState.form_city_provinces}
                    onChange={props.handleFormInputChange}
                  >
                    <option value="not-selected">
                      M???i ch???n t???nh/ th??nh ph???
                    </option>
                    {props.createCityProvinceOptions()}
                  </select>
                </div>
              </div>
            </div>
            <div className={"bulma-field"} css={{ display: "none" }}>
              <div className={"bulma-control"}>
                <div
                  className={
                    props.parentState.city_districts &&
                    props.parentState.city_districts.length > 0
                      ? "bulma-select bulma-is-fullwidth"
                      : "bulma-select bulma-select-disabled bulma-is-fullwidth"
                  }
                >
                  {props.parentState.city_districts &&
                  props.parentState.city_districts.length > 0 ? (
                    <select
                      id="formCityDistricts"
                      name="form_city_districts"
                      value={props.parentState.form_city_districts}
                      onChange={props.handleFormInputChange}
                    >
                      <option value="not-selected">M???i ch???n qu???n/ huy???n</option>
                      {props.createDistrictOptions()}
                    </select>
                  ) : (
                    <select
                      disabled
                      id="formCityDistricts"
                      name="form_city_districts"
                      value={props.parentState.form_city_districts}
                      onChange={props.handleFormInputChange}
                    >
                      <option value="not-selected">M???i ch???n qu???n/ huy???n</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
            <div css={{ textAlign: "center" }}>
              <div css={{ color: "#404040", fontWeight: 500 }}>
                {" "}
                ????ng k?? vay ????n gi???n ch??? v??i b?????c !
              </div>{" "}
              <WhiteSpace size="md" />
              <Button
                className={"button-green"}
                css={{
                  background: config.color.btn_green,
                  borderColor: config.color.btn_green,
                }}
                type="primary"
                onClick={props.handleFormSubmit}
              >
                ????ng k?? vay ngay
              </Button>{" "}
            </div>{" "}
          </WingBlank>
        </div>
      </WingBlank>
    </div>
  );
}

let QuickApplyLoanPropTypes = {
  parentState: PropTypes.object,
  handleFormInputChange: PropTypes.func,
  handleFormSubmit: PropTypes.func,

  createProductOptions: PropTypes.func,
  createLoanMoneyOptions: PropTypes.func,
  createLoanPeriodOptions: PropTypes.func,
  createCityProvinceOptions: PropTypes.func,
  createDistrictOptions: PropTypes.func,
};

DQuickApplyLoan.propTypes = QuickApplyLoanPropTypes;
MQuickApplyLoan.propTypes = QuickApplyLoanPropTypes;

DLatestApplicationItem.propTypes = {
  data: PropTypes.object,
};

MLatestApplicationItem.propTypes = {
  data: PropTypes.object,
};

export default HomePage;
