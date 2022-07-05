/* eslint-disable no-unused-vars */
import XXH from "xxhashjs";
import randomstring from "randomstring";
import _ from "lodash";
let xxsalt = 0xabcd;
const hostname = window && window.location && window.location.hostname;
const prefix = "[MF24H]";
const debug = hostname === "localhost" ? true : false;

let backendHost;
let paymentHost;
let localPort = ":8076";
let localServer = "http://localhost" + localPort;
let localPayment = "http://localhost" + localPort + "/payments/payment";

if (hostname === "www.mf24h.com" || hostname.includes("mf24h.com")) {
  backendHost = "https://api.mf24h.com";
  paymentHost = "https://payment.mf24h.com";
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || localServer;
  paymentHost = process.env.REACT_APP_PAYMENT_HOST || localPayment;
}

let keyPrefix = "MF24H>>>|BORROWER|";
let sharedBorrowerDataKey = "borrower_profile_data";
let sharedBorrowerDataHashKey = "borrower_profile_data_hash";
let s1k = keyPrefix + sharedBorrowerDataKey;
let s2k = keyPrefix + sharedBorrowerDataHashKey;
let borrowerDataXXH = XXH.h32(s1k, xxsalt).toString(16);
let borrowerDataHashXXH = XXH.h32(s2k, xxsalt).toString(16);

let keyLenderPrefix = "MF24H***|LENDER|";
let sharedLenderDataKey = "lender_profile_data";
let sharedLenderDataHashKey = "lender_profile_data_hash";
let s3k = keyLenderPrefix + sharedLenderDataKey;
let s4k = keyLenderPrefix + sharedLenderDataHashKey;
let lenderDataXXH = XXH.h32(s3k, xxsalt).toString(16);
let lenderDataHashXXH = XXH.h32(s4k, xxsalt).toString(16);
let ONEM = 1000000;
let D90 = {
  "10d": 10,
  "20d": 20,
  "30d": 30,
  "40d": 40,
  "50d": 50,
  "60d": 60,
  "70d": 70,
  "80d": 80,
  "90d": 90,
};

let M36 = {
  "6m": 6,
  "9m": 9,
  "12m": 12,
  "15m": 15,
  "18m": 18,
  "21m": 21,
  "24m": 24,
  "27m": 27,
  "30m": 30,
  "23m": 33,
  "36m": 36,
};

let M60 = {
  "6m": 6,
  "12m": 12,
  "18m": 18,
  "24m": 24,
  "30m": 30,
  "36m": 36,
  "42m": 42,
  "48m": 48,
  "54m": 54,
  "60m": 60,
};

