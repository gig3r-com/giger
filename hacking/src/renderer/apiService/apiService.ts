import { AVAILABLE_PROGRAMS, SUBNETWORKS, USERS, } from './mockData';

class ApiService {
  constructor() {
  }

  getAvailablePrograms() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log({ action: 'getAvailablePrograms', data: AVAILABLE_PROGRAMS});
        resolve(AVAILABLE_PROGRAMS);
      }, 300);
    });
  }

  getUserIdByName(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = USERS.find((user) => user.username.toLowerCase() === name.toLowerCase());
        if (!user) reject('User not found');
        else resolve(user.id);
      }, 300);
    })}

  getSubnetworkByName(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const subnetwork = SUBNETWORKS.find((subnetwork) => subnetwork.name.toLowerCase() === name.toLowerCase());
        if (!subnetwork) reject('Subnetwork not found');
        else resolve(subnetwork);
      }, 300);
    })}

  getUserById(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = USERS.find((user) => user.id.toLowerCase() === userId.toLowerCase());
        if (!user) reject('User not found');
        else resolve(user);
      }, 300);
    })}
}

export default new ApiService();
