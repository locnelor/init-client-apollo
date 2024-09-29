import {
  Form,
  FormControl,
  FormField,
  FormFieldProps,
  FormProps,
  FormSubmit,
} from "@radix-ui/react-form";
import { FormEvent, forwardRef, useCallback } from "react";

type OmitUiFormProps = Omit<FormProps, "onSubmit">;
interface UiFormProps extends OmitUiFormProps {
  onSubmit?: (variables: FormData) => any;
}
const UiForm = forwardRef<HTMLFormElement, UiFormProps>(
  ({ children, onSubmit, ...rest }, ref) => {
    const onFormSubmit = useCallback(
      (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!onSubmit) return false;
        const formData = new FormData(e.currentTarget);
        onSubmit(formData);
        return false;
      },
      [onSubmit]
    );
    return (
      <Form {...rest} onSubmit={onFormSubmit} ref={ref}>
        {children}
      </Form>
    );
  }
);
UiForm.displayName = "UiForm";

export const UiFormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, ...rest }, ref) => {
    return (
      <FormField {...rest} ref={ref}>
        {children}
      </FormField>
    );
  }
);
UiFormField.displayName = "UiFormField";

export const UiFormControl = FormControl;
export const UiFormSubmit = FormSubmit;
export default UiForm;
