self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'פפ טוק', {
      body: data.body || 'יש לך תזכורת!',
      icon: '/logo192.png',
      dir: 'rtl',
      lang: 'he'
    })
  );
});
