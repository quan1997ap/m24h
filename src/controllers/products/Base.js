/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  WingBlank,
  Carousel,
  WhiteSpace,
  Checkbox,
  Button,
  Flex,
  NavBar,
  Radio,
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
import { DTopBar, MTopBar } from "controllers/Topbar";
import {
  MGetLoanSteps,
  MWhyBlock,
  DGetLoanSteps,
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
import svgLoanStepBusinessman from "assets/svg/loan-steps/businessman.svg";
import svgLoanStepPayment from "assets/svg/loan-steps/payment.svg";
import svgLoanStepUsers from "assets/svg/loan-steps/users.svg";
import svgLoanStepWebsite from "assets/svg/loan-steps/website.svg";
import svgCheckIcon from "assets/svg/check-icon.svg";
import queryString from "query-string";
const uuidv4 = require("uuid/v4");
const axios = require("axios");
const numeral = require("numeral");
const ListItem = List.Item;
const Brief = ListItem.Brief;
const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
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

class BaseProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visit_source: lgd("visit_source", "mf24h"),
      form_product: "",
      city_provinces: config.city_provinces.data,
      form_loan_money: "not-selected",
      form_loan_period: "not-selected",

      form_full_name: lgd("form_full_name", ""),
      form_mobile_phone: lgd("form_mobile_phone", ""),
      lock_mobile_phone: lgd("form_mobile_phone", "") !== "" ? true : false,
      form_city_provinces: lgd("form_city_provinces", "not-selected"),
      form_city_districts: lgd("form_city_districts", "not-selected"),
    };
  }

  componentDidUpdate(prevProps) {
    // window.scrollTo(0, 0);
  }

  UNSAFE_componentWillMount() {
    this.writeVisitSource();
    if (this.state.form_city_provinces !== "not-selected") {
      this.loadDistrictByCityProvince();
    }
  }
  componentDidMount() {
    this.writeVisitSource();
    window.scrollTo(0, 0);
  }

  writeVisitSource = () => {
    let pq = queryString.parse(this.props.location.search);

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

    if (applicationData.form_city_provinces === "not-selected") {
      isOK = false;
    }

    if (applicationData.form_city_districts === "not-selected") {
      isOK = false;
    }

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
          alert("Số điện thoại của bạn không đúng định dạng!");
        } else {
          is_mobile_ok = true;
        }
      } else {
        hasAlerted = true;
        alert("Bạn chưa điền số điện thoại!");
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
              "Xin cảm ơn. Bạn sẽ được MF24H liên hệ trong thời gian sớm nhất. Chi tiết xin gọi: " +
                config.hotline
            );
          }
        })
        .catch(function (error) {
          alert("Xin hãy nhập đúng thông tin và thử lại.");
        })
        .then(function () {});
    } else {
      if (hasAlerted === false) {
        alert("Mời bạn nhập đầy đủ thông tin trên form.");
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
              cardLimitNum = cardLimitNum + " Tỷ";
              v = cardLimitNum;
            }
          } else if (cardlimit >= 100000000) {
            let cardLimitNum = cardlimit.toString();
            if (cardLimitNum.length >= 7) {
              cardLimitNum = cardLimitNum.substr(0, cardLimitNum.length - 6);
              cardLimitNum = cardLimitNum + " Triệu";
              v = cardLimitNum;
            }
          } else if (cardlimit >= 1000000) {
            let cardLimitNum = cardlimit.toString();
            if (cardLimitNum.length >= 7) {
              cardLimitNum = cardLimitNum.substr(0, cardLimitNum.length - 6);
              cardLimitNum = cardLimitNum + " Triệu";
              v = cardLimitNum;
            }
          }

          return {
            k: k,
            v: v + " VNĐ",
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
              v: v + " Tháng",
            };
          } else if (k.includes("d")) {
            return {
              k: k,
              v: v + " Ngày",
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
}

BaseProduct.propTypes = {
  location: Object,
};

export default BaseProduct;
