process.on('uncaughtException', (err) => {
      console.log(`🛑 | Une erreur de type Execption est survenue: ${err}`);
});

process.on('unhandledRejection', (err) => {
      console.log(`🛑 | Une erreur de type Rejection est survenue: ${err}`);
});