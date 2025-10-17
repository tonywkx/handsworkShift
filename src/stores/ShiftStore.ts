import { makeAutoObservable, action, runInAction } from 'mobx';
import axios from 'axios';
import { Shift, Location } from '../types/shift';

//по моей локации не было смен, по тестовой есть https://mobile.handswork.pro/api/shifts/map-list-unauthorized?latitude=45.039268&longitude=38.987221

class ShiftStore {
  shifts: Shift[] = [];
  selectedShift: Shift | null = null;
  loading = false;
  error: string | null = null;
  userLocation: Location | null = null;

  constructor() {
    makeAutoObservable(this, {
      fetchShifts: action,
    });
  }

  setUserLocation = action((location: Location) => {
    this.userLocation = location;
  });

  async fetchShifts(location: Location) {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    console.log(location, 'in store');

    try {
      const response = await axios.get(
        `https://mobile.handswork.pro/api/shifts/map-list-unauthorized?latitude=${location.latitude}&longitude=${location.longitude}`
      );

      console.log(response.data.data, 'shift data');

      runInAction(() => {
        this.shifts = response.data.data || [];
      });
    } catch (err) {
      runInAction(() => {
        this.error = 'Failed to fetch shifts';
      });
      console.error(err);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  selectShift = action((shift: Shift) => {
    this.selectedShift = shift;
  });

  clearSelection = action(() => {
    this.selectedShift = null;
  });
}

export default new ShiftStore();