import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import { WarningIcon } from "@chakra-ui/icons";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const InputField: React.FC<IInputField> = ({
  label,
  size: undefined,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        variant="solid"
        bg="gray.600"
        {...field}
        {...props}
        id={field.name}
      />
      {error ? (
        <Flex alignItems="center" mt={4}>
          <WarningIcon fontSize={12} color="red.600" mr={2}/>
          <FormErrorMessage mt={0}>{error}</FormErrorMessage>
        </Flex>
      ) : null}
    </FormControl>
  );
};

export default InputField;
