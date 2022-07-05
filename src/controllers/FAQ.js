/* eslint-disable jsx-a11y/anchor-has-content */
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

class FAQ extends Component {
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
        <DPageContent />
        <DFooter />
      </React.Fragment>
    );
  };

  showTablet = () => {};

  showMobile = () => {
    return (
      <React.Fragment>
        <MTopBar />
        <MPageContent />
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
            <div className={"page-faq"}>
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

function DPageContent(props) {
  return (
    <div className={"signin-form block-grey"}>
      <div className={"bulma-container"}>
        <div className={"banner-image"} />
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <div
            css={{
              background: "#fff",
              // minHeight: "438px",
              borderRadius: "5px",
              paddingTop: "10px",
              paddingBottom: "18px",
            }}
          >
            <div
              css={{
                borderBottom: "1px solid #E8E8E8",
                // display: "table",
                // width: "100%",
                textAlign: "center",
                paddingBottom: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#707070",
              }}
            >
              1.SẢN PHẨM/ DỊCH VỤ
            </div>
            <Accordion
              accordion
              openAnimation={{}}
              className="my-accordion"
              onChange={() => {}}
            >
              <Accordion.Panel
                header="Tài sản nào được chấp nhận cầm cố?"
                className="pad"
              >
                Tại MF24H chúng tôi chấp nhận cầm cố các loại tài sản sau: Ô tô,
                Đăng ký/Cà vẹt Ô tô, Xe máy, Đăng ký/ Cà vẹt xe máy, Điện thoại,
                Laptop, Đồng hồ, Máy ảnh, Đồ trang sức, Sim số đẹp... Với những
                tài sản đặc biệt, vui lòng liên hệ Hotline {config.hotline}.
              </Accordion.Panel>

              <Accordion.Panel
                header="Thông tin của tôi có được bảo mật không ?"
                className="pad"
              >
                Chúng tôi cam kết 100% bảo mật thông tin của khách hàng khi thực
                hiện vay tại MF24H
              </Accordion.Panel>

              <Accordion.Panel
                header="Tôi muốn được tư vấn trực tiếp thì liên hệ thế nào ?"
                className="pad"
              >
                Mời bạn vui lòng liên hệ{" "}
                <strong>hotline {config.hotline}</strong> hoặc chat trên{" "}
                <strong>
                  <a href={"https://bit.ly/mf24hfb"}> Facebook Page</a>
                </strong>{" "}
                của MF24H
              </Accordion.Panel>

              <Accordion.Panel
                header="Lãi suất vay tại MF24H là bao nhiêu?"
                className="pad"
              >
                - Phí thẩm định điều kiện cho vay.
                <br />
                - Phí quản lý tài sản cầm cố.
                <br />- Phí lưu trữ kho bãi (nếu có). <br />
                <br />
                (Chi phí vay trên chưa bao gồm các Khoản phạt vi phạm nghĩa vụ
                Hợp đồng. Các khoản phạt vi phạm nghĩa vụ sẽ áp dụng khi một
                trong các bên vi phạm nghĩa vụ tại Hợp đồng cầm cố). Tổng chi
                phí vay được MF24H cam kết không vượt quá 8.1%/tháng và phù hợp
                với quy định của pháp luật.
              </Accordion.Panel>
            </Accordion>{" "}
            <WingBlank
              size="lg"
              css={{ paddingTop: "22px", paddingBottom: "22px" }}
            ></WingBlank>
          </div>
        </WingBlank>
        <WhiteSpace size="lg" /> <WhiteSpace size="lg" />{" "}
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <div
            css={{
              background: "#fff",
              // minHeight: "438px",
              borderRadius: "5px",
              paddingTop: "10px",
              paddingBottom: "18px",
            }}
          >
            <div
              css={{
                borderBottom: "1px solid #E8E8E8",
                // display: "table",
                // width: "100%",
                textAlign: "center",
                paddingBottom: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#707070",
              }}
            >
              2. VỀ KHOẢN VAY
            </div>

            <Accordion
              accordion
              openAnimation={{}}
              className="my-accordion"
              onChange={() => {}}
            >
              <Accordion.Panel
                header="Ai có thể sử dụng dịch vụ của MF24H?"
                className="pad"
              >
                Nam nữ 18 tuổi trở lên và có giấy tờ nhân thân.
              </Accordion.Panel>
            </Accordion>
            <WingBlank
              size="lg"
              css={{ paddingTop: "22px", paddingBottom: "22px" }}
            ></WingBlank>
          </div>
        </WingBlank>
        <WhiteSpace size="lg" /> <WhiteSpace size="lg" />{" "}
        <WhiteSpace size="lg" />
      </div>{" "}
    </div>
  );
}

function MPageContent(props) {
  return (
    <div className={"signin-form block-grey"}>
      <div className={"banner-image"} />
      <WhiteSpace size="lg" />
      <WingBlank size="lg">
        <div
          css={{
            background: "#fff",
            // minHeight: "438px",
            borderRadius: "5px",
            paddingTop: "10px",
            paddingBottom: "18px",
          }}
        >
          <div
            css={{
              borderBottom: "1px solid #E8E8E8",
              // display: "table",
              // width: "100%",
              textAlign: "center",
              paddingBottom: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#707070",
            }}
          >
            1.SẢN PHẨM/ DỊCH VỤ
          </div>

          <Accordion
            accordion
            openAnimation={{}}
            className="my-accordion"
            onChange={() => {}}
          >
            <Accordion.Panel
              header="Tài sản nào được chấp nhận cầm cố?"
              className="pad"
            >
              Tại MF24H chúng tôi chấp nhận cầm cố các loại tài sản sau: Ô tô,
              Đăng ký/Cà vẹt Ô tô, Xe máy, Đăng ký/ Cà vẹt xe máy, Điện thoại,
              Laptop, Đồng hồ, Máy ảnh, Đồ trang sức, Sim số đẹp... Với những
              tài sản đặc biệt, vui lòng liên hệ Hotline {config.hotline}.
            </Accordion.Panel>

            <Accordion.Panel
              header="Thông tin của tôi có được bảo mật không ?"
              className="pad"
            >
              Chúng tôi cam kết 100% bảo mật thông tin của khách hàng khi thực
              hiện vay tại MF24H
            </Accordion.Panel>

            <Accordion.Panel
              header={
                <div>
                  Tôi muốn được tư vấn trực tiếp thì liên hệ
                  <br />
                  thế nào ?
                </div>
              }
              className="pad2"
            >
              Mời bạn vui lòng liên hệ <strong>
                hotline {config.hotline}
              </strong>{" "}
              hoặc chat trên{" "}
              <strong>
                <a href={"https://bit.ly/mf24hfb"}> Facebook Page</a>
              </strong>{" "}
              của MF24H
            </Accordion.Panel>

            <Accordion.Panel
              header="Lãi suất vay tại MF24H là bao nhiêu?"
              className="pad"
            >
              - Phí thẩm định điều kiện cho vay.
              <br />
              - Phí quản lý tài sản cầm cố.
              <br />- Phí lưu trữ kho bãi (nếu có). <br />
              <br />
              (Chi phí vay trên chưa bao gồm các Khoản phạt vi phạm nghĩa vụ Hợp
              đồng. Các khoản phạt vi phạm nghĩa vụ sẽ áp dụng khi một trong các
              bên vi phạm nghĩa vụ tại Hợp đồng cầm cố). Tổng chi phí vay được
              MF24H cam kết không vượt quá 8.1%/tháng và phù hợp với quy định
              của pháp luật.
            </Accordion.Panel>
          </Accordion>
        </div>
      </WingBlank>
      <WhiteSpace size="lg" />
      <WingBlank size="lg">
        <div
          css={{
            background: "#fff",
            // minHeight: "438px",
            borderRadius: "5px",
            paddingTop: "10px",
            paddingBottom: "18px",
          }}
        >
          <div
            css={{
              borderBottom: "1px solid #E8E8E8",
              // display: "table",
              // width: "100%",
              textAlign: "center",
              paddingBottom: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#707070",
            }}
          >
            2. VỀ KHOẢN VAY
          </div>

          <Accordion
            accordion
            openAnimation={{}}
            className="my-accordion"
            onChange={() => {}}
          >
            <Accordion.Panel
              header="Ai có thể sử dụng dịch vụ của MF24H?"
              className="pad"
            >
              Nam nữ 18 tuổi trở lên và có giấy tờ nhân thân.
            </Accordion.Panel>
          </Accordion>
          <WingBlank
            size="lg"
            css={{ paddingTop: "22px", paddingBottom: "22px" }}
          ></WingBlank>
        </div>
      </WingBlank>
      <WhiteSpace size="lg" />{" "}
    </div>
  );
}

export default FAQ;
