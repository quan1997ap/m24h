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
            <title>MF24H.com - T??i ch??nh m???i nh??</title>
          </Helmet>

          <JSONLD>
            <Product name="T??i ch??nh m???i nh??">
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
              1.S???N PH???M/ D???CH V???
            </div>
            <Accordion
              accordion
              openAnimation={{}}
              className="my-accordion"
              onChange={() => {}}
            >
              <Accordion.Panel
                header="T??i s???n n??o ???????c ch???p nh???n c???m c????"
                className="pad"
              >
                T???i MF24H ch??ng t??i ch???p nh???n c???m c??? c??c lo???i t??i s???n sau: ?? t??,
                ????ng k??/C?? v???t ?? t??, Xe m??y, ????ng k??/ C?? v???t xe m??y, ??i???n tho???i,
                Laptop, ?????ng h???, M??y ???nh, ????? trang s???c, Sim s??? ?????p... V???i nh???ng
                t??i s???n ?????c bi???t, vui l??ng li??n h??? Hotline {config.hotline}.
              </Accordion.Panel>

              <Accordion.Panel
                header="Th??ng tin c???a t??i c?? ???????c b???o m???t kh??ng ?"
                className="pad"
              >
                Ch??ng t??i cam k???t 100% b???o m???t th??ng tin c???a kh??ch h??ng khi th???c
                hi???n vay t???i MF24H
              </Accordion.Panel>

              <Accordion.Panel
                header="T??i mu???n ???????c t?? v???n tr???c ti???p th?? li??n h??? th??? n??o ?"
                className="pad"
              >
                M???i b???n vui l??ng li??n h???{" "}
                <strong>hotline {config.hotline}</strong> ho???c chat tr??n{" "}
                <strong>
                  <a href={"https://bit.ly/mf24hfb"}> Facebook Page</a>
                </strong>{" "}
                c???a MF24H
              </Accordion.Panel>

              <Accordion.Panel
                header="L??i su???t vay t???i MF24H l?? bao nhi??u?"
                className="pad"
              >
                - Ph?? th???m ?????nh ??i???u ki???n cho vay.
                <br />
                - Ph?? qu???n l?? t??i s???n c???m c???.
                <br />- Ph?? l??u tr??? kho b??i (n???u c??). <br />
                <br />
                (Chi ph?? vay tr??n ch??a bao g???m c??c Kho???n ph???t vi ph???m ngh??a v???
                H???p ?????ng. C??c kho???n ph???t vi ph???m ngh??a v??? s??? ??p d???ng khi m???t
                trong c??c b??n vi ph???m ngh??a v??? t???i H???p ?????ng c???m c???). T???ng chi
                ph?? vay ???????c MF24H cam k???t kh??ng v?????t qu?? 8.1%/th??ng v?? ph?? h???p
                v???i quy ?????nh c???a ph??p lu???t.
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
              2. V??? KHO???N VAY
            </div>

            <Accordion
              accordion
              openAnimation={{}}
              className="my-accordion"
              onChange={() => {}}
            >
              <Accordion.Panel
                header="Ai c?? th??? s??? d???ng d???ch v??? c???a MF24H?"
                className="pad"
              >
                Nam n??? 18 tu???i tr??? l??n v?? c?? gi???y t??? nh??n th??n.
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
            1.S???N PH???M/ D???CH V???
          </div>

          <Accordion
            accordion
            openAnimation={{}}
            className="my-accordion"
            onChange={() => {}}
          >
            <Accordion.Panel
              header="T??i s???n n??o ???????c ch???p nh???n c???m c????"
              className="pad"
            >
              T???i MF24H ch??ng t??i ch???p nh???n c???m c??? c??c lo???i t??i s???n sau: ?? t??,
              ????ng k??/C?? v???t ?? t??, Xe m??y, ????ng k??/ C?? v???t xe m??y, ??i???n tho???i,
              Laptop, ?????ng h???, M??y ???nh, ????? trang s???c, Sim s??? ?????p... V???i nh???ng
              t??i s???n ?????c bi???t, vui l??ng li??n h??? Hotline {config.hotline}.
            </Accordion.Panel>

            <Accordion.Panel
              header="Th??ng tin c???a t??i c?? ???????c b???o m???t kh??ng ?"
              className="pad"
            >
              Ch??ng t??i cam k???t 100% b???o m???t th??ng tin c???a kh??ch h??ng khi th???c
              hi???n vay t???i MF24H
            </Accordion.Panel>

            <Accordion.Panel
              header={
                <div>
                  T??i mu???n ???????c t?? v???n tr???c ti???p th?? li??n h???
                  <br />
                  th??? n??o ?
                </div>
              }
              className="pad2"
            >
              M???i b???n vui l??ng li??n h??? <strong>
                hotline {config.hotline}
              </strong>{" "}
              ho???c chat tr??n{" "}
              <strong>
                <a href={"https://bit.ly/mf24hfb"}> Facebook Page</a>
              </strong>{" "}
              c???a MF24H
            </Accordion.Panel>

            <Accordion.Panel
              header="L??i su???t vay t???i MF24H l?? bao nhi??u?"
              className="pad"
            >
              - Ph?? th???m ?????nh ??i???u ki???n cho vay.
              <br />
              - Ph?? qu???n l?? t??i s???n c???m c???.
              <br />- Ph?? l??u tr??? kho b??i (n???u c??). <br />
              <br />
              (Chi ph?? vay tr??n ch??a bao g???m c??c Kho???n ph???t vi ph???m ngh??a v??? H???p
              ?????ng. C??c kho???n ph???t vi ph???m ngh??a v??? s??? ??p d???ng khi m???t trong c??c
              b??n vi ph???m ngh??a v??? t???i H???p ?????ng c???m c???). T???ng chi ph?? vay ???????c
              MF24H cam k???t kh??ng v?????t qu?? 8.1%/th??ng v?? ph?? h???p v???i quy ?????nh
              c???a ph??p lu???t.
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
            2. V??? KHO???N VAY
          </div>

          <Accordion
            accordion
            openAnimation={{}}
            className="my-accordion"
            onChange={() => {}}
          >
            <Accordion.Panel
              header="Ai c?? th??? s??? d???ng d???ch v??? c???a MF24H?"
              className="pad"
            >
              Nam n??? 18 tu???i tr??? l??n v?? c?? gi???y t??? nh??n th??n.
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
