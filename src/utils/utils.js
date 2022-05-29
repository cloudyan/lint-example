export const sleep = (delay) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay, 'done');
  });

export const config = {
  env: 'dev',
};
