import Overlay from '../../Overlay';

export function runCleaner() {
  this.cleanerInterval = setInterval(() => {
    this.removeLastLine();
    this.removeLastLine();
    this.addLines([
      '############################################# ICE: CLEANER RUNNING #############################################',
    ]);
    if (this.lines?.length <= 0) {
      console.log('END CLEANER');
      this.removeLastLine();
      clearInterval(this.cleanerInterval);
      Overlay.closeModal();
    }
  }, 250);
  this.addLines([`ICE: CLEANER targeting successfully!`]);
  Overlay.iceModal(`Warning: ICE CLEANER deployed`);
}

export function runKicker() {
  this.addLines([`ICE: KICKER targeting successfully!`]);
  Overlay.iceModal(`Warning: ICE KICKER deployed`);
  this.addLines(['Connection to subnetwork was forcefully terminated']);
  this.disconnect();
  setTimeout(() => {
    Overlay.closeModal();
  }, 4000);
}

export function run() {
  this.addLines([`ICE: KICKER targeting successfully!`]);
  Overlay.iceModal(`Warning: ICE KICKER deployed`);
  this.addLines(['Connection to subnetwork was forcefully terminated']);
  this.disconnect();
  setTimeout(() => {
    Overlay.closeModal();
  }, 4000);
}
