import dayjs from 'dayjs';

export const createTripInfoMainTemplate = (trips) => (`<div class="trip-info__main">
<h1 class="trip-info__title">${trips[0].destinationCity} — ${trips[7].destinationCity} — ${trips[trips.length-1].destinationCity}</h1>

<p class="trip-info__dates">${dayjs(trips[0].startDate).format('D MMM')}&nbsp;—&nbsp;${dayjs(trips[0].endDate).format('D')}</p>
</div>`);
