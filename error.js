process.on('uncaughtException', (err) => {
    console.log(`[Error] `.bgRed + `An Exception error occured: ${err}`.bgRed);
  });
  
  process.on('unhandledRejection', (err) => {
    console.log(`[Error] `.bgRed + `An Rejection error occured ${err}`.bgRed);
  });
  