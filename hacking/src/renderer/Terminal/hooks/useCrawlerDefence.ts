import { ApiService } from '../../services';

const breachTimestamps = ['1710496800'];
export default function useCrawlerDefence() {
  const loadCrawler = async () => {
    try {
      await ApiService.getCrawler();
    } catch (error) {
      console.error(error);
    }
  };
}
