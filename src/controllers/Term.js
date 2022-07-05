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

class TermOfService extends Component {
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
        <MPageContent />
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
            <div className={"page-signin"}>
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

function MPageContent(props) {
  return (
    <div className={"signin-form block-grey"}>
      <div className={"banner-image"} />
      <WhiteSpace size="lg" />
      <WingBlank size="lg">
        <div
          css={{
            background: "#fff",
            minHeight: "438px",
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
              fontWeight: "500",
              color: "#707070",
            }}
          >
            ĐIỀU KHOẢN VÀ ĐIỀU KIỆN SỬ DỤNG
          </div>
          <WingBlank
            size="lg"
            css={{ paddingTop: "22px", paddingBottom: "22px" }}
          >
            Cập nhật mới nhất: ngày 22 tháng 3 năm 2020
            <WhiteSpace size="lg" />
            Ngày có hiệu lực: Ngày 22 tháng 3 năm 2020
            <WhiteSpace size="lg" />
            Website: https://mf24h.com (Sau đây gọi tắt là “Sàn MF24H”) được
            phát triển, sở hữu và vận hành bởi Công ty cổ phần MF24H (Giấy CN
            ĐKDN số 0109112713 được cấp bởi Sở Kế hoạch và Đầu tư TP. Hà Nội)
            (Sau đây gọi tắt là “MF24H”).
            <WhiteSpace size="lg" />
            Các cá nhân, tổ chức sử dụng các dịch vụ trên Sàn MF24H (sau đây có
            thể gọi là “bạn” hoặc “Khách Hàng”) được yêu cầu phải đọc kỹ, hiểu,
            đồng ý và chịu sự ràng buộc với các quy định được mô tả trong Điều
            khoản và Điều kiện sử dụng đối với người sử dụng dịch vụ của MF24H
            (Sau đây gọi là “Điều Khoản và Điều Kiện”) sau đây:
            <WhiteSpace size="lg" />
            <strong css={{ color: config.color.txt_primary }}>
              Điều 1. Thu thập thông tin
            </strong>
            <WhiteSpace size="lg" />
            Ngay khi truy cập và sử dụng sản phẩm, dịch vụ trên Sàn MF24H cũng
            như các trang web liên kết, bạn đã xác nhận đồng ý và chấp thuận
            tuân thủ theo bảng Điều Khoản và Điều Kiện này của chúng tôi. MF24H
            sẽ thu thập địa chỉ IP và các thông tin web tiêu chuẩn khác của bạn
            như: loại trình duyệt, các trang bạn truy cập trong quá trình sử
            dụng dịch vụ, thông tin về máy tính và thiết bị mạng v.v… cho mục
            đích bảo mật và an toàn giao dịch. Nếu bạn sử dụng dịch vụ của Sàn
            MF24H, chúng tôi sẽ yêu cầu bạn cung cấp trung thực và chính xác
            những thông tin sau:
            <WhiteSpace size="lg" />
            Thông tin nhân thân và liên hệ (đối với tổ chức và cá nhân) như: họ
            và tên, ngày sinh, giới tính, địa chỉ cư trú, điện thoại, email,
            mạng xã hội (Facebook cá nhân), giấy tờ nhân thân hợp pháp (như
            CMTND, Thẻ CC, Hộ chiếu GPKD, MST), hợp đồng lao động, công việc
            chuyên môn hoặc các thông tin khác theo yêu cầu của hệ thống trong
            từng thời kỳ mà được thông báo rõ ràng tới Khách hàng.
            <WhiteSpace size="lg" />
            <strong css={{ color: config.color.txt_primary }}>
              Điều 2. Bản nâng cấp, chỉnh sửa
            </strong>
            <WhiteSpace size="lg" />
            Chúng tôi có thể cập nhật Điều Khoản và Điều Kiện này bất cứ lúc nào
            và sẽ tiến hành thông báo qua trang chủ (www.MF24H.com), ứng dụng
            trên điện thoại di động của chúng tôi hoặc thông báo về việc cập
            nhật Điều Khoản và Điều Kiện khi bạn đăng nhập hệ thống. Bạn có thể
            xem thời điểm Điều Khoản và Điều Kiện này được cập nhật mới nhất
            bằng cách kiểm tra ngày “cập nhật mới nhất” được hiển thị ở đầu
            trang này.
            <WhiteSpace size="lg" />
            Những thay đổi, chỉnh sửa, bổ sung hoặc xóa bỏ sẽ có hiệu lực theo
            “ngày có hiệu lực” của Điều Khoản và Điều Kiện được đăng tải trên
            trang chủ, hoặc các ứng dụng trên điện thoại của MF24H, bằng việc
            chấp nhận thông báo và tiếp tục sử dụng dịch vụ sau khi Điều Khoản
            và Điều Kiện có hiệu lực, bạn đã đồng ý với các thay đổi của chúng
            tôi.
            <WhiteSpace size="lg" />
            <strong css={{ color: config.color.txt_primary }}>
              Điều 3. Tài khoản của Khách Hàng Vay
            </strong>
            <WhiteSpace size="lg" />
            Khách Hàng Vay mặc nhiên thừa nhận rằng bạn thuộc đối tượng hợp pháp
            để giao dịch với MF24H hoặc các đối tác của MF24H. Khách Hàng Vay
            cam kết sẽ luôn tuân thủ quy định của pháp luật và phải chịu hoàn
            toàn trách nhiệm trước pháp luật về các thông tin, giao dịch thực
            hiện qua Sàn MF24H.
            <WhiteSpace size="lg" />
            Khi bạn gửi yêu cầu tạo một tài khoản hoặc đăng ký sử dụng dịch vụ
            qua Sàn MF24H, bạn đã hiểu và đồng ý rằng mình đã thiết lập một mối
            quan hệ giữa bạn và MF24H và đối tác của MF24H. Theo đó, MF24H và
            các đối tác có thể gửi thông tin của bạn cho các nhà cung cấp sản
            phẩm và dịch vụ liên quan đến nhu cầu của bạn. Và bạn cũng chấp
            thuận để MF24H và các đối tác có thể liên lạc với bạn bằng cách sử
            dụng thông tin bạn đã cung cấp qua Sàn MF24H. Vào bất cứ lúc nào bạn
            không muốn tiếp tục nhận được thông tin liên lạc từ MF24H, bạn có
            thể gọi điện trực tiếp vào số hotline của MF24H để nêu ra yêu cầu
            của mình, hoặc thực hiện theo chỉ dẫn ở trong liên kết này trong
            trường hợp bạn muốn chấm dứt nhận thư điện tử tin tức (newsletter)
            từ chúng tôi.
            <WhiteSpace size="lg" />
            <strong css={{ color: config.color.txt_primary }}>
              Điều 4. Tài khoản của Khách Hàng Cho Vay
            </strong>
            <WhiteSpace size="lg" />
            Khách Hàng Cho Vay mặc nhiên thừa nhận rằng bạn thuộc đối tượng hợp
            pháp để giao dịch với MF24H hoặc các đối tác của MF24H. Khách Hàng
            Cho Vay cam kết sẽ luôn tuân thủ quy định của pháp luật và phải chịu
            hoàn toàn trách nhiệm trước pháp luật về các thông tin và giao dịch
            thực hiện qua Sàn MF24H.
            <WhiteSpace size="lg" />
            Khi Khách Hàng Cho Vay gửi yêu cầu tạo một tài khoản hoặc đăng ký sử
            dụng dịch vụ qua Sàn MF24H, Khách Hàng đã hiểu và đồng ý rằng mình
            đã thiết lập một mối quan hệ với MF24H hoặc đối tác của MF24H. Vào
            bất cứ lúc nào bạn không muốn tiếp tục nhận được thông tin liên lạc
            từ MF24H, bạn có thể gọi điện trực tiếp vào số hotline của MF24H để
            nêu ra yêu cầu của mình, hoặc thực hiện theo chỉ dẫn ở trong liên
            kết này trong trường hợp bạn muốn chấm dứt nhận thư điện tử tin tức
            (newsletter) từ chúng tôi.
            <WhiteSpace size="lg" />
            Khi chúng tôi nhận được khiếu nại từ Khách Hàng Vay về các nội dung
            liên quan đến các hành vi vi phạm pháp luật của Khách Hàng Cho Vay
            trong quá trình giao dịch, bao gồm nhưng không giới hạn các hành vi
            sau: yêu cầu chuyển tiền hoặc các thông tin về tài khoản ngân hàng
            (số tài khoản và mật khẩu tài khoản ngân hàng, mã OTP) trước khi
            thực hiện hợp đồng hoặc việc không thực hiện quyền và nghĩa vụ theo
            hợp đồng vay theo quy định pháp luật, MF24H sẽ thông báo tới Khách
            Hàng Cho Vay về các nội dung khiếu nại nêu trên. Khách Hàng Cho Vay
            có nghĩa vụ hợp tác, liên lạc với MF24H để giải quyết các khiếu nại
            trên ngay khi nhận được thông tin. Nếu Khách Hàng Cho Vay không liên
            lạc và hợp tác với MF24H để làm rõ các khiếu nại trên trong thời
            gian tối đa 05 ngày kể từ ngày MF24H gửi thông báo, MF24H có quyền
            khóa tài khoản liên quan để đảm bảo quyền lợi của Khách Hàng Vay và
            hạn chế các thiệt hại có thể xảy ra.
            <WhiteSpace size="lg" />
            <strong css={{ color: config.color.txt_primary }}>
              Điều 5. Điều khoản miễn trừ trách nhiệm
            </strong>
            <WhiteSpace size="lg" />
            MF24H không đảm bảo rằng Sàn MF24H và bất kỳ sản phẩm dịch vụ do
            MF24H cung cấp sẽ đáp ứng được các yêu cầu của Khách Hàng, cũng như
            không đảm bảo rằng sự vận hành của Sàn không bị gián đoạn, không có
            sự chậm trễ, từ chối lệnh, bị lỗi, mất hoặc bị hủy bỏ thông tin hoặc
            các lỗi do virut, phần mềm thứ ba hoặc các rủi ro bất khả kháng
            khác. MF24H sẽ được miễn trừ trách nhiệm với các vấn đề liên quan
            đến sự cố nêu trên (nếu có)
            <WhiteSpace size="lg" />
            MF24H không chịu trách nhiệm liên quan đến tính xác thực của thông
            tin do Khách Hàng cung cấp hoặc giao dịch cho vay và trả nợ giữa
            Khách Hàng Cho Vay và Khách Hàng Vay hoặc hành vi vi phạm pháp luật
            của Khách Hàng.
            <WhiteSpace size="lg" />
            <strong css={{ color: config.color.txt_primary }}>
              Điều 6. Xác minh thông tin Khách hàng
            </strong>
            <WhiteSpace size="lg" />
            Khi gửi yêu cầu vay tiền, bạn cho phép MF24H và Khách Hàng Cho Vay
            xác minh tính chính xác và tính xác thực về các thông tin bạn đã
            cung cấp bằng các công cụ nội bộ hoặc với sự hỗ trợ của bên thứ ba.
            Cụ thể, bạn cho phép MF24H hoặc đối tác của MF24H xác minh tình
            trạng việc làm của bạn bằng cách liên hệ với tổ chức nơi bạn đã hoặc
            đang làm việc. Trong mọi trường hợp, MF24H hoặc đối tác của MF24H có
            thể kiểm tra các thông tin mà bạn đã cung cấp.
            <WhiteSpace size="lg" />
            Bất kỳ yêu cầu vay tiền bạn gửi trên Sàn MF24H, đều KHÔNG phải là
            một bản đề nghị cho vay dành cho một tổ chức tín dụng hay công ty
            tài chính. Thay vào đó, đó là một thao tác thu thập thông tin nhu
            cầu vay tiền, để từ đó, MF24H có thể hỗ trợ kết nối Khách hàng đi
            vay và Khách hàng cho vay phù hợp. Sau đó bạn cũng có thể cần phải
            cung cấp thêm một số thông tin giấy tờ cho Khách hàng cho vay để
            hoàn thiện hồ sơ cho vay.
            <WhiteSpace size="lg" />
            <strong css={{ color: config.color.txt_primary }}>
              Điều 7. Chia sẻ thông tin với bên thứ ba
            </strong>
            <WhiteSpace size="lg" />
            MF24H có thể chia sẻ hoặc nhận thông tin cá nhân của bạn với:
            <WhiteSpace size="lg" />
            Khách Hàng Cho Vay thông qua dịch vụ cung cấp trên Sàn MF24H. Tại
            đây, Khách Hàng Cho Vay cam kết tuyệt đối không được sử dụng thông
            tin cá nhân của Khách Hàng Vay vào mục đích nào khác ngoài phạm vi
            giao dịch hoặc cho lợi ích riêng của chính mình. Đồng thời, hoàn
            toàn chịu trách nhiệm trước pháp luật về các hành vi sử dụng thông
            tin nêu trên.
            <WhiteSpace size="lg" />
            Các cơ quan thực thi pháp luật hoặc cơ quan công quyền có thẩm quyền
            trong việc điều tra, xét xử theo quy định của pháp luật.
            <WhiteSpace size="lg" />
            Ngoài những phạm vi được mô tả nói trên, MF24H cam kết sẽ không bán
            hoặc cho thuê thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào
            khác.
            <WhiteSpace size="lg" />
            <strong css={{ color: config.color.txt_primary }}>
              Điều 8. Quy định về bảo mật thông tin
            </strong>
            <WhiteSpace size="lg" />
            MF24H đảm bảo rằng các thông tin cá nhân của Bạn sẽ được bảo mật
            theo quy định pháp luật trong phạm vi quản lý của MF24H.
            <WhiteSpace size="lg" />
            MF24H có thể lưu trữ và sử dụng thông tin của Bạn cho mục đích: (i)
            hỗ trợ Bạn sử dụng sản phẩm, dịch vụ của MF24H; (ii) thực hiện các
            hoạt động quảng bá, tiếp thị có liên quan đến dịch vụ của MF24H;
            (iii) thực hiện các bản khảo sát khách hàng và nghiên cứu thị
            trường; (iv) cải thiện và nâng cao chất lượng dịch vụ của MF24H; và
            (v) quản trị, lập các thống kê về tình hình sử dụng dịch vụ.
            <WhiteSpace size="lg" />
            <strong css={{ color: config.color.txt_primary }}>
              Điều 9. Cảnh báo đối với khách hàng sử dụng sàn MF24H
            </strong>
            <WhiteSpace size="lg" />
            Khách Hàng phải tự bảo mật thông tin tài khoản của cá nhân, tuyệt
            đối không để lộ hoặc cung cấp thông tin về user/password của mình
            trên Sàn MF24H hoặc cung cấp thông tin liên quan (mật khẩu, mã
            OTP….) đến tài khoản ngân hàng, thẻ tín dụng… cho bất kì bên thứ ba
            nào khác để tránh rủi ro.
            <WhiteSpace size="lg" />
            Khách Hàng KHÔNG CHUYỂN TIỀN cho bất kì cá nhân hay tổ chức nào khi
            yêu cầu vay tiền.
            <WhiteSpace size="lg" />
            Nhân viên của MF24H chỉ có nhiệm vụ giúp bạn đăng ký, cập nhật thông
            tin, giải đáp thắc mắc. Nhân viên của MF24H không yêu cầu bạn chuyển
            tiền hay chi bất kỳ khoản phí nào.
            <WhiteSpace size="lg" />
            <strong css={{ color: config.color.txt_primary }}>
              Điều 10. Bản quyền và thương hiệu
            </strong>
            <WhiteSpace size="lg" />
            MF24H là chủ sở hữu của các thương hiệu, biểu tượng và các nhãn mác
            sản phẩm/dịch vụ đăng tải trên Sàn MF24H. Những người truy cập vào
            SànMF24H không được phép sử dụng các tài sản nêu trên nếu không được
            sự cho phép trước của MF24H bằng văn bản.
            <WhiteSpace size="lg" />
            <strong css={{ color: config.color.txt_primary }}>
              Điều 11. Thông tin hỗ trợ Khách hàng
            </strong>
            <WhiteSpace size="lg" />
            Mọi thắc mắc Khách hàng có thể liên hệ với MF24H để được tư vấn và
            giải đáp qua:
            <WhiteSpace size="lg" />
            {/* Địa chỉ email: support@MF24H.com */}
            <WhiteSpace size="lg" />
            Số điện thoại: {config.hotline}
            <WhiteSpace size="lg" />
            <strong>
              Trân trọng cảm ơn bạn đã sử dụng sản phẩm dịch vụ của chúng tôi
            </strong>
            <WhiteSpace size="lg" />
          </WingBlank>
        </div>
      </WingBlank>
    </div>
  );
}

export default TermOfService;
