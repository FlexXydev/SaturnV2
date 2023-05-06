process.on('uncaughtException', (err) => {
    console.log(`[Error Handler] `.bgRed + `An Exception error occured: ${err}`.bgRed);
  });
  
  process.on('unhandledRejection', (err) => {
    console.log(`[Error Handler] `.bgRed + `An Rejection error occured ${err}`.bgRed);
  });
  