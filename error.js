process.on('uncaughtException', (err) => { 

  console.log(`[Error Handler] `.bgRed + `An Exception error occured: ${err}`.bgRed);
 
 fetch('https://ntfy.sh/SaturnDev', {
 method: 'POST',
 body: `[Error Handler] An Exception error occured: ${err}`,
 headers: { 'Priority': '5' }
})

}); 

 

process.on('unhandledRejection', (err) => { 
  console.log(`[Error Handler] `.bgRed + `An Rejection error occured ${err}`.bgRed); 
fetch('https://ntfy.sh/SaturnDev', {
method: 'POST',
body: `[Error Handler] An Rejection error occured: ${err}`,
headers: { 'Priority': '5' }
})

}); 


