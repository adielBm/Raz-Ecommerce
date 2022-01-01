(function () {
  var pkp = document.createElement('script'); pkp.type = 'text/javascript'; pkp.async = true;
  pkp.src = 'https://pick-ups.co.il/api/ups-pickups.sdk.js?r=1.2';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pkp, s);
})();

document.body.addEventListener('pickups-after-choosen', (e, data) => {
  console.log("pickups-after-choosen catched event");
  console.log(JSON.stringify(e?.originalEvent?.detail));
  console.log(data);
})