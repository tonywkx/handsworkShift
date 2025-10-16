import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { Shift, Location } from '../types/shift';

class ShiftStore {
  shifts: Shift[] = [];
  selectedShift: Shift | null = null;
  loading = false;
  error: string | null = null;
  userLocation: Location | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUserLocation(location: Location) {
    this.userLocation = location;
  }

  async fetchShifts(location: Location) {
    this.loading = true;
    this.error = null;
    try {
      const response = await axios.get(
        `https://mobile.handswork.pro/api/shifts/map-list-unauthorized?latitude=${location.latitude}&longitude=${location.longitude}`
      );
      this.shifts = response.data || [];
    } catch (err) {
      this.error = 'Failed to fetch shifts';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  selectShift(shift: Shift) {
    this.selectedShift = shift;
  }

  clearSelection() {
    this.selectedShift = null;
  }
}

export default new ShiftStore();