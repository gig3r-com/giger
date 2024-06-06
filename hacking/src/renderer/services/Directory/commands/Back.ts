// eslint-disable-next-line import/no-cycle
import { BaseCommand } from '../../CommandsService/CommandsService';
import Directory from '../index';
import Infrastructure from '../../Infrastructure';

export default class Back extends BaseCommand {
  execute = () => {
    Directory.moveBack();
  };
}
