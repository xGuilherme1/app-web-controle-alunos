import { dateFormat } from './date.helper';
import {type Application} from 'express';
import {type ValidationErrorsViewModel, validationErrorsHelper} from 'nest-validation-view';

type ViewHelpers = {
    dateFormat: typeof dateFormat;
    validationErrors: (
        errors: ValidationErrorsViewModel | null | undefined,
    ) => ValidationErrorsViewModel;
};

export const registerHelpers = (app: Application): void => {
    const helpers: ViewHelpers = {
        dateFormat,
        validationErrors: validationErrorsHelper,
    };

    Object.assign(app.locals, helpers);
};