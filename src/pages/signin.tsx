import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import Joi from "joi";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import { joiResolver } from "@hookform/resolvers/joi";

import AuthPageLayout from "../components/Layout/AuthPageLayout";

const signin: React.FC = () => {
  return (
    <AuthPageLayout
      title="Welcome Back to Inspiry"
      form={<SignInForm />}
      navText="Not a member yet ?"
      navLinkText="Sign Up"
      navLinkURL="signup"
      sideImage="signinCover.png"
    />
  );
};
export default signin;

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net", "fr", "org"] } })
    .required()
    .label("Email"),
  password: Joi.string().min(6).max(64).required().label("Password"),
});

const SignInForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {});

  return (
    <>
      <form>
        <FormControl isInvalid={errors.email}>
          <FormLabel mt={8}>Email : </FormLabel>
          <InputGroup
            width={{
              md: "100%",
              lg: "80%",
            }}
          >
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={AiOutlineMail} w={6} h={6} />}
            />
            <Input
              type="email"
              placeholder="abc123@email.com"
              variant="input"
              id="email"
              {...register("email")}
              border={errors.email ? "1px solid red" : "default"}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.email}>
          <FormLabel mt={8}>Password : </FormLabel>
          <InputGroup
            width={{
              md: "100%",
              lg: "80%",
            }}
          >
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={RiLockPasswordLine} w={6} h={6} />}
            />
            <Input
              type="password"
              placeholder="******"
              variant="input"
              id="password"
              {...register("password")}
              border={errors.password ? "1px solid red" : "default"}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
      </form>
      <Flex
        direction={{
          base: "column",
          md: "row",
        }}
        my={8}
      >
        <Button mr={4} mb={4} maxWidth="220px" onClick={onSubmit}>
          Sign In
        </Button>
        <Button
          variant="white"
          leftIcon={<Icon as={FcGoogle} h={6} w={6} />}
          maxWidth="220px"
        >
          Signin With Google
        </Button>
      </Flex>
    </>
  );
};