let config = {
  hotline: "085.330.1111",
  color: {
    primary: "#FD6565",
    txt_primary: "#FF5252",
    btn_green: "#71C665",
  },
  debug: hostname === "localhost" ? true : false,
  xxsalt: xxsalt,
  shared_salt: randomstring.generate(24),
  shared_banker_salt: randomstring.generate(24),
  api_key: "qLIPzVKSrztiEF2kIdtEXzyPg9TxkQfm",
  api: {
    loan_application: {
      create: backendHost + "/sanic1/frontend/loan_applications",
      latest: backendHost + "/sanic1/frontend/loan_applications",
      latest_all: backendHost + "/sanic1/frontend/loan_applications/all",
    },
    city: {
      city_provinces:
        backendHost + "/sanic1/frontend/city_provinces/city_provinces",
      city_districts:
        backendHost + "/sanic1/frontend/city_provinces/city_districts",
    },
  },
  store_key: {
    borrower_data: borrowerDataXXH,
    borrower_data_hash: borrowerDataHashXXH,

    lender_data: lenderDataXXH,
    lender_data_hash: lenderDataHashXXH,
  },
  backend_host: backendHost,
  upload_file_host: "https://api.mf24h.com",
  app_hostname: hostname,
  root_path: "/#/",

  products: {
    computer_pawn: {
      name: "Cầm máy tính",
      money: {
        "10m": 10 * ONEM,
        "15m": 15 * ONEM,
        "20m": 20 * ONEM,
        "25m": 25 * ONEM,
        "30m": 30 * ONEM,
        "35m": 35 * ONEM,
        "40m": 40 * ONEM,
        "45m": 45 * ONEM,
        "50m": 50 * ONEM,
      },
      period: D90,
    },
    mobile_phone_pawn: {
      name: "Cầm điện thoại",
      money: {
        "12m": 12 * ONEM,
        "15m": 15 * ONEM,
        "18m": 18 * ONEM,
        "21m": 21 * ONEM,
        "24m": 24 * ONEM,
        "27m": 27 * ONEM,
        "30m": 30 * ONEM,
      },
      period: D90,
    },
    car_pawn: {
      name: "Cầm ô tô",
      money: {
        "100m": 100 * ONEM,
        "200m": 200 * ONEM,
        "300m": 300 * ONEM,
        "400m": 400 * ONEM,
        "500m": 500 * ONEM,
        "600m": 600 * ONEM,
        "700m": 700 * ONEM,
        "800m": 800 * ONEM,
        "900m": 900 * ONEM,
        "1000m": 1000 * ONEM,
      },
      period: M60,
    },
    motorbike_pawn: {
      name: "Cầm xe máy",
      money: {
        "12m": 12 * ONEM,
        "15m": 15 * ONEM,
        "18m": 18 * ONEM,
        "21m": 21 * ONEM,
        "24m": 24 * ONEM,
        "27m": 27 * ONEM,
        "30m": 30 * ONEM,
      },
      period: D90,
    },
    jewel_pawn: {
      name: "Cầm đá quý",
      money: {
        "12m": 12 * ONEM,
        "15m": 15 * ONEM,
        "18m": 18 * ONEM,
        "21m": 21 * ONEM,
        "24m": 24 * ONEM,
        "27m": 27 * ONEM,
        "30m": 30 * ONEM,
      },
      period: D90,
    },
    watch_pawn: {
      name: "Cầm đồng hồ",
      money: {
        "12m": 12 * ONEM,
        "15m": 15 * ONEM,
        "18m": 18 * ONEM,
        "21m": 21 * ONEM,
        "24m": 24 * ONEM,
        "27m": 27 * ONEM,
        "30m": 30 * ONEM,
      },
      period: D90,
    },
    house_mortage_loan: {
      name: "Vay thế chấp theo sổ đỏ",
      money: {
        "100m": 100 * ONEM,
        "200m": 200 * ONEM,
        "300m": 300 * ONEM,
        "400m": 400 * ONEM,
        "500m": 500 * ONEM,
        "600m": 600 * ONEM,
        "700m": 700 * ONEM,
        "800m": 800 * ONEM,
        "900m": 900 * ONEM,
        "1000m": 1000 * ONEM,
      },
      period: D90,
    },

    credit_loan: {
      name: "Vay tín chấp theo lương",
      money: {
        "10m": 10 * ONEM,
        "15m": 15 * ONEM,
        "20m": 20 * ONEM,
        "25m": 25 * ONEM,
        "30m": 30 * ONEM,
        "35m": 35 * ONEM,
        "40m": 40 * ONEM,
        "45m": 45 * ONEM,
        "50m": 50 * ONEM,
      },
      period: D90,
    },
    household_registration_loan: {
      name: "Vay theo sổ hộ khẩu",
      money: {
        "10m": 10 * ONEM,
        "15m": 15 * ONEM,
        "20m": 20 * ONEM,
        "25m": 25 * ONEM,
        "30m": 30 * ONEM,
        "35m": 35 * ONEM,
        "40m": 40 * ONEM,
        "45m": 45 * ONEM,
        "50m": 50 * ONEM,
      },
      period: D90,
    },
    motorbike_registration_loan: {
      name: "Vay theo đăng ký xe máy",
      money: {
        "10m": 10 * ONEM,
        "15m": 15 * ONEM,
        "20m": 20 * ONEM,
        "25m": 25 * ONEM,
        "30m": 30 * ONEM,
        "35m": 35 * ONEM,
        "40m": 40 * ONEM,
        "45m": 45 * ONEM,
        "50m": 50 * ONEM,
      },
      period: D90,
    },
    installment_loan: {
      name: "Vay trả góp",
      money: {
        "10m": 10 * ONEM,
        "15m": 15 * ONEM,
        "20m": 20 * ONEM,
        "25m": 25 * ONEM,
        "30m": 30 * ONEM,
        "35m": 35 * ONEM,
        "40m": 40 * ONEM,
        "45m": 45 * ONEM,
        "50m": 50 * ONEM,
      },
      period: D90,
    },
    utility_bill_loan: {
      name: "Vay theo hoá đơn điện nước",
      money: {
        "10m": 10 * ONEM,
        "15m": 15 * ONEM,
        "20m": 20 * ONEM,
        "25m": 25 * ONEM,
        "30m": 30 * ONEM,
        "35m": 35 * ONEM,
        "40m": 40 * ONEM,
        "45m": 45 * ONEM,
        "50m": 50 * ONEM,
      },
      period: M36,
    },
    car_registration_loan: {
      name: "Vay theo đăng ký ô tô",
      money: {
        "50m": 50 * ONEM,
        "100m": 100 * ONEM,
        "150m": 150 * ONEM,
        "200m": 200 * ONEM,
        "250m": 250 * ONEM,
        "300m": 300 * ONEM,
        "350m": 350 * ONEM,
        "400m": 400 * ONEM,
        "450m": 450 * ONEM,
        "500m": 500 * ONEM,
      },
      period: D90,
    },

    icloud_loan: {
      name: "Vay theo iCloud iPhone",
      money: {
        "12m": 12 * ONEM,
        "15m": 15 * ONEM,
        "18m": 18 * ONEM,
        "21m": 21 * ONEM,
        "24m": 24 * ONEM,
        "27m": 27 * ONEM,
        "30m": 30 * ONEM,
      },
      period: D90,
    },
  },
};

