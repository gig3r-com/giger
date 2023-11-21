import {simpleCommands, complexCommands, listCommands, scanCommands,} from "../data/commands";
import {list} from "../commandLines/list";
import {scan} from "../commandLines/scan";
import {users, usersHashes} from "../data/users";
import {addresses} from "../data/addresses";
// import {programs, programTypes} from "../data/programs";
// import {BREACH_VALUES, firewalls} from "../data/firewalls";

export function useCommandRunner(props) {
    const { setLines, addError, addLine, addLines, connectedAddress, setConnectedAddress, } = props;

    const executeCommand = (command) => {
        const parsedCommand = command.toLowerCase().split(' ');
        const mainCommand = parsedCommand[0];

        switch (mainCommand) {
            case simpleCommands.CLEAR:
                setLines([]);
                return;
            case simpleCommands.END:
                // setConnectedAddress(null);
                addLine('<CONNECTION CLOSED>');
                return;
            case complexCommands.LIST:
                const listParameter = parsedCommand[1];
                handleListCommand(listParameter);
                return;
            case complexCommands.SCAN:
                parsedCommand.shift();
                const scanPointer = parsedCommand.join(' ');
                handleScanCommand(scanPointer);
                return;
            // case complexCommands.RUN:
            //     handleRunCommand(parsedCommand);
            //     return;
            default:
                addLine('ERROR');
                return;
        }
    }

    function handleListCommand(subcommand) {
        switch (subcommand) {
            case listCommands.CMD:
                addLines(list.cmd);
                return;
            case listCommands.PROG:
                addLines(list.prog);
                return;
            default:
                addError('Unknown list subcommand.');
                return;
        }
    }

    function handleScanCommand(subcommand) {
        const testId = subcommand.toLowerCase();

        if (usersHashes[testId]) {
            addLine(scan.userId(usersHashes[testId]));
        } else if (addresses[testId]) {
            const address = getScanAddressData(addresses[testId])
            return addLine(scan.address(address));
        } else if (users[testId]) {
            addLine(scan.userId(users[testId]));
        } else if (Object.values(users).filter(userData => userData.name.toLocaleLowerCase() === testId)[0]) {
            const userId = Object.values(users).filter(userData => userData.name.toLowerCase() === testId)[0].id;
            addLine(scan.userName(userId));
        } else {
            addError('Unknown scan object.');
        }
    }

    function handleRunCommand(parsedCommand) {
        const programName = parsedCommand[1].toLowerCase();
        const program = Object.values(programs).filter(program => program.name.toLowerCase() === programName)[0];

        if (!program) {
            addError('No such program');
            return;
        }

        if (addresses[parsedCommand[2]]) {
            runProgram(program, addresses[parsedCommand[2]]);
        } else {
            addError('No such address');
        }
    }

    function getScanAddressData(addressData) {
        // todo: random chance based on scanner level
        return addressData;
    }

    function runProgram(program, addressData) {
        console.log(connectedAddress, addressData.id)
        if (connectedAddress && connectedAddress !== addressData.id) {
            addError('<CANNOT RUN PROGRAM ON ANOTHER ADDRESS. USE “END” TO CLOSE CONNECTION FIRST>');
            return;
        }

        switch (program.type) {
            case programTypes.FIREWALL_BREACHER: {
                const firewallData = Object.values(firewalls).filter(firewall => firewall.name === addressData.firewall)[0];
                if (firewallData[BREACH_VALUES.SUCCESS].includes(program.name)) {
                    // SUCCESS
                    setConnectedAddress(addressData.id);
                    addLine('SUCCESS');
                } else if (firewallData[BREACH_VALUES.PARTIAL_SUCCESS].includes(program.name)) {
                    // PARTIAL SUCCESS
                    setConnectedAddress(addressData.id);
                    addLine('PARTIAL SUCCESS');
                } else if (firewallData[BREACH_VALUES.FAIL].includes(program.name)) {
                    // FAIL
                    addLine('FAIL');
                } else {
                    addLine('ERROR');
                }
            }
        }
    }

    return { executeCommand, };
}
