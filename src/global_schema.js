class Global {
  constructor(infected, deaths, recovered, date) {
    this.date = date;
    this.total_infected = infected;
    this.total_deaths = deaths;
    this.total_recovered = recovered;
    this.percent_infected = this.getPercentInfected();
    this.percent_recovered = this.getPercentRecovered();
    this.percent_deaths = this.getPercentDeaths();
    this.doubling_rate = null;
    this.mortality_rate = this.getMortalityRate();
    Global.daily_infection_totals.push(infected);

    if (Global.daily_infection_totals.length > 4) {
      this.doubling_rate = this.getDoublingTime(
        Global.daily_infection_totals,
        5
      );
    }
  }

  getMortalityRate() {
    let deaths = this.total_deaths;
    let infected = this.total_infected;
    let mortalityRate = parseFloat(((deaths * 100) / infected).toFixed(3));
    return mortalityRate;
  }
  getPercentInfected() {
    let population = Global.total_population;
    let infected = this.total_infected;
    let percentInfected = parseFloat(
      ((infected * 100) / population).toFixed(3)
    );
    return percentInfected;
  }
  getPercentRecovered() {
    let population = Global.total_population;
    let recovered = this.total_recovered;
    let percentRecovered = parseFloat(
      ((recovered * 100) / population).toFixed(3)
    );
    return percentRecovered;
  }
  getPercentDeaths() {
    let population = Global.total_population;
    let deaths = this.total_deaths;
    let percentDeaths = parseFloat(((deaths * 100) / population).toFixed(3));
    return percentDeaths;
  }
  getDoublingTime(data, period) {
    let infected = Global.daily_infection_totals;
    let N_t = infected[infected.length - 1];
    let N_0 = infected[infected.length - 5];
    let growth_rate = Math.log10(N_t / N_0) / period;
    let doubling_time = Math.log10(2) / growth_rate;
    doubling_time = parseFloat(doubling_time.toFixed(3));

    return doubling_time;
  }
}
// Satic fields
Global.total_population = 7794798739;
Global.daily_infection_totals = [];

module.exports = {
  Global
};