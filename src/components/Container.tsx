import { Flex, FlexProps } from "@chakra-ui/core";

export const Container = (props: FlexProps) => {
  return (
    <Flex
      height="100vh"
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg="gray.800"
      color="white"
      {...props}
    />
  );
};
