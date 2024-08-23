import { AppException } from './app.exception';
import { ValidationErrorRepresentation } from './validation-error';

export class AppInputException extends AppException {
  readonly validationErrors: ValidationErrorRepresentation[];

  constructor(...validationErrors: (ValidationErrorRepresentation | string)[]) {
    super(
      'Incorrect value supplied' +
        (validationErrors[0] instanceof ValidationErrorRepresentation
          ? '!, validate the input and try again!'
          : ` (${validationErrors[0]})`),
    );

    this.validationErrors = validationErrors.map((e) => {
      if (e instanceof ValidationErrorRepresentation) {
        return {
          description: e.description,
          field: e.field,
        };
      }

      return {
        description: e,
      };
    });
  }
}
