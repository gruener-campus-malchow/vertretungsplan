var user = parameters['user'];
const REFRESH_DELAY = 5 * 60 * 1000;

if (user === 'foyer') {
  redirect(urlPlanhtml + getUrlArguments(), REFRESH_DELAY);
}
