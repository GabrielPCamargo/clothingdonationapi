/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPoint } from './IPoint';
import { PointValidation } from './PointValidation';
describe('PointValidation', () => {
  let pointValidation: PointValidation;
  beforeEach(() => {
    pointValidation = new PointValidation();
  });

  it('should validate request', () => {
    const data = {
      name: 'testes',
      description: 'testset',
      coordinates: {
        lat: 1,
        lng: 4,
      },
      user: {
        name: 'tste',
        email: 'email@gmail.com',
      },
      type: 'request',
      number: '5209250920',
    };

    const isValid = pointValidation.validate(data);

    expect(isValid).toBeTruthy();
    expect(() => pointValidation.validate(data)).not.toThrow();
  });

  it('should validate institution', () => {
    const data = {
      name: 'testes',
      description: 'testset',
      coordinates: {
        lat: 1,
        lng: 4,
      },
      user: {
        name: 'tste',
        email: 'email@gmail.com',
      },
      type: 'institution',
      number: '5209250920',
    };

    const isValid = pointValidation.validate(data);

    expect(isValid).toBeTruthy();
    expect(() => pointValidation.validate(data)).not.toThrow();
  });

  it('should validate donation', () => {
    const data = {
      name: 'testes',
      description: 'testset',
      coordinates: {
        lat: 1,
        lng: 4,
      },
      user: {
        name: 'tste',
        email: 'email@gmail.com',
      },
      type: 'donation',
      number: '5209250920',
    };

    const isValid = pointValidation.validate(data);

    expect(isValid).toBeTruthy();
    expect(() => pointValidation.validate(data)).not.toThrow();
  });

  it('should not validate donation with property undefined', () => {
    const data = {
      name: undefined,
      description: 'testset',
      coordinates: {
        lat: 1,
        lng: 4,
      },
      user: {
        name: 'tste',
        email: 'email@gmail.com',
      },
      type: 'donation',
      number: '5209250920',
    } as unknown as IPoint;

    let isValid;
    try {
      isValid = pointValidation.validate(data);
    } catch (err: any) {
      expect(err.message).toContain(
        'Point requires a name, description, coordinates, user, number and a type'
      );
    }

    expect(isValid).toBe(undefined);
  });

  it('should not validate name and description less than 4', () => {
    const data = {
      name: 'tes',
      description: 'tes',
      coordinates: {
        lat: 1,
        lng: 4,
      },
      user: {
        name: 'tste',
        email: 'email@gmail.com',
      },
      type: 'request',
      number: '5209250920',
    };

    try {
      const isValid = pointValidation.validate(data);
      expect(isValid).toBeFalsy();
    } catch (err: any) {
      expect(err.message).toContain(
        'Name must have between 4 and 255 characters'
      );
      expect(err.message).toContain(
        'Description must have between 4 and 255 characters'
      );
    }
  });

  it('should not validate name and description more than 255', () => {
    const data = {
      name: 'XElcExgbfzEMODKNIjNIBeWkyQXdjiEFqIttDWEFgcDtbRmLFQtXGqwtwvuamKXpHqmuNmWIQgxOyjDsRhGJNJpuxADlUsQCgHzrffvOUOiUhMBxhwuEyFKMdGbobjbeKkoDMapNvRtLEgooaVUIwHCBAhGrKvMQpXMjmVEMvTYJsiLgVWJFrOHvXjHMQMuhxmEYaYmhgGNsWjUEsycbnAPCdakHdfbQzTnaJnBnzaptsOSiwMzrUGrvZjiqJHPzpSAjhTOfWCqfXNAIotZXIBXnVVDtGqkcZjRxxGNxgiDCkGzUwFkzkQaOZyYZydVhKzmjerVNWIdzAPMHEYaeGcDnghdIMhPiSfjIzYsntjVZKUHSkjEWIYvimnMPuiPWQEeSuy',
      description:
        'XElcExgbfzEMODKNIjNIBeWkyQXdjiEFqIttDWEFgcDtbRmLFQtXGqwtwvuamKXpHqmuNmWIQgxOyjDsRhGJNJpuxADlUsQCgHzrffvOUOiUhMBxhwuEyFKMdGbobjbeKkoDMapNvRtLEgooaVUIwHCBAhGrKvMQpXMjmVEMvTYJsiLgVWJFrOHvXjHMQMuhxmEYaYmhgGNsWjUEsycbnAPCdakHdfbQzTnaJnBnzaptsOSiwMzrUGrvZjiqJHPzpSAjhTOfWCqfXNAIotZXIBXnVVDtGqkcZjRxxGNxgiDCkGzUwFkzkQaOZyYZydVhKzmjerVNWIdzAPMHEYaeGcDnghdIMhPiSfjIzYsntjVZKUHSkjEWIYvimnMPuiPWQEeSuy',
      coordinates: {},
      user: {},
      type: 'test',
      number: '5209250920',
    } as IPoint;

    try {
      const isValid = pointValidation.validate(data);
      expect(isValid).toBeFalsy();
    } catch (err: any) {
      expect(err.message).toContain(
        'Name must have between 4 and 255 characters'
      );
      expect(err.message).toContain(
        'Description must have between 4 and 255 characters'
      );
      expect(err.message).toContain('Coordinates is required');
      expect(err.message).toContain('User is required');
      expect(err.message).toContain(
        'Type must be institution, request or donation'
      );
    }
  });
});
