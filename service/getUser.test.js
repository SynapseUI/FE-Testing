import { getUser } from './getUser';

const user = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  }
];

describe('get user request', () => {
  it('should return status code 200 and a defined body as response', async () => {
    // Mock API
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        status: 200,
        data: user,
      }),
    }));

    const result = await getUser();

    expect(result.status).toBe(200);
    expect(result.data).toBe(user);
  });

  it('should catch error', async () => {
    // Mock API
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        status: 500,
      }),
    }));

    const result = await getUser();

    expect(result.status).toBe(500);
    expect(result.data).not.toBeDefined();
  });
});
