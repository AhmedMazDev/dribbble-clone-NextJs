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
  toast,
  useToast,
} from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import AuthPageLayout from "../components/Layout/AuthPageLayout";
import { auth } from "../firebase/firebaseConfig";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_ERRORS } from "../firebase/error";

const signup: React.FC = () => {
  return (
    <AuthPageLayout
      form={<SignUpForm />}
      navLinkText="Sign In"
      navLinkURL="signin"
      navText="Already a member?"
      sideImage="signupCover.png"
      title="Welcome to Inspiry"
    />
  );
};
export default signup;

const schema = Joi.object({
  username: Joi.string().required().alphanum().min(3).max(15).label("Username"),
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net", "fr", "org"] } })
    .required()
    .label("Email"),
  password: Joi.string().min(6).max(64).required().label("Password"),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
});

function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(user);
      toast({
        status: "success",
        title: "Account Created",
        description:
          "account creation was successful you will be redirected to home page",
        isClosable: true,
      });
    } catch (e: any) {
      console.log("signup form error", e.message);
      console.log(FIREBASE_ERRORS[e.message as keyof typeof FIREBASE_ERRORS]);
      toast({
        status: "error",
        title: "Error",
        description: FIREBASE_ERRORS[e.message as keyof typeof FIREBASE_ERRORS],
        isClosable: true,
        duration: 3000,
      });
    }
    setIsLoading(false);
  });

  return (
    <>
      <form>
        <FormControl isInvalid={errors.username}>
          <FormLabel mt={8}>Username : </FormLabel>
          <InputGroup
            width={{
              base: "50%",
              md: "50%",
              lg: "30%",
            }}
          >
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={BiUser} w={6} h={6} />}
            />
            <Input
              id="username"
              type="text"
              placeholder="username"
              variant="input"
              {...register("username")}
              border={errors.username ? "1px solid red" : "default"}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>
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
        <FormControl isInvalid={errors.password}>
          <FormLabel mt={8}>Password : </FormLabel>
          <InputGroup
            width={{
              base: "50%",
              md: "50%",
              lg: "30%",
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
        <FormControl isInvalid={errors.confirmPassword}>
          <FormLabel mt={8}>Confirm Password : </FormLabel>
          <InputGroup
            width={{
              base: "50%",
              md: "50%",
              lg: "30%",
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
              id="confirmPassword"
              {...register("confirmPassword")}
              border={errors.confirmPassword ? "1px solid red" : "default"}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.confirmPassword && errors.confirmPassword.message}
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
        <Button
          mr={4}
          mb={4}
          maxWidth="220px"
          onClick={onSubmit}
          isLoading={isLoading}
        >
          Create Account
        </Button>
        <Button
          variant="white"
          leftIcon={<Icon as={FcGoogle} h={6} w={6} />}
          maxWidth="220px"
        >
          Signup With Google
        </Button>
      </Flex>
    </>
  );
}
