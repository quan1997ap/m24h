/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React, { Component } from "react";
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

export function DGetLoanSteps(props) {
  let styleCover = {
    width: "74px",
    paddingRight: "20px",
    textAlign: "center",
    float: "left",
  };

  let styleTitle = {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#343434",
  };

  let styleSub = {
    fontSize: "13px",
    color: "#343434",
  };

  return (
    <React.Fragment>
      <div className={"bulma-container"} css={{ clear: "both" }}>
        <WhiteSpace size="lg" />
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "26px",
              color: config.color.txt_primary,
            }}
          >
            4 b?????c ????? nh???n kho???n vay
          </h2>
        </div>

        <div className={"get-loan-steps"}>
          <WingBlank size="lg">
            <WingBlank size="lg">
              <Flex css={{ overflow: "visible" }} align={"start"}>
                <Flex.Item className={"product-item"}>
                  <div className={"circle-126"}>
                    <img src={svgLoanStepWebsite} alt={"????ng k?? vay"} />
                  </div>{" "}
                  <WhiteSpace size="lg" />
                  <div css={styleTitle}>1. ????ng k?? vay</div>
                  <div css={styleSub}>
                    Ho??n t???t ??i???n th??ng tin
                    <br /> trong 5 ph??t
                  </div>
                  <WhiteSpace size="lg" />
                </Flex.Item>

                <Flex.Item className={"product-item"}>
                  <div className={"circle-126"}>
                    <img src={svgLoanStepUsers} alt={"K???t n???i"} />
                  </div>{" "}
                  <WhiteSpace size="lg" />
                  <div css={styleTitle}>2. K???t n???i</div>
                  <div css={styleSub}>
                    Ngay l???p t???c ng?????i cho vay s??? nh???n
                    <br /> ???????c ????n xin vay c???a b???n
                  </div>
                  <WhiteSpace size="lg" />
                </Flex.Item>

                <Flex.Item className={"product-item"}>
                  <div className={"circle-126"}>
                    <img src={svgLoanStepBusinessman} alt={"X??t duy???t"} />
                  </div>{" "}
                  <WhiteSpace size="lg" />
                  <div css={styleTitle}>3. X??t duy???t</div>
                  <div css={styleSub}>
                    Nh???n k???t qu??? nhanh ch??ng sau khi
                    <br /> g???i h??? s??
                  </div>
                  <WhiteSpace size="lg" />
                </Flex.Item>

                <Flex.Item className={"product-item"}>
                  <div className={"circle-126"}>
                    <img src={svgLoanStepPayment} alt={"Nh???n kho???n vay"} />
                  </div>{" "}
                  <WhiteSpace size="lg" />
                  <div css={styleTitle}>4. Nh???n kho???n vay</div>
                  <div css={styleSub}>
                    Nh???n ti???n v??o t??i kho???n ho???c t???i
                    <br /> c???a h??ng Viettel Post tr??n to??n qu???c
                  </div>
                  <WhiteSpace size="lg" />
                </Flex.Item>
              </Flex>

              {/* <ul className={"list"}>
                <li>
                  <div css={styleCover}>
                    <img src={svgLoanStepWebsite} alt={"????ng k?? vay"} />
                  </div>
                  <div style={{ float: "left" }}>
                    <div css={styleTitle}>????ng k?? vay</div>
                    <div css={styleSub}>
                      Ho??n t???t ??i???n th??ng tin trong 5 ph??t
                    </div>
                  </div>
                </li>

                <li>
                  <div css={styleCover}>
                    <img src={svgLoanStepUsers} alt={"K???t n???i"} />
                  </div>
                  <div style={{ float: "left" }}>
                    <div css={styleTitle}>K???t n???i</div>
                    <div css={styleSub}>
                      Ngay l???p t???c ng?????i cho vay s??? nh???n
                      <br /> ???????c ????n xin vay c???a b???n
                    </div>
                  </div>
                </li>

                <li>
                  <div css={styleCover}>
                    <img src={svgLoanStepBusinessman} alt={"X??t duy???t"} />
                  </div>
                  <div style={{ float: "left" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#343434",
                      }}
                    >
                      X??t duy???t
                    </div>
                    <div css={styleSub}>
                      Nh???n k???t qu??? nhanh ch??ng sau khi
                      <br /> g???i h??? s??
                    </div>
                  </div>
                </li>

                <li>
                  <div css={styleCover}>
                    <img src={svgLoanStepPayment} alt={"Nh???n kho???n vay"} />
                  </div>
                  <div style={{ float: "left" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#343434",
                      }}
                    >
                      Nh???n kho???n vay
                    </div>
                    <div css={styleSub}>
                      Nh???n ti???n v??o t??i kho???n ho???c t???i
                      <br /> c???a h??ng Viettel Post tr??n to??n qu???c
                    </div>
                  </div>
                </li>
              </ul> */}
            </WingBlank>
          </WingBlank>
        </div>
        <WhiteSpace size="lg" />
      </div>
    </React.Fragment>
  );
}

