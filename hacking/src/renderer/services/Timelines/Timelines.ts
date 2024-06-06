import moment from 'moment';
import { setInterval as setIntervalPromise } from 'node:timers/promises';
import Console from '../Console';

type TimelineOptionsType = {
  blockInput: boolean;
  oldPrefix?: string;
  endCallback?: () => void;
};

export default class Timelines {
  public timelines: {
    (id: string): {
      interval: typeof setIntervalPromise;
      options: TimelineOptionsType;
    };
  } = {};

  start(id: string, seconds: number, options?: TimelineOptionsType) {
    const endTime = moment().add(seconds, 'seconds');

    if (options?.blockInput) {
      Console.setInputLoading(true);
      options.oldPrefix = Console.inputPrefix;
    }

    const interval = setInterval(() => {
      const timeLeft = moment().diff(endTime) * -1;
      const secondsLeft = Math.floor(timeLeft / 1000);

      if (options?.blockInput) {
        Console.setInputPrefix(`Time left: ${secondsLeft}s`);
      }

      if (timeLeft <= 0) {
        this.stop(id);
      }
    }, 100);

    this.timelines[id] = {
      interval,
      options,
    };
  }

  stop(id: string) {
    const timeline = this.timelines[id];
    if (!timeline) return;
    const { interval, options = {} } = timeline;
    clearInterval(interval);
    if (options.blockInput) {
      Console.setInputLoading(false);
      Console.setInputPrefix(options.oldPrefix);
    }
    if (options.endCallback) options.endCallback();
  }
}
