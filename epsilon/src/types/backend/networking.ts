export type Log = {
    id: string;
    timestamp: string;
    sourceUser: string; // user handle
    targetUser: string; // user target
    logType: string; // a lot of logs will be created by api, on sending message, transfer etc. so if you really need enum you can use one (check public enum LogType) but if possible add a possibility to add a random string :) if you dont need enum just use string
    logData: string;
    subnetwork: string // subnetwork name
    hackData: Record<string, string>; // { [string]: [string] }
}

export type Subnetwork = {
    id: string;
    name: string;
    network: string; // network name
    users: string[]; // user handles
    firewall: string;
    operationSystem: string;
    ice: string[];
    accessPoint?: string;
    pastHacks: string[];
    logs: Log[];
}

export type Network = {
    id: string;
    name: string;
    admin: string; // user handle
    subnetworks: string[]; // subnetwork names
    nodes: Record<string, string>; // { [string]: [string] }
    data: Record<string, string>; // { [string]: [string] }
    epsilonDescription: string;
}

export type ProgramCodes = {
    id: string;
    code: string;
    program: string; // human readable name of a program
    isUsed: boolean;
    creator?: string; // if code was created by player here will be his handle
    owner?: string; // if code was used here will be who used it
}