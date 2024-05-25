import type CommandsServiceType from '../CommandsService';
import {getErrorMessage, subnetworkNotFound} from "../responseLines/errors";
import {ApiService, ConfigService} from "../../index";
import {getLoginUserData} from "../../../Terminal/utils/store";

export default class Connect {
  private readonly Service: CommandsServiceType;

  public connectedSubnetwork = null;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  async execute() {
    const { addLines, fireInitError, getDirectLine, parsedCommand, setInputDisabled, setPrefixType } =
      this.Service;
    if (!addLines || !setInputDisabled || !setPrefixType) {
      fireInitError();
      return;
    }
    let subnetworkId = parsedCommand[0];

    try {
      await ConfigService.checkHacking('connect');
      setInputDisabled(true);
      if (!subnetworkId) {
        subnetworkId = await getDirectLine(`Enter subnetwork's id or name:`);
      }
      try {
        this.connectedSubnetwork = await ApiService.getSubnetworkById(subnetworkId);
      } catch (e) {}
      if (!this.connectedSubnetwork) {
        try {
          this.connectedSubnetwork = await ApiService.getSubnetworkByName(subnetworkId);
        } catch (e) {}
      } else if (!this.connectedSubnetwork) {
        addLines(subnetworkNotFound);
      }

      // Subnetwork found
      const networkResponse = await ApiService.scanForNetworkById(this.connectedSubnetwork.networkId);
      if (!networkResponse || !networkResponse.data) {
        throw new Error('Network not found');
      }
      const loginUser = getLoginUserData();
      if (networkResponse.data.adminId !== loginUser.id && networkResponse.data.adminId !== loginUser.handle) {
        throw new Error('You are not NetOps of this subnetwork');
      }

      // Connect
      setPrefixType(subnetwork.name);

    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }
    addLines([]);
  }
}
