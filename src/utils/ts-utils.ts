export const sleep = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay, 'done');
  });

export const config = {
  env: 'dev',
};
