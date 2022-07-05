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
import { Radio as DRadio } from "antd";
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

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city_provinces: config.city_provinces.data,
      form_city_provinces: lgd("form_city_provinces", "not-selected"),
      form_city_districts: lgd("form_city_districts", "not-selected"),

      form_full_name: "",
      form_mobile_phone: "",
      form_password: "",
      form_account_type: "",
      form_lender_signup_code: "",
    };
  }

  componentDidUpdate(prevProps) {
    // window.scrollTo(0, 0);
  }

  UNSAFE_componentWillMount() {
    if (this.state.form_city_provinces !== "not-selected") {
      this.loadDistrictByCityProvince();
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleFormSubmit = () => {
    let $this = this;
    let formData = {
      brave: true,
      form_password: "",
      form_account_type: "",
      form_lender_signup_code: "",

      form_full_name: this.state.form_full_name,
      form_mobile_phone: this.state.form_mobile_phone,
      form_city_provinces: this.state.form_city_provinces,
      form_city_districts: this.state.form_city_districts,
    };
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
        <DSignInForm
          parentState={this.state}
          handleFormInputChange={this.handleFormInputChange}
          handleFormSubmit={this.handleFormSubmit}
          createCityProvinceOptions={this.createCityProvinceOptions}
          createDistrictOptions={this.createDistrictOptions}
        />
        <DFooter />
      </React.Fragment>
    );
  };

  showTablet = () => {};

  showMobile = () => {
    return (
      <React.Fragment>
        <MTopBar />
        <MSignInForm
          parentState={this.state}
          handleFormInputChange={this.handleFormInputChange}
          handleFormSubmit={this.handleFormSubmit}
          createCityProvinceOptions={this.createCityProvinceOptions}
          createDistrictOptions={this.createDistrictOptions}
        />
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
          <div className={"mf24 "}>
            <div className={" page-signup"}>
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
              height: "718px",
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
                  ĐĂNG KÝ TÀI KHOẢN
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
                  Đăng nhập
                </div>
              </WingBlank>
            </div>
            <WingBlank
              size="lg"
              css={{ paddingTop: "22px", paddingBottom: "22px" }}
            >
              <div css={{ textAlign: "center" }}>
                Hãy đăng ký ngay bây giờ
                <br />
                để tham gia sàn tài chính MF24h.
              </div>
              <WhiteSpace size="lg" />
              <div className={"bulma-field"}>
                <div className={"bulma-control"}>
                  <input
                    className={"bulma-input"}
                    type="text"
                    placeholder="Mời nhập họ và tên"
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
                    placeholder="Mời nhập số điện thoại"
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
                    placeholder="Mời nhập mật khẩu"
                    id="formFullName"
                    name="['full_name']"
                    // value={this.state.userProfileData.full_name}
                    // onChange={this.handleProfileDataChange}
                  />
                </div>
              </div>
              <div className={"bulma-field"}>
                <div className={"bulma-control"}>
                  <div className={"bulma-select bulma-is-fullwidth"}>
                    <select
                      id="formCityProvince"
                      name="['city_provinces']"
                      // value={this.state.userProfileData.city_provinces}
                      // onChange={this.handleProfileDataChange}
                    >
                      <option value="not-selected">
                        Mời chọn tỉnh/ thành phố
                      </option>
                      {/* {this.createCityProvinceOptions()} */}
                    </select>
                  </div>
                </div>
              </div>
              <div className={"bulma-field"}>
                <div className={"bulma-control"}>
                  <div
                    className={
                      "bulma-select bulma-select-disabled bulma-is-fullwidth"
                    }
                  >
                    <select
                      disabled
                      id="formCityProvince"
                      name="['city_provinces']"
                      // value={this.state.userProfileData.city_provinces}
                      // onChange={this.handleProfileDataChange}
                    >
                      <option value="not-selected">Mời chọn quận/ huyện</option>
                      {/* {this.createCityProvinceOptions()} */}
                    </select>
                  </div>
                </div>
              </div>
              {/* <div
              css={{
                display: "table",
                width: "100%",
                paddingBottom: "8px"
              }}
            >
              {" "}
              <div
                css={{
                  float: "left",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#707070"
                }}
              >
                Nhớ tài khoản
              </div>
              <div
                css={{
                  float: "right",
                  textDecoration: "underline",
                  color: "#FD6565",
                  fontSize: "12px",
                  fontWeight: "500"
                }}
              >
                Quên mật khẩu
              </div>
            </div> */}
              <WhiteSpace size="lg" />
              {/* <Radio.Group onChange={this.onChange} value={this.state.value}> */}

              <div css={{ paddingLeft: "15px" }}>
                <div css={{ fontSize: "12px", paddingBottom: "8px" }}>
                  Bạn đang có nhu cầu:
                </div>

                <DRadio.Group>
                  <DRadio value={1}>Tôi muốn vay</DRadio>
                  <DRadio value={2}>Tôi muốn cho vay</DRadio>
                </DRadio.Group>
              </div>

              {/* <List renderHeader={() => "Bạn đang có nhu cầu:"}>
                {[
                  { value: 0, label: "Tôi muốn vay" },
                  { value: 1, label: "Tôi muốn cho vay" },
                ].map((i) => (
                  <RadioItem
                    key={i.value}
                    // checked={value === i.value}
                    // onChange={() => this.onChange(i.value)}
                  >
                    <div css={{ fontSize: "14px" }}>{i.label}</div>
                  </RadioItem>
                ))}
              </List> */}
              <WhiteSpace size="lg" />
              <Flex>
                <Flex.Item>
                  <AgreeItem
                    defaultChecked
                    data-seed="logId"
                    onChange={(e) => console.log("checkbox", e)}
                  >
                    <div css={{ fontSize: "13px", lineHeight: "24px" }}>
                      {" "}
                      Tôi đồng ý với các{" "}
                      <a
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   // alert("agree it");
                        // }}
                        href="/#/terms"
                        alt={"Điều khoản của MF24h"}
                        target={"_blank"}
                        css={{
                          textDecoration: "underline",
                          color: "#FD6565",
                          // fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        Điều khoản của MF24h
                      </a>
                    </div>
                  </AgreeItem>
                </Flex.Item>
              </Flex>
              <WhiteSpace size="lg" />
              <div css={{ textAlign: "center" }}>
                <Button
                  className={"button-primary-color"}
                  type="primary"
                  onClick={() => {}}
                >
                  Đăng ký ngay
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
                  Bạn đã có tài khoản?
                  <div
                    css={{
                      textDecoration: "underline",
                      color: "#FD6565",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Hãy click để đăng nhập
                  </div>
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
            minHeight: "608px",
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
                ĐĂNG KÝ TÀI KHOẢN
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
                Đăng nhập
              </div>
            </WingBlank>
          </div>
          <WingBlank
            size="lg"
            css={{ paddingTop: "22px", paddingBottom: "22px" }}
          >
            <div css={{ textAlign: "center" }}>
              Hãy đăng ký ngay bây giờ
              <br />
              để tham gia sàn tài chính MF24h.
            </div>

            <WhiteSpace size="lg" />
            <div className={"bulma-field"}>
              <div className={"bulma-control"}>
                <input
                  className={"bulma-input"}
                  type="text"
                  placeholder="Mời nhập họ và tên"
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
                  placeholder="Mời nhập số điện thoại"
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
                  placeholder="Mời nhập mật khẩu"
                  id="formFullName"
                  name="['full_name']"
                  // value={this.state.userProfileData.full_name}
                  // onChange={this.handleProfileDataChange}
                />
              </div>
            </div>

            <div className={"bulma-field"}>
              <div className={"bulma-control"}>
                <div className={"bulma-select bulma-is-fullwidth"}>
                  <select
                    id="formCityProvince"
                    name="['city_provinces']"
                    // value={this.state.userProfileData.city_provinces}
                    // onChange={this.handleProfileDataChange}
                  >
                    <option value="not-selected">
                      Mời chọn tỉnh/ thành phố
                    </option>
                    {/* {this.createCityProvinceOptions()} */}
                  </select>
                </div>
              </div>
            </div>

            <div className={"bulma-field"}>
              <div className={"bulma-control"}>
                <div
                  className={
                    "bulma-select bulma-select-disabled bulma-is-fullwidth"
                  }
                >
                  <select
                    disabled
                    id="formCityProvince"
                    name="['city_provinces']"
                    // value={this.state.userProfileData.city_provinces}
                    // onChange={this.handleProfileDataChange}
                  >
                    <option value="not-selected">Mời chọn quận/ huyện</option>
                    {/* {this.createCityProvinceOptions()} */}
                  </select>
                </div>
              </div>
            </div>

            {/* <div
              css={{
                display: "table",
                width: "100%",
                paddingBottom: "8px"
              }}
            >
              {" "}
              <div
                css={{
                  float: "left",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#707070"
                }}
              >
                Nhớ tài khoản
              </div>
              <div
                css={{
                  float: "right",
                  textDecoration: "underline",
                  color: "#FD6565",
                  fontSize: "12px",
                  fontWeight: "500"
                }}
              >
                Quên mật khẩu
              </div>
            </div> */}

            <List renderHeader={() => "Bạn đang có nhu cầu:"}>
              {[
                { value: 0, label: "Tôi muốn vay" },
                { value: 1, label: "Tôi muốn cho vay" },
              ].map((i) => (
                <RadioItem
                  key={i.value}
                  // checked={value === i.value}
                  // onChange={() => this.onChange(i.value)}
                >
                  <div css={{ fontSize: "14px" }}>{i.label}</div>
                </RadioItem>
              ))}
            </List>

            <WhiteSpace size="lg" />

            <Flex>
              <Flex.Item>
                <AgreeItem
                  defaultChecked
                  data-seed="logId"
                  onChange={(e) => console.log("checkbox", e)}
                >
                  <div css={{ fontSize: "13px", lineHeight: "24px" }}>
                    {" "}
                    Tôi đồng ý với các{" "}
                    <a
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   // alert("agree it");
                      // }}
                      href="/#/terms"
                      alt={"Điều khoản của MF24h"}
                      target={"_blank"}
                      css={{
                        textDecoration: "underline",
                        color: "#FD6565",
                        // fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Điều khoản của MF24h
                    </a>
                  </div>
                </AgreeItem>
              </Flex.Item>
            </Flex>

            <WhiteSpace size="lg" />

            <div css={{ textAlign: "center" }}>
              <Button
                className={"button-primary-color"}
                type="primary"
                onClick={() => {}}
              >
                Đăng ký ngay
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
                Bạn đã có tài khoản?
                <div
                  css={{
                    textDecoration: "underline",
                    color: "#FD6565",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Hãy click để đăng nhập
                </div>
              </div>
            </WingBlank>
          </div>

          <div></div>
        </div>
      </WingBlank>
    </div>
  );
}

let QuickApplyLoanPropTypes = {
  parentState: PropTypes.object,
  handleFormInputChange: PropTypes.func,
  handleFormSubmit: PropTypes.func,

  createCityProvinceOptions: PropTypes.func,
  createDistrictOptions: PropTypes.func,
};

DSignInForm.propTypes = QuickApplyLoanPropTypes;
MSignInForm.propTypes = QuickApplyLoanPropTypes;

export default Signup;
