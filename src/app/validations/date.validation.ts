import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateFormat(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.value) {
      return null;
    }

    const isValid = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(control.value);

    return isValid ? null : { dateFormat: true };
  };
}
