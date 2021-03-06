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
  encjson as lasimson,
  enc as lasim,
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
import BaseProduct from "controllers/products/Base";
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

class MobilePhonePawn extends BaseProduct {
  constructor(props) {
    super(props);

    this.state = {
      visit_source: lgd("visit_source", "mf24h"),
      form_product: "mobile_phone_pawn",
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

  showDesktop = () => {
    return (
      <React.Fragment>
        <DTopBar />
        <DLoanForm
          parentState={this.state}
          handleFormInputChange={this.handleFormInputChange}
          handleFormSubmit={this.handleFormSubmit}
          createLoanMoneyOptions={this.createLoanMoneyOptions}
          createLoanPeriodOptions={this.createLoanPeriodOptions}
          createCityProvinceOptions={this.createCityProvinceOptions}
          createDistrictOptions={this.createDistrictOptions}
        />
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
        <MLoanForm
          parentState={this.state}
          handleFormInputChange={this.handleFormInputChange}
          handleFormSubmit={this.handleFormSubmit}
          createLoanMoneyOptions={this.createLoanMoneyOptions}
          createLoanPeriodOptions={this.createLoanPeriodOptions}
          createCityProvinceOptions={this.createCityProvinceOptions}
          createDistrictOptions={this.createDistrictOptions}
        />
        <MGetLoanSteps />
        <MWhyBlock />
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
            <div className={"page-loan-product page-credit-loan"}>
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

function DLoanForm(props) {
  return (
    <div
      className={
        "block-grey desktop-loan-banner desktop-mobilephone-pawn-banner"
      }
    >
      <div
        className={"bulma-container signin-form desktop-loan-form "}
        css={{ display: "table", width: "100%" }}
      >
        <div
          className={"desktop-login-form"}
          css={{
            margin: "auto",
            border: "1px solid #D8D8D8",
            width: "556px",
            // height: "459px",
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
                ????NG K?? C???M ??I???N THO???I
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
                {/* ????ng nh???p */}
              </div>
            </WingBlank>
          </div>
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
              <WingBlank
                size="lg"
                css={{ paddingTop: "12px", paddingBottom: "22px" }}
              >
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

                <div css={{ color: "#939393", fontSize: "14px" }}>
                  MF24H t?? v???n g??i vay C???m ??i???n tho???i v???i kho???n vay ?????n 30
                  tri???u.
                  <br />
                  K??? h???n vay 90 ng??y, k??? thanh to??n 10, 15 ho???c 30 ng??y KH t??y
                  ch???n.
                  <br />
                  <strong>Chi ti???t li??n h??? {config.hotline}</strong>
                </div>
                <Flex>
                  <Flex.Item>
                    <AgreeItem
                      defaultChecked
                      data-seed="logId"
                      onChange={(e) => console.log("checkbox", e)}
                    >
                      <div css={{ fontSize: "13px", lineHeight: "24px" }}>
                        {" "}
                        T??i ?????ng ?? v???i c??c{" "}
                        <a
                          // onClick={(e) => {
                          //   e.preventDefault();
                          //   // alert("agree it");
                          // }}
                          href="/#/terms"
                          alt={"??i???u kho???n c???a MF24h"}
                          target={"_blank"}
                          css={{
                            textDecoration: "underline",
                            color: "#FD6565",
                            // fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          ??i???u kho???n c???a MF24h
                        </a>
                      </div>
                    </AgreeItem>
                  </Flex.Item>
                </Flex>

                <WhiteSpace size="lg" />
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

                <div className={"bulma-field"}>
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
                <div className={"bulma-field"}>
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

                <WhiteSpace size="lg" />

                <div css={{ textAlign: "center" }}>
                  <Button
                    className={"button-primary-color"}
                    type="primary"
                    onClick={props.handleFormSubmit}
                  >
                    ????ng k?? vay ngay
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
                    B???n ???? c?? t??i kho???n?
                    <div
                      css={{
                        textDecoration: "underline",
                        color: "#FD6565",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      H??y click ????? ????ng nh???p
                    </div>
                  </div>
                </WingBlank>
              </div>

              <div></div>
            </div>
          </WingBlank>
        </div>
      </div>{" "}
    </div>
  );
}

function MLoanForm(props) {
  return (
    <div className={"signin-form block-grey"}>
      <div className={"banner-image"}>
        <div className={"label"}>????NG K?? C???M ??I???N THO???I</div>
      </div>
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
          <WingBlank
            size="lg"
            css={{ paddingTop: "12px", paddingBottom: "22px" }}
          >
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

            <div css={{ color: "#939393", fontSize: "14px" }}>
              MF24H t?? v???n g??i vay C???m ??i???n tho???i <br />
              v???i kho???n vay ?????n 30 tri???u. <br />
              K??? h???n vay 90 ng??y, <br />
              k??? thanh to??n 10, 15 ho???c 30 ng??y KH t??y ch???n.
              <br />
              <strong>Chi ti???t li??n h??? {config.hotline}</strong>
            </div>
            <Flex>
              <Flex.Item>
                <AgreeItem
                  defaultChecked
                  data-seed="logId"
                  onChange={(e) => console.log("checkbox", e)}
                >
                  <div css={{ fontSize: "13px", lineHeight: "24px" }}>
                    {" "}
                    T??i ?????ng ?? v???i c??c{" "}
                    <a
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   // alert("agree it");
                      // }}
                      href="/#/terms"
                      alt={"??i???u kho???n c???a MF24h"}
                      target={"_blank"}
                      css={{
                        textDecoration: "underline",
                        color: "#FD6565",
                        // fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      ??i???u kho???n c???a MF24h
                    </a>
                  </div>
                </AgreeItem>
              </Flex.Item>
            </Flex>

            <WhiteSpace size="lg" />
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

            <div className={"bulma-field"}>
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
            <div className={"bulma-field"}>
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

            <WhiteSpace size="lg" />

            <div css={{ textAlign: "center" }}>
              <Button
                className={"button-primary-color"}
                type="primary"
                onClick={props.handleFormSubmit}
              >
                ????ng k?? vay ngay
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
                B???n ???? c?? t??i kho???n?
                <div
                  css={{
                    textDecoration: "underline",
                    color: "#FD6565",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  H??y click ????? ????ng nh???p
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

  createProductOptions: PropTypes.func,
  createLoanMoneyOptions: PropTypes.func,
  createLoanPeriodOptions: PropTypes.func,
  createCityProvinceOptions: PropTypes.func,
  createDistrictOptions: PropTypes.func,
};

DLoanForm.propTypes = QuickApplyLoanPropTypes;
MLoanForm.propTypes = QuickApplyLoanPropTypes;

export default MobilePhonePawn;
