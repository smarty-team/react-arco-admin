export default (config) => {
  const { mock = process.env.NODE_ENV === 'development', setup } = config;
  console.log('mock configuration', mock);
  
  if (mock === false) return;
  setup();
};
