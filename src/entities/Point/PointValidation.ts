import { IPoint } from './IPoint';

export class PointValidation implements IPoint {
  public readonly _id: string = 'teste';
  public name: string;
  public description: string;
  public coordinates: { lat: number; lng: number };
  public user: {
    name: string;
    email: string;
    number: number;
  };
  public type: string;
  public number: string;
  private errors: string[] = [];
  private types: string[] = ['institution', 'request', 'donation'];

  validate(props: IPoint) {
    Object.assign(this, props);
    if (Object.values(this).includes(undefined)) {
      throw new Error(
        'Point requires a name, description, coordinates, user, number and a type'
      );
    }

    if (this.name.length < 4 || this.name.length > 255) {
      this.errors.push('Name must have between 4 and 255 characters');
    }

    if (this.description.length < 4 || this.description.length > 255) {
      this.errors.push('Description must have between 4 and 255 characters');
    }

    if (!(Object.keys(this.coordinates).length >= 2)) {
      this.errors.push('Coordinates is required');
    }

    if (!(Object.keys(this.user).length >= 2)) {
      this.errors.push('User is required');
    }

    if (!this.types.includes(this.type.toLowerCase())) {
      this.errors.push('Type must be institution, request or donation');
    }

    if (this.errors.length > 0) {
      throw { name: 'Error', message: this.errors };
    }

    return true;
  }
}