export function MGetLoanSteps(props) {
  let styleCover = {
    width: "74px",
    paddingRight: "20px",
    textAlign: "center",
    float: "left",
  };

  let styleTitle = {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#343434",
  };

  let styleSub = {
    fontSize: "13px",
    color: "#343434",
  };

  return (
    <React.Fragment>
      <WhiteSpace size="lg" />
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            color: config.color.txt_primary,
          }}
        >
          4 b?????c ????? nh???n kho???n vay
        </h2>
      </div>

      <div className={"get-loan-steps"}>
        <WingBlank size="lg">
          <WingBlank size="lg">
            <ul className={"list"}>
              <li>
                <div css={styleCover}>
                  <img src={svgLoanStepWebsite} alt={"????ng k?? vay"} />
                </div>
                <div style={{ float: "left" }}>
                  <div css={styleTitle}>????ng k?? vay</div>
                  <div css={styleSub}>Ho??n t???t ??i???n th??ng tin trong 5 ph??t</div>
                </div>
              </li>

              <li>
                <div css={styleCover}>
                  <img src={svgLoanStepUsers} alt={"K???t n???i"} />
                </div>
                <div style={{ float: "left" }}>
                  <div css={styleTitle}>K???t n???i</div>
                  <div css={styleSub}>
                    Ngay l???p t???c ng?????i cho vay s??? nh???n
                    <br /> ???????c ????n xin vay c???a b???n
                  </div>
                </div>
              </li>

              <li>
                <div css={styleCover}>
                  <img src={svgLoanStepBusinessman} alt={"X??t duy???t"} />
                </div>
                <div style={{ float: "left" }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#343434",
                    }}
                  >
                    X??t duy???t
                  </div>
                  <div css={styleSub}>
                    Nh???n k???t qu??? nhanh ch??ng sau khi
                    <br /> g???i h??? s??
                  </div>
                </div>
              </li>

              <li>
                <div css={styleCover}>
                  <img src={svgLoanStepPayment} alt={"Nh???n kho???n vay"} />
                </div>
                <div style={{ float: "left" }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#343434",
                    }}
                  >
                    Nh???n kho???n vay
                  </div>
                  <div css={styleSub}>
                    Nh???n ti???n v??o t??i kho???n ho???c t???i
                    <br /> c???a h??ng Viettel Post tr??n to??n qu???c
                  </div>
                </div>
              </li>
            </ul>
          </WingBlank>
        </WingBlank>
      </div>
      <WhiteSpace size="lg" />
    </React.Fragment>
  );
}

MwhyBlockItem.propTypes = {
  children: PropTypes.node,
};

export function MwhyBlockItem(props) {
  let styleCover = {
    width: "74px",
    paddingTop: "8px",
    paddingLeft: "20px",
    paddingRight: "8px",
    textAlign: "center",
    float: "left",
  };

  let styleTitle = {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#343434",
  };

  return (
    <React.Fragment>
      <div css={styleCover}>
        <img src={svgCheckIcon} alt={"V?????t tr??i"} />
      </div>
      <div style={{ float: "left" }}>
        <div css={styleTitle}>{props.children}</div>
      </div>
    </React.Fragment>
  );
}

SideWhyBlockItem.propTypes = {
  children: PropTypes.node,
};

