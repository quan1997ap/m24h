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
            4 bước để nhận khoản vay
          </h2>
        </div>

        <div className={"get-loan-steps"}>
          <WingBlank size="lg">
            <WingBlank size="lg">
              <Flex css={{ overflow: "visible" }} align={"start"}>
                <Flex.Item className={"product-item"}>
                  <div className={"circle-126"}>
                    <img src={svgLoanStepWebsite} alt={"Đăng ký vay"} />
                  </div>{" "}
                  <WhiteSpace size="lg" />
                  <div css={styleTitle}>1. Đăng ký vay</div>
                  <div css={styleSub}>
                    Hoàn tất điền thông tin
                    <br /> trong 5 phút
                  </div>
                  <WhiteSpace size="lg" />
                </Flex.Item>

                <Flex.Item className={"product-item"}>
                  <div className={"circle-126"}>
                    <img src={svgLoanStepUsers} alt={"Kết nối"} />
                  </div>{" "}
                  <WhiteSpace size="lg" />
                  <div css={styleTitle}>2. Kết nối</div>
                  <div css={styleSub}>
                    Ngay lập tức người cho vay sẽ nhận
                    <br /> được đơn xin vay của bạn
                  </div>
                  <WhiteSpace size="lg" />
                </Flex.Item>

                <Flex.Item className={"product-item"}>
                  <div className={"circle-126"}>
                    <img src={svgLoanStepBusinessman} alt={"Xét duyệt"} />
                  </div>{" "}
                  <WhiteSpace size="lg" />
                  <div css={styleTitle}>3. Xét duyệt</div>
                  <div css={styleSub}>
                    Nhận kết quả nhanh chóng sau khi
                    <br /> gửi hồ sơ
                  </div>
                  <WhiteSpace size="lg" />
                </Flex.Item>

                <Flex.Item className={"product-item"}>
                  <div className={"circle-126"}>
                    <img src={svgLoanStepPayment} alt={"Nhận khoản vay"} />
                  </div>{" "}
                  <WhiteSpace size="lg" />
                  <div css={styleTitle}>4. Nhận khoản vay</div>
                  <div css={styleSub}>
                    Nhận tiền vào tài khoản hoặc tại
                    <br /> cửa hàng Viettel Post trên toàn quốc
                  </div>
                  <WhiteSpace size="lg" />
                </Flex.Item>
              </Flex>

              {/* <ul className={"list"}>
                <li>
                  <div css={styleCover}>
                    <img src={svgLoanStepWebsite} alt={"Đăng ký vay"} />
                  </div>
                  <div style={{ float: "left" }}>
                    <div css={styleTitle}>Đăng ký vay</div>
                    <div css={styleSub}>
                      Hoàn tất điền thông tin trong 5 phút
                    </div>
                  </div>
                </li>

                <li>
                  <div css={styleCover}>
                    <img src={svgLoanStepUsers} alt={"Kết nối"} />
                  </div>
                  <div style={{ float: "left" }}>
                    <div css={styleTitle}>Kết nối</div>
                    <div css={styleSub}>
                      Ngay lập tức người cho vay sẽ nhận
                      <br /> được đơn xin vay của bạn
                    </div>
                  </div>
                </li>

                <li>
                  <div css={styleCover}>
                    <img src={svgLoanStepBusinessman} alt={"Xét duyệt"} />
                  </div>
                  <div style={{ float: "left" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#343434",
                      }}
                    >
                      Xét duyệt
                    </div>
                    <div css={styleSub}>
                      Nhận kết quả nhanh chóng sau khi
                      <br /> gửi hồ sơ
                    </div>
                  </div>
                </li>

                <li>
                  <div css={styleCover}>
                    <img src={svgLoanStepPayment} alt={"Nhận khoản vay"} />
                  </div>
                  <div style={{ float: "left" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#343434",
                      }}
                    >
                      Nhận khoản vay
                    </div>
                    <div css={styleSub}>
                      Nhận tiền vào tài khoản hoặc tại
                      <br /> cửa hàng Viettel Post trên toàn quốc
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
          4 bước để nhận khoản vay
        </h2>
      </div>

      <div className={"get-loan-steps"}>
        <WingBlank size="lg">
          <WingBlank size="lg">
            <ul className={"list"}>
              <li>
                <div css={styleCover}>
                  <img src={svgLoanStepWebsite} alt={"Đăng ký vay"} />
                </div>
                <div style={{ float: "left" }}>
                  <div css={styleTitle}>Đăng ký vay</div>
                  <div css={styleSub}>Hoàn tất điền thông tin trong 5 phút</div>
                </div>
              </li>

              <li>
                <div css={styleCover}>
                  <img src={svgLoanStepUsers} alt={"Kết nối"} />
                </div>
                <div style={{ float: "left" }}>
                  <div css={styleTitle}>Kết nối</div>
                  <div css={styleSub}>
                    Ngay lập tức người cho vay sẽ nhận
                    <br /> được đơn xin vay của bạn
                  </div>
                </div>
              </li>

              <li>
                <div css={styleCover}>
                  <img src={svgLoanStepBusinessman} alt={"Xét duyệt"} />
                </div>
                <div style={{ float: "left" }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#343434",
                    }}
                  >
                    Xét duyệt
                  </div>
                  <div css={styleSub}>
                    Nhận kết quả nhanh chóng sau khi
                    <br /> gửi hồ sơ
                  </div>
                </div>
              </li>

              <li>
                <div css={styleCover}>
                  <img src={svgLoanStepPayment} alt={"Nhận khoản vay"} />
                </div>
                <div style={{ float: "left" }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#343434",
                    }}
                  >
                    Nhận khoản vay
                  </div>
                  <div css={styleSub}>
                    Nhận tiền vào tài khoản hoặc tại
                    <br /> cửa hàng Viettel Post trên toàn quốc
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
        <img src={svgCheckIcon} alt={"Vượt trôi"} />
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
        <img src={svgCheckIcon} alt={"Vượt trôi"} />
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
            Vì sao nên chọn MF24h ?
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
                      Đăng ký vay online đơn giản
                    </div>
                  </MwhyBlockItem>
                </li>
                <li>
                  <MwhyBlockItem>
                    {" "}
                    <div style={{ lineHeight: "42px" }}>
                      Duyệt thông tin đăng ký nhanh qua điện thoại
                    </div>
                  </MwhyBlockItem>
                </li>{" "}
                <li>
                  <MwhyBlockItem>
                    <div style={{ lineHeight: "42px" }}>
                      Ký hợp đồng tại địa điểm khách hàng chỉ định
                    </div>
                  </MwhyBlockItem>
                </li>{" "}
                <li>
                  <MwhyBlockItem>
                    {" "}
                    <div style={{ lineHeight: "42px" }}>
                      Giải ngân trong ngày
                    </div>
                  </MwhyBlockItem>
                </li>{" "}
                <li>
                  <MwhyBlockItem>
                    {" "}
                    <div style={{ lineHeight: "42px" }}>
                      Bảo mật khoản vay tuyệt đối
                    </div>
                  </MwhyBlockItem>
                </li>{" "}
                <li>
                  <MwhyBlockItem>
                    {" "}
                    <div style={{ lineHeight: "42px" }}>Không giữ tài sản</div>
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
          Vì sao nên chọn MF24h ?
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
                Đăng ký vay online đơn giản
              </div>
            </MwhyBlockItem>
          </li>
          <li>
            <MwhyBlockItem>
              Duyệt thông tin đăng ký nhanh
              <br />
              qua điện thoại
            </MwhyBlockItem>
          </li>{" "}
          <li>
            <MwhyBlockItem>
              Ký hợp đồng tại địa điểm
              <br />
              khách hàng chỉ định
            </MwhyBlockItem>
          </li>{" "}
          <li>
            <MwhyBlockItem>
              {" "}
              <div style={{ lineHeight: "42px" }}>Giải ngân trong ngày</div>
            </MwhyBlockItem>
          </li>{" "}
          <li>
            <MwhyBlockItem>
              {" "}
              <div style={{ lineHeight: "42px" }}>
                Bảo mật khoản vay tuyệt đối
              </div>
            </MwhyBlockItem>
          </li>{" "}
          <li>
            <MwhyBlockItem>
              {" "}
              <div style={{ lineHeight: "42px" }}>Không giữ tài sản</div>
            </MwhyBlockItem>
          </li>{" "}
        </ul>
      </WingBlank>
    </div>
  );
}
