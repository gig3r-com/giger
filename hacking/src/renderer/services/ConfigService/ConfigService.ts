import { ExploitType, ProgramType } from '../../types';
// @ts-ignore
import data from './hackingConfig';

export default class ConfigService {
  private ApiService: any;

  public config: any;

  public programs: any = data.programs;

  public exploits: any = data.exploits;

  constructor(ApiService: any) {
    this.ApiService = ApiService;
  }

  getExploit(exploitName: string): ExploitType | null {
    const exploit = this.exploits[exploitName];
    if (!exploit) return null;
    return exploit;
  }

  getProgram(programName: string): ProgramType | null {
    const program = this.programs[programName];
    if (!program) return null;
    return program;
  }

  getBreachTime(exploitName: string): number {
    console.log(this.exploits)
    return this.exploits[exploitName].breachTime;
  }
}
