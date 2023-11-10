import {
    simpleCommands,
    simpleCommandsDescriptions,
    complexCommands,
    complexCommandsDescriptions,
    listCommands,
    scanCommands, runCommands,
} from "../data/commands";
import {programs} from "../data/programs";

export const list = {
  cmd: [],
  prog: [],
}

Object.keys(simpleCommands).forEach(cmdKey => {
  list.cmd.push(`${simpleCommands[cmdKey]} <span class="secondary-line">${simpleCommandsDescriptions[simpleCommands[cmdKey]]}</span>`);
});

Object.keys(listCommands).map(cmdKey => {
  list.cmd.push(`${complexCommands.LIST} ${listCommands[cmdKey]} <span class="secondary-line">${complexCommandsDescriptions[complexCommands.LIST][listCommands[cmdKey]]}</span>`);
});

Object.keys(scanCommands).map(cmdKey => {
  list.cmd.push(`${complexCommands.SCAN} ${scanCommands[cmdKey]} <span class="secondary-line">${complexCommandsDescriptions[complexCommands.SCAN][scanCommands[cmdKey]]}</span>`);
});

Object.keys(runCommands).map(cmdKey => {
  list.cmd.push(`${complexCommands.RUN} ${runCommands[cmdKey]} <span class="secondary-line">${complexCommandsDescriptions[complexCommands.RUN][runCommands[cmdKey]]}</span>`);
});

Object.values(programs).map(program => list.prog.push(`<span>${program.name}</span><span class="secondary-line">${program.type}</span>`));
