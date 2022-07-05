/** @jsx jsx */
/* eslint-disable no-unused-vars */
/* eslint-disable no-extend-native */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  WingBlank,
  WhiteSpace,
  Button,
  Flex,
  NavBar,
  Icon,
} from "antd-mobile";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import { css, jsx } from "@emotion/core";
import "./App.scss";
import HotlineForm from "controllers/HotlineForm";
import HomePage from "controllers/HomePage";
import LatestApplications from "controllers/LatestApplications";
import { LoanProducts, PawnProducts } from "controllers/LoanProducts";
import Signin from "controllers/Signin";
import Signup from "controllers/Signup";
import TermOfService from "controllers/Term";
import FAQ from "controllers/FAQ";

import CreditLoan from "controllers/products/CreditLoan";
import HouseholdRegistrationLoan from "controllers/products/HouseholdRegistrationLoan";
import MotorbikeRegistrationLoan from "controllers/products/MotorbikeRegistrationLoan";
import CarRegistrationLoan from "controllers/products/CarRegistrationLoan";
import UtilityBillLoan from "controllers/products/UtilityBillLoan";
import InstallmentLoan from "controllers/products/InstallmentLoan";
import IcloudLoan from "controllers/products/IcloudLoan";
import ComputerPawn from "controllers/products/ComputerPawn";
import CarPawn from "controllers/products/CarPawn";
import MotorbikePawn from "controllers/products/MotorbikePawn";
import MobilePhonePawn from "controllers/products/MobilePhonePawn";
import JewelPawn from "controllers/products/JewelPawn";
import WatchPawn from "controllers/products/WatchPawn";
import HouseMortageLoan from "controllers/products/HouseMortageLoan";

import log from "common/log.js";
import ReactGA from "react-ga";
// import withTracker from "common/tracker.js";
import ReactPixel from "react-facebook-pixel";
import MessengerCustomerChat from "react-messenger-customer-chat";
import Iframe from "react-iframe";
import TagManager from "react-gtm-module";
import MediaQuery from "react-responsive";

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return renderMergedProps(component, routeProps, rest);
      }}
    />
  );
};

String.prototype.capitalize = function () {
  return this.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
};

