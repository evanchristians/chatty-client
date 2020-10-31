import { Box, Button, Flex } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import InputField from "./InputField";

const JoinForm = () => {
  const router = useRouter();
  const joinSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("name is required to join a room"),
    room: Yup.string().required("a room name is required to start chatting"),
  });

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      color="white"
      padding={12}
      background="gray.700"
      borderRadius={16}
    >
      <Formik
        initialValues={{
          room: "",
          name: "",
        }}
        validationSchema={joinSchema}
        onSubmit={(values) => {
          router.push({
            pathname: "/chat/[room]/[name]",
            query: { ...values },
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex minWidth={400} flexDir="column">
              <Box mb={12}>
                <InputField placeholder="name" label="Name" name="name" />
              </Box>
              <Box mb={12}>
                <InputField placeholder="room" label="Room" name="room" />
              </Box>
              <Button
                size="lg"
                colorScheme="orange"
                type="submit"
                isLoading={isSubmitting}
              >
                Join
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default JoinForm;
