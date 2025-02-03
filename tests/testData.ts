const fs = require("fs");

export const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8080/";

export const AUTHS = JSON.parse(fs.readFileSync("data/mongo/Auths.json"));
export const USERS = JSON.parse(fs.readFileSync("data/mongo/Users.json"));

//Konta do weryfikacji limitów bankowych

type LimitTransactionUser = {
  username: string;
  password: string;
  permissions: string;
  transactionLimit: number;
  transactionAmount: number;
};

export const usersByTransactionLimits: LimitTransactionUser[] = [
  {
    username: "v_d",
    password: "change",
    permissions: "broke",
    transactionLimit: 200,
    transactionAmount: 201,
  },
  {
    username: "chan_56",
    password: "conspiracy",
    permissions: "impoverished",
    transactionLimit: 500,
    transactionAmount: 501,
  },
  {
    username: "deck_12",
    password: "fixer",
    permissions: "struggling",
    transactionLimit: 1000,
    transactionAmount: 1001,
  },
  {
    username: "batty14",
    password: "limitless",
    permissions: "modest",
    transactionLimit: 1000,
    transactionAmount: 1001,
  },
  {
    username: "brain",
    password: "lowlife",
    permissions: "stable",
    transactionLimit: 1500,
    transactionAmount: 1501,
  },
  {
    username: "madari",
    password: "replay",
    permissions: "comfortable",
    transactionLimit: 2000,
    transactionAmount: 2001,
  },
  {
    username: "ro2den",
    password: "intel",
    permissions: "affluent",
    transactionLimit: 2500,
    transactionAmount: 2501,
  },
  {
    username: "dubois",
    password: "digital",
    permissions: "elite",
    transactionLimit: 5000,
    transactionAmount: 5001,
  },
];
