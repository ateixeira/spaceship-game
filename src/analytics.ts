class Analytics {
  // Options
  private decimalPlaces: number = 2;
  private updateEachSecond: number = 1;

  // Cache values
  private decimalPlacesRatio: number = Math.pow(10, this.decimalPlaces);
  private timeMeasurements: number[] = [];

  // Final output
  private fps: number = 0;

  public tick() {
    this.timeMeasurements.push(performance.now());

    const msPassed =
      this.timeMeasurements[this.timeMeasurements.length - 1] -
      this.timeMeasurements[0];

    if (msPassed >= this.updateEachSecond * 1000) {
      this.fps =
        Math.round(
          (this.timeMeasurements.length / msPassed) *
            1000 *
            this.decimalPlacesRatio
        ) / this.decimalPlacesRatio;
      this.timeMeasurements = [];
    }

    return {
      fps: this.fps,
    };
  }
}

export default Analytics;
