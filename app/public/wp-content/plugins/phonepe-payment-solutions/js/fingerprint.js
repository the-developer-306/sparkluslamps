const fpPromise = FingerprintJS.load();
fpPromise
    .then(fp => fp.get())
    .then(result => {
        const visitorId = result.visitorId;
        document.cookie="browserFingerprint="+visitorId;
})
.catch(error => console.log(error))