config.product_list = [].concat(
  _.map(config.products, (v, k, c) => {
    if (v.name) {
      return {
        product_id: k,
        product_name: v.name,
      };
    } else {
      return {
        product_id: k,
        product_name: v,
      };
    }
  })
);

config.city_provinces = {
  items: 63,
  data: [
    {
      _id: "5c853e1e77215b6e6ddaf1b9",
      city_province_id: "01",
      name: "Thành phố Hà Nội",
      type: "Thành phố Trung ương",
    },
    {
      _id: "5c853e2077215b6e6ddaf1ea",
      city_province_id: "79",
      name: "Thành phố Hồ Chí Minh",
      type: "Thành phố Trung ương",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1ba",
      city_province_id: "02",
      name: "Tỉnh Hà Giang",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1bb",
      city_province_id: "04",
      name: "Tỉnh Cao Bằng",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1bc",
      city_province_id: "06",
      name: "Tỉnh Bắc Kạn",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1bd",
      city_province_id: "08",
      name: "Tỉnh Tuyên Quang",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1be",
      city_province_id: "10",
      name: "Tỉnh Lào Cai",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1bf",
      city_province_id: "11",
      name: "Tỉnh Điện Biên",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1c0",
      city_province_id: "12",
      name: "Tỉnh Lai Châu",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1c1",
      city_province_id: "14",
      name: "Tỉnh Sơn La",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1c2",
      city_province_id: "15",
      name: "Tỉnh Yên Bái",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1c3",
      city_province_id: "17",
      name: "Tỉnh Hoà Bình",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1c4",
      city_province_id: "19",
      name: "Tỉnh Thái Nguyên",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1c5",
      city_province_id: "20",
      name: "Tỉnh Lạng Sơn",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1c6",
      city_province_id: "22",
      name: "Tỉnh Quảng Ninh",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1c7",
      city_province_id: "24",
      name: "Tỉnh Bắc Giang",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1c8",
      city_province_id: "25",
      name: "Tỉnh Phú Thọ",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1c9",
      city_province_id: "26",
      name: "Tỉnh Vĩnh Phúc",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1ca",
      city_province_id: "27",
      name: "Tỉnh Bắc Ninh",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1cb",
      city_province_id: "30",
      name: "Tỉnh Hải Dương",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1cc",
      city_province_id: "31",
      name: "Thành phố Hải Phòng",
      type: "Thành phố Trung ương",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1cd",
      city_province_id: "33",
      name: "Tỉnh Hưng Yên",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1ce",
      city_province_id: "34",
      name: "Tỉnh Thái Bình",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1cf",
      city_province_id: "35",
      name: "Tỉnh Hà Nam",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1d0",
      city_province_id: "36",
      name: "Tỉnh Nam Định",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1d1",
      city_province_id: "37",
      name: "Tỉnh Ninh Bình",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1d2",
      city_province_id: "38",
      name: "Tỉnh Thanh Hóa",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1d3",
      city_province_id: "40",
      name: "Tỉnh Nghệ An",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1d4",
      city_province_id: "42",
      name: "Tỉnh Hà Tĩnh",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1d5",
      city_province_id: "44",
      name: "Tỉnh Quảng Bình",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1d6",
      city_province_id: "45",
      name: "Tỉnh Quảng Trị",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1d7",
      city_province_id: "46",
      name: "Tỉnh Thừa Thiên Huế",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1d8",
      city_province_id: "48",
      name: "Thành phố Đà Nẵng",
      type: "Thành phố Trung ương",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1d9",
      city_province_id: "49",
      name: "Tỉnh Quảng Nam",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1da",
      city_province_id: "51",
      name: "Tỉnh Quảng Ngãi",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1db",
      city_province_id: "52",
      name: "Tỉnh Bình Định",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1dc",
      city_province_id: "54",
      name: "Tỉnh Phú Yên",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1dd",
      city_province_id: "56",
      name: "Tỉnh Khánh Hòa",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1de",
      city_province_id: "58",
      name: "Tỉnh Ninh Thuận",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1df",
      city_province_id: "60",
      name: "Tỉnh Bình Thuận",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1e0",
      city_province_id: "62",
      name: "Tỉnh Kon Tum",
      type: "Tỉnh",
    },
    {
      _id: "5c853e1f77215b6e6ddaf1e1",
      city_province_id: "64",
      name: "Tỉnh Gia Lai",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1e2",
      city_province_id: "66",
      name: "Tỉnh Đắk Lắk",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1e3",
      city_province_id: "67",
      name: "Tỉnh Đắk Nông",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1e4",
      city_province_id: "68",
      name: "Tỉnh Lâm Đồng",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1e5",
      city_province_id: "70",
      name: "Tỉnh Bình Phước",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1e6",
      city_province_id: "72",
      name: "Tỉnh Tây Ninh",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1e7",
      city_province_id: "74",
      name: "Tỉnh Bình Dương",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1e8",
      city_province_id: "75",
      name: "Tỉnh Đồng Nai",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1e9",
      city_province_id: "77",
      name: "Tỉnh Bà Rịa - Vũng Tàu",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1eb",
      city_province_id: "80",
      name: "Tỉnh Long An",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1ec",
      city_province_id: "82",
      name: "Tỉnh Tiền Giang",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1ed",
      city_province_id: "83",
      name: "Tỉnh Bến Tre",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1ee",
      city_province_id: "84",
      name: "Tỉnh Trà Vinh",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1ef",
      city_province_id: "86",
      name: "Tỉnh Vĩnh Long",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1f0",
      city_province_id: "87",
      name: "Tỉnh Đồng Tháp",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1f1",
      city_province_id: "89",
      name: "Tỉnh An Giang",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1f2",
      city_province_id: "91",
      name: "Tỉnh Kiên Giang",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1f3",
      city_province_id: "92",
      name: "Thành phố Cần Thơ",
      type: "Thành phố Trung ương",
    },
    {
      _id: "5c853e2077215b6e6ddaf1f4",
      city_province_id: "93",
      name: "Tỉnh Hậu Giang",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1f5",
      city_province_id: "94",
      name: "Tỉnh Sóc Trăng",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1f6",
      city_province_id: "95",
      name: "Tỉnh Bạc Liêu",
      type: "Tỉnh",
    },
    {
      _id: "5c853e2077215b6e6ddaf1f7",
      city_province_id: "96",
      name: "Tỉnh Cà Mau",
      type: "Tỉnh",
    },
  ],
};

export default config;
