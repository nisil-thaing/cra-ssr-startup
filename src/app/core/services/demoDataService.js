import axiosService from './axiosService';

class DemoDataService {
  #baseUrl = 'test-data.json';

  constructor () {
    this.fetchDemoData = this.fetchDemoData.bind(this);
  }

  fetchDemoData () {
    return axiosService.get(this.#baseUrl)
      .then(res => res.data.data)
      .catch(err => {
        throw new Error(err);
      });

  }
}

export default DemoDataService;