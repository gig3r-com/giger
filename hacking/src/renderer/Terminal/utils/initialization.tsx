type InitializationPropsTypes = {
  addLines: (lines: string[]) => void;
  removeLastLine: () => void;
  setInputDisabled: (value: boolean) => void;
  hackerName: string;
};

export default async function initialization({
  addLines,
  removeLastLine,
  setInputDisabled,
  hackerName,
}: InitializationPropsTypes): Promise<void> {
  setInputDisabled(true);
  await wait([`Cyberdeck Integration Chip Terminal Initialization`], 100);

  addLines(['']);
  await waitWithPercentTimer(`Initializing core modules...`, 5000);
  await wait(
    [
      `   - Loading neural network libraries... <span class="green-color">✔</span>`,
    ],
    1000,
  );
  await wait(
    [
      `   - Establishing quantum entanglement with cloud servers... <span class="green-color">✔</span>`,
    ],
    1000,
  );
  await wait(
    [
      `   - Calibrating hyperdimensional flux capacitors... <span class="green-color">✔</span>`,
    ],
    1000,
  );

  addLines(['']);
  await waitWithPercentTimer(`Verifying system integrity...`, 5000);
  await wait(
    [
      `   - Scanning for rogue AI entities... <span class="green-color">✔</span>`,
    ],
    1000,
  );
  await wait(
    [`   - Checking for time paradoxes... <span class="green-color">✔</span>`],
    1000,
  );
  await wait(
    [
      `   - Ensuring cat videos are properly cached... <span class="green-color">✔</span>`,
    ],
    1000,
  );

  addLines(['']);
  await waitWithPercentTimer(`Mounting virtual filesystems...`, 10000);
  await wait(
    [`   - /dev/thoughts... <span class="green-color">✔</span>`],
    1000,
  );
  await wait([`   - /mnt/dreams... <span class="green-color">✔</span>`], 1000);
  await wait(
    [`   - /usr/bin/reality... <span class="green-color">✔</span>`],
    1000,
  );

  addLines(['']);
  await waitWithPercentTimer(`Launching user interface...`, 5000);
  await wait(
    [
      `   - Rendering 3D holographic desktop... <span class="green-color">✔</span>`,
    ],
    1000,
  );
  await wait(
    [
      `   - Applying customizable neural themes... <span class="green-color">✔</span>`,
    ],
    1000,
  );
  await wait(
    [`   - Initializing empathy module... <span class="green-color">✔</span>`],
    1000,
  );

  addLines(['']);
  await waitWithPercentTimer(`Loading applications...`, 5000);
  await wait(
    [
      `   - Starting "QuantumCat" web browser... <span class="green-color">✔</span>`,
    ],
    1000,
  );
  await wait(
    [
      `   - Launching "CosmicMail" interdimensional email client... <span class="green-color">✔</span>`,
    ],
    1000,
  );
  await wait(
    [
      `   - Running "NeuraCode" AI-assisted code editor... <span class="green-color">✔</span>`,
    ],
    1000,
  );

  addLines(['']);
  await waitWithPercentTimer(`Initializing hardware drivers...`, 5000);
  await wait(
    [
      `   - Quantum GPU: Spinning up quantum superpositions... <span class="green-color">✔</span>`,
    ],
    1000,
  );
  await wait(
    [
      `   - Neural I/O: Connecting synapses to peripherals... <span class="green-color">✔</span>`,
    ],
    1000,
  );
  await wait(
    [
      `   - Graviton-powered coffee machine: Brewing espresso... <span class="green-color">✔</span>`,
    ],
    1000,
  );

  addLines(['']);
  await waitWithPercentTimer(`Performing sanity checks...`, 5000);
  await wait(
    [
      `  - User sanity: <span class="green-color">100%</span> (surprisingly high)`,
    ],
    1000,
  );
  await wait(
    [`  - AI sanity: 42% (standard deviation within acceptable limits)`],
    1000,
  );

  addLines(['']);
  addLines(['']);
  addLines([
    `Welcome ${hackerName}!`,
    `Shell commands are defined internally.`,
    '',
    `Type <span class="secondary-color">list cmd</span> to get a list of available commands`,
    `Type <span class="secondary-color">list prog</span> to get a list of available programs`,
    `Type <span class="secondary-color">list cmd</span> to read documentation`,
  ]);
  addLines(['']);

  setInputDisabled(false);

  function wait(lines: string[], time: number, callback?: any): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        addLines(lines);
        callback && callback();
        resolve();
      }, time);
    });
  }

  function waitWithPercentTimer(stepLine: string, time: number): Promise<void> {
    return new Promise<void>((resolve) => {
      addLines([`${stepLine}`]);
      const initialTime = time;
      const interval = setInterval(() => {
        const randAdd = getRandomInt(100) + 1;
        time -= randAdd;
        if (time < 0) time = 0;
        removeLastLine();
        const percent = Math.floor((1 - time / initialTime) * 100);
        addLines([
          `${stepLine} <span className="green-color">${percent}%</span>`,
        ]);
        time || (clearInterval(interval), endCallback(resolve));
      }, 10);

      return interval;
    });

    function endCallback(resolve) {
      console.log('done');
      resolve();
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}
