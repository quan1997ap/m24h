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
import moment from "moment-timezone";
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
import { MTopBar, DTopBar } from "controllers/Topbar";
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
  height: "auto",
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

const getTime = (timestamp) => {
  // let fmt = 'dddd, MM/DD/YYYY, h:mm:ss a';
  let fmt = "DD/MM/YYYY HH:mm:ss";
  return moment.unix(timestamp).tz("Asia/Ho_Chi_Minh").format(fmt);
};

class LatestApplications extends Component {
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
          let res = simlason(error.response.data.data);
          if (res.message) {
            alert(res.message);
          } else {
            alert("Xin hãy nhập đúng thông tin và thử lại.");
          }
        })
        .then(function () {});
    } else {
      if (hasAlerted === false) {
        alert("Mời bạn nhập đầy đủ thông tin trên form.");
      }
    }
  };

  handleFormInputChange = (event) => {
    let name = event.target?.name;
    let value = event.target?.value;
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
      .get(config.api.loan_application.latest_all)
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
            {opt?.name}
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
            {opt?.name}
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
        <DLatestApplications parentState={this.state} />
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
        <MLatestApplications parentState={this.state} />
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
            <title>MF24H.com - Tài chính mọi nhà</title>
          </Helmet>

          <JSONLD>
            <Product name="Tài chính mọi nhà">
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

LatestApplications.propTypes = {
  location: Object,
};

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
        <div className="item-name" css={{ fontSize: "14px !important" }}>
          {props.data?.name}
        </div>
      </Flex.Item>
      <Flex.Item css={cssFlexItem}>
        <div className="item-phone" css={{ fontSize: "14px !important" }}>
          {props.data?.phone}
        </div>
      </Flex.Item>
      <Flex.Item css={cssFlexItem}>
        <div className="item-address" css={{ fontSize: "11px !important" }}>
          {props.data?.address}
        </div>
      </Flex.Item>
      <Flex.Item css={cssFlexItem}>
        <div className="item-money" css={{ fontSize: "14px !important" }}>
          {props.data?.money}
        </div>
      </Flex.Item>
      <Flex.Item css={[cssFlexItem, cssNoBorderRight]}>
        <div className="item-product" css={{ fontSize: "11px !important" }}>
          {props.data?.product}
        </div>
      </Flex.Item>
      <Flex.Item css={[cssFlexItem, cssNoBorderRight]}>
        <div className="item-product" css={{ fontSize: "11px !important" }}>
          {props.data?.visit_source}
        </div>
      </Flex.Item>

      <Flex.Item css={[cssFlexItem, cssNoBorderRight]}>
        <div className="item-product" css={{ fontSize: "11px !important" }}>
          {props.data.created_at === "Lúc"
            ? "Lúc"
            : getTime(props.data?.created_at)}
        </div>
      </Flex.Item>
    </Flex>
  );
}

DLatestApplicationItem.propTypes = {
  data: PropTypes.object,
};

function MLatestApplicationItem(props) {
  return (
    <div css={styleListApplicationItem} className={"loan-application-item"}>
      <Flex css={{ clear: "both" }} align={"start"}>
        <Flex.Item>
          <div className="item-name">{props.data?.name}</div>
          <div className="item-phone">{props.data?.phone}</div>
          <div className="item-address">{props.data?.address}</div>
        </Flex.Item>
        <Flex.Item>
          <div className="item-money">{props.data?.money}</div>
          <div className="item-product">{props.data?.product}</div>
        </Flex.Item>
      </Flex>

      <br />
      <div css={{ clear: "both" }}>
        {" "}
        <div className="item-address">
          Lúc: {getTime(props.data?.created_at)}
        </div>
        <div className="item-address">Source: {props.data?.visit_source}</div>
      </div>
    </div>
  );
}

MLatestApplicationItem.propTypes = {
  data: PropTypes.object,
};

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
        <div
          className={"bulma-container latest-loan-applications"}
          css={{ height: "auto !important" }}
        >
          <WingBlank size="lg">
            <div css={styleLatestApplicationsDesktop}>
              <DRow>
                <DCol span={24} css={{ borderRight: "1px solid #F0F0F0" }}>
                  <WingBlank size="lg">
                    <div css={{ textAlign: "center" }}>
                      <div
                        css={{
                          color: "#404040",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        DANH SÁCH ĐƠN XIN VAY MỚI NHẤT
                      </div>
                      <WhiteSpace size="md" />
                    </div>

                    <ul>
                      <li>
                        <DLatestApplicationItem
                          data={{
                            class: "head",
                            name: "Khách hàng",
                            phone: "Số điện thoại",
                            address: "Tỉnh/ Thành phố",
                            money: "Nhu cầu vay",
                            product: "Sản phẩm",
                            visit_source: "Nguồn",
                            created_at: "Lúc",
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
                                      name: value?.form_full_name,
                                      // name: toCapitalLetter(
                                      //   value.form_full_name
                                      // ),
                                      phone: value?.form_mobile_phone,
                                      address: value?.address,
                                      money: moneyFormat(value.loan_money) + " VNĐ",
                                      product: config.products[value?.form_product]?.name,

                                      visit_source: value?.visit_source
                                        ? value.visit_source
                                        : "mf24h.com",
                                      created_at: value?.created_at,
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
    <div
      className={"latest-loan-applications block-grey"}
      css={{ height: "auto !important" }}
    >
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
                DANH SÁCH ĐƠN XIN VAY MỚI NHẤT
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
                        name: value?.form_full_name,
                        phone: value?.form_mobile_phone,
                        address: value?.address,
                        money: moneyFormat(value.loan_money) + " VNĐ",
                        product: config?.products[value.form_product]?.name,
                        created_at: value?.created_at,
                        visit_source: value?.visit_source
                          ? value.visit_source
                          : "mf24h.com",
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </WingBlank>
        </div>
      </WingBlank>
    </div>
  );
}

MLatestApplications.propTypes = {
  parentState: PropTypes.object,
};

export default LatestApplications;
