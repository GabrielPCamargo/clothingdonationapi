/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from './IUser';
import { UserValidation } from './UserValidation';

describe('UserValidation', () => {
  const userValidation = new UserValidation();
  it('should validate user', () => {
    const data = {
      name: 'john',
      email: 'john@example.com',
      password: 'password',
      type: 'person',
    };

    let response;

    try {
      response = userValidation.validate(data);
    } catch (err) {
      console.log(err);
    }

    expect(response).toBe(true);
  });

  it('should not validate user with property undefined', () => {
    const data = {
      name: 'john',
      email: 'john@example.com',
      password: 'password',
      type: undefined,
    } as unknown as IUser;

    let response;

    try {
      response = userValidation.validate(data);
    } catch (err: any) {
      expect(err.message).toContain(
        'User requires name, email, password and type'
      );
    }

    expect(response).toBe(undefined);
  });

  it('should not validate user with the minimum length and invalid email', () => {
    const data = {
      name: 'joh',
      email: 'john.com',
      password: 'passwo',
      type: 'teste',
    } as unknown as IUser;

    let response;

    try {
      response = userValidation.validate(data);
    } catch (err: any) {
      expect(err.message).toContain(
        'name must have between 4 and 255 characters'
      );

      expect(err.message).toContain('Invalid email');
      expect(err.message).toContain(
        'password must have between 8 and 32 characters'
      );
    }

    expect(response).toBe(undefined);
  });

  it('should not validate user with the maximum length', () => {
    const data = {
      name: 'XElcExgbfzEMODKNIjNIBeWkyQXdjiEFqIttDWEFgcDtbRmLFQtXGqwtwvuamKXpHqmuNmWIQgxOyjDsRhGJNJpuxADlUsQCgHzrffvOUOiUhMBxhwuEyFKMdGbobjbeKkoDMapNvRtLEgooaVUIwHCBAhGrKvMQpXMjmVEMvTYJsiLgVWJFrOHvXjHMQMuhxmEYaYmhgGNsWjUEsycbnAPCdakHdfbQzTnaJnBnzaptsOSiwMzrUGrvZjiqJHPzpSAjhTOfWCqfXNAIotZXIBXnVVDtGqkcZjRxxGNxgiDCkGzUwFkzkQaOZyYZydVhKzmjerVNWIdzAPMHEYaeGcDnghdIMhPiSfjIzYsntjVZKUHSkjEWIYvimnMPuiPWQEeSuy',
      email: 'teste@gmail.com',
      password: 'passwopasswopasswopasswopapasswopasswosswo',
      type: 'teste',
    } as unknown as IUser;

    let response;

    try {
      response = userValidation.validate(data);
    } catch (err: any) {
      expect(err.message).toContain(
        'name must have between 4 and 255 characters'
      );
      expect(err.message).toContain(
        'password must have between 8 and 32 characters'
      );
    }

    expect(response).toBe(undefined);
  });
});