let router = (
  <HashRouter>
    <Switch>
      {/*  ======= For User =======  */}
      <PropsRoute
        exact
        key="home"
        path="/"
        name="home"
        component={HomePage}
        // component={withTracker(HomePage)}
      />
      <PropsRoute
        exact
        key="hotlineform"
        path="/hotline"
        name="hotlineform"
        component={HotlineForm}
        // component={withTracker(HomePage)}
      />
      <PropsRoute
        exact
        key="latest-applications"
        path="/790cb7ac-78d9-4ad9-bd6d-796b90e1a7e6"
        name="latest-applications"
        component={LatestApplications}
        // component={withTracker(HomePage)}
      />
      <PropsRoute
        exact
        key="terms"
        path="/terms"
        name="terms"
        // component={withTracker(LoanProducts)}
        component={TermOfService}
      />
      <PropsRoute
        exact
        key="faq"
        path="/faq"
        name="faq"
        // component={withTracker(LoanProducts)}
        component={FAQ}
      />
      <PropsRoute
        exact
        key="loan-products"
        path="/loan-products"
        name="loan-products"
        // component={withTracker(LoanProducts)}
        component={LoanProducts}
      />
      <PropsRoute
        exact
        key="pawn-products"
        path="/pawn-products"
        name="pawn-products"
        // component={withTracker(LoanProducts)}
        component={PawnProducts}
      />
      <PropsRoute
        exact
        key="signin"
        path="/account/signin"
        name="signin"
        // component={withTracker(Signin)}
        component={Signin}
      />
      <PropsRoute
        exact
        key="signup"
        path="/account/signup"
        name="signup"
        // component={withTracker(Signup)}
        component={Signup}
      />
      <PropsRoute
        exact
        key="credit-loan"
        path="/products/credit-loan"
        name="credit-loan"
        // component={withTracker(CreditLoan)}
        component={CreditLoan}
      />
      <PropsRoute
        exact
        key="credit-loan"
        path="/vay-tin-chap"
        name="credit-loan"
        // component={withTracker(CreditLoan)}
        component={CreditLoan}
      />
      <PropsRoute
        exact
        key="household-registration-loan"
        path="/products/household-registration-loan"
        name="household-registration-loan"
        // component={withTracker(HouseholdRegistrationLoan)}
        component={HouseholdRegistrationLoan}
      />
      <PropsRoute
        exact
        key="motorbike-registration-loan"
        path="/products/motorbike-registration-loan"
        name="motorbike-registration-loan"
        // component={withTracker(HouseholdRegistrationLoan)}
        component={MotorbikeRegistrationLoan}
      />
      <PropsRoute
        exact
        key="car-registration-loan"
        path="/products/car-registration-loan"
        name="car-registration-loan"
        // component={withTracker(HouseholdRegistrationLoan)}
        component={CarRegistrationLoan}
      />
      <PropsRoute
        exact
        key="installment-loan"
        path="/products/installment-loan"
        name="installment-loan"
        // component={withTracker(HouseholdRegistrationLoan)}
        component={InstallmentLoan}
      />
      <PropsRoute
        exact
        key="utility-bill-loan"
        path="/products/utility-bill-loan"
        name="utility-bill-loan"
        // component={withTracker(HouseholdRegistrationLoan)}
        component={UtilityBillLoan}
      />
      <PropsRoute
        exact
        key="icloud-loan"
        path="/products/icloud-loan"
        name="icloud-loan"
        component={IcloudLoan}
      />
      <PropsRoute
        exact
        key="icloud-loan"
        path="/vay-icloud"
        name="icloud-loan"
        component={IcloudLoan}
      />
      <PropsRoute
        exact
        key="icloud-loan"
        path="/vay-iphone"
        name="icloud-loan"
        component={IcloudLoan}
      />
      <PropsRoute
        exact
        key="computer-pawn"
        path="/products/computer-pawn"
        name="computer-pawn"
        component={ComputerPawn}
      />
      <PropsRoute
        exact
        key="mobile-phone-pawn"
        path="/products/mobile-phone-pawn"
        name="mobile-phone-pawn"
        component={MobilePhonePawn}
      />
      <PropsRoute
        exact
        key="car-pawn"
        path="/products/car-pawn"
        name="car-pawn"
        component={CarPawn}
      />{" "}
      <PropsRoute
        exact
        key="motorbike-pawn"
        path="/products/motorbike-pawn"
        name="motorbike-pawn"
        component={MotorbikePawn}
      />{" "}
      <PropsRoute
        exact
        key="jewel-pawn"
        path="/products/jewel-pawn"
        name="jewel-pawn"
        component={JewelPawn}
      />{" "}
      <PropsRoute
        exact
        key="watch-pawn"
        path="/products/watch-pawn"
        name="watch-pawn"
        component={WatchPawn}
      />{" "}
      <PropsRoute
        exact
        key="house-mortage-loan"
        path="/products/house-mortage-loan"
        name="house-mortage-loan"
        component={HouseMortageLoan}
      />
    </Switch>
  </HashRouter>
);

const AppRender = () => (
  <React.Fragment>
    {router}
    {/* <MessengerCustomerChat
      pageId="109973354023081"
      themeColor={"#FF5252"}
      loggedInGreeting={
        "Chào bạn, nếu bạn đang có nhu cầu cầm cố tài sản, đừng ngại, hãy chat với MF24H nhé!"
      }
      loggedOutGreeting={
        "Chào bạn, nếu bạn đang có nhu cầu cầm cố tài sản, đừng ngại, hãy chat với MF24H nhé!"
      }
    /> */}
  </React.Fragment>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: true,
    };
  }

  componentDidMount() {
    // ReactGA.initialize("UA-85815565-1");
    // ReactPixel.init("962698877396421", {}, {});
    // TagManager.initialize({
    //   gtmId: "GTM-K5722X8"
    // });
    if (
      window.location.origin === "https://www.mf24h.com" ||
      window.location.origin === "https://mf24h.com" ||
      window.location.origin === "http://localhost:3000"
    ) {
      let reg = window.location.href.match(
        /(https|http):\/\/(mf24h.com|www.mf24h.com|localhost:3000)\/((?!#).)/g
      );

      if (reg != null) {
        let newUrl = window.location.href.replace(
          window.location.origin,
          window.location.origin + "/#"
        );

        if (newUrl.endsWith("#/")) {
          newUrl = newUrl.slice(0, -2);
        }
        window.location.href = newUrl;

        // this.setState({ render: true });
      }
    }
  }

  render() {
    // return this.state.render ? AppRender() : "";
    return this.state.render ? AppRender() : "";
  }
}

PropsRoute.propTypes = {
  component: PropTypes.func,
};

export default App;
