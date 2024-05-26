import { OverlayService } from '../../index';

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
      OverlayService.closeModal();
    }
  }, 250);
  this.addLines([`ICE: CLEANER targeting successfully!`]);
  OverlayService.iceModal(`Warning: ICE CLEANER deployed`);
}

export function runKicker() {
  this.addLines([`ICE: KICKER targeting successfully!`]);
  OverlayService.iceModal(`Warning: ICE KICKER deployed`);
  this.addLines(['Connection to subnetwork was forcefully terminated']);
  this.disconnect();
  setTimeout(() => {
    OverlayService.closeModal();
  }, 4000);
}

export function run() {
  this.addLines([`ICE: KICKER targeting successfully!`]);
  OverlayService.iceModal(`Warning: ICE KICKER deployed`);
  this.addLines(['Connection to subnetwork was forcefully terminated']);
  this.disconnect();
  setTimeout(() => {
    OverlayService.closeModal();
  }, 4000);
}
