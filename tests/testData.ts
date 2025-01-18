export const BASE_URL = "http://localhost:5173/";

type randomSuccessfulLogin = {
  username: string;
  password: string;
};

export const randomSuccessfulLogin = { username: "0_connor", password: "chip" };

type randomUnSuccessfulLogin = {
  username: string;
  password: string;
};

export const randomUnSuccessfulLogin = [
{
  username: "O_connor",
  password: "chip",
},
{
  username: "o_connor",
  password: "chip",
},
{
  username: "0_Connor",
  password: "chip",
},
{
  username: "0_conor",
  password: "chip",
},
{
  username: "0_connor",
  password: "Chip",
},
{
  username: "",
  password: "chip",
},
{
  username: "0_connor",
  password: "",
},
{
  username: "0_connor",
  password: " chip ",
},
{
  username: " 0_connor ",
  password: "chip",
},
{
  username: "0_connor",
  password: "@!#^",
},
{
  username: "0#connor",
  password: "chip",
},
{
  username: "incorrectUser",
  password: "incorrectPassword",
},
];

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
