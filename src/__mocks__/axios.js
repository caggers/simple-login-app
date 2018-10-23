export default {
  post: jest.fn(() => {
    new Promise((resolve, reject) => {
       resolve({ });
    });
  })
};
