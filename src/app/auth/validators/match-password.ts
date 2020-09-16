import { Injectable } from '@angular/core';
import { Validator, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MatchPassword implements Validator {
  validate(formGroup: FormGroup): null | { passwordsDontMatch: boolean } {
    const { password, passwordConfirmation } = formGroup.value;

    if (password === passwordConfirmation) {
      return null;
    } else {
      return { passwordsDontMatch: true };
    }
  }
}