export function SideWhyBlockItem(props) {
  let styleCover = {
    width: "74px",
    paddingTop: "8px",
    // paddingLeft: "10px",
    paddingRight: "8px",
    textAlign: "center",
    float: "left",
  };

  let styleTitle = {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#343434",
  };

  return (
    <React.Fragment>
      <div css={styleCover}>
        <img src={svgCheckIcon} alt={"V?????t tr??i"} />
      </div>
      <div style={{ float: "left" }}>
        <div css={styleTitle}>{props.children}</div>
      </div>
    </React.Fragment>
  );
}

export function DWhyBlock(props) {
  return (
    <div className={" block-grey"}>
      <div className={"bulma-container why-block"}>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "26px",
              color: "#333",
            }}
          >
            V?? sao n??n ch???n MF24h ?
          </h2>
        </div>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <div css={{ width: "900px", margin: "auto", display: "table" }}>
            <div className={"banner-image"} css={{ float: "left" }}></div>
            <div css={{ float: "left" }}>
              <ul className={"list"}>
                <li>
                  <MwhyBlockItem>
                    <div style={{ lineHeight: "42px" }}>
                      ????ng k?? vay online ????n gi???n
                    </div>
                  </MwhyBlockItem>
                </li>
                <li>
                  <MwhyBlockItem>
                    {" "}
                    <div style={{ lineHeight: "42px" }}>
                      Duy???t th??ng tin ????ng k?? nhanh qua ??i???n tho???i
                    </div>
                  </MwhyBlockItem>
                </li>{" "}
                <li>
                  <MwhyBlockItem>
                    <div style={{ lineHeight: "42px" }}>
                      K?? h???p ?????ng t???i ?????a ??i???m kh??ch h??ng ch??? ?????nh
                    </div>
                  </MwhyBlockItem>
                </li>{" "}
                <li>
                  <MwhyBlockItem>
                    {" "}
                    <div style={{ lineHeight: "42px" }}>
                      Gi???i ng??n trong ng??y
                    </div>
                  </MwhyBlockItem>
                </li>{" "}
                <li>
                  <MwhyBlockItem>
                    {" "}
                    <div style={{ lineHeight: "42px" }}>
                      B???o m???t kho???n vay tuy???t ?????i
                    </div>
                  </MwhyBlockItem>
                </li>{" "}
                <li>
                  <MwhyBlockItem>
                    {" "}
                    <div style={{ lineHeight: "42px" }}>Kh??ng gi??? t??i s???n</div>
                  </MwhyBlockItem>
                </li>{" "}
              </ul>
            </div>
          </div>
        </WingBlank>
      </div>{" "}
    </div>
  );
}

export function MWhyBlock(props) {
  return (
    <div className={"why-block block-grey"}>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            color: "#333",
          }}
        >
          V?? sao n??n ch???n MF24h ?
        </h2>
      </div>
      <WhiteSpace size="lg" />
      <WingBlank size="lg">
        <div className={"banner-image"}></div>
        <WhiteSpace size="lg" />
        <ul className={"list"}>
          <li>
            <MwhyBlockItem>
              <div style={{ lineHeight: "42px" }}>
                ????ng k?? vay online ????n gi???n
              </div>
            </MwhyBlockItem>
          </li>
          <li>
            <MwhyBlockItem>
              Duy???t th??ng tin ????ng k?? nhanh
              <br />
              qua ??i???n tho???i
            </MwhyBlockItem>
          </li>{" "}
          <li>
            <MwhyBlockItem>
              K?? h???p ?????ng t???i ?????a ??i???m
              <br />
              kh??ch h??ng ch??? ?????nh
            </MwhyBlockItem>
          </li>{" "}
          <li>
            <MwhyBlockItem>
              {" "}
              <div style={{ lineHeight: "42px" }}>Gi???i ng??n trong ng??y</div>
            </MwhyBlockItem>
          </li>{" "}
          <li>
            <MwhyBlockItem>
              {" "}
              <div style={{ lineHeight: "42px" }}>
                B???o m???t kho???n vay tuy???t ?????i
              </div>
            </MwhyBlockItem>
          </li>{" "}
          <li>
            <MwhyBlockItem>
              {" "}
              <div style={{ lineHeight: "42px" }}>Kh??ng gi??? t??i s???n</div>
            </MwhyBlockItem>
          </li>{" "}
        </ul>
      </WingBlank>
    </div>
  );
}
