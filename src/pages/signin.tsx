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
  useToast,
} from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import AuthPageLayout from "../components/Layout/AuthPageLayout";
import { UserContext } from "../context/userContext";
import { FIREBASE_ERRORS } from "../firebase/error";
import {
  signUserInWithEmail,
  signUserWithGoogle,
} from "../firebase/helpers/authFunctions";

const Signin: React.FC = () => {
  const router = useRouter();
  const userData = useContext(UserContext);

  useEffect(() => {
    if (userData.user) {
      router.push("/");
    }
  }, [userData.user]);

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
export default Signin;

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net", "fr", "org"] } })
    .required()
    .label("Email"),
  password: Joi.string().min(6).max(64).required().label("Password"),
});

const SignInForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
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
      await signUserInWithEmail(data.email, data.password);
      toast({
        status: "success",
        title: "Signed In Successful",
        description:
          "You have successfully signed in, you will be redirected soon",
        isClosable: true,
        position: "top",
        duration: 3000,
      });
      router.push("/");
    } catch (e: any) {
      console.log("signin error", e);
      toast({
        status: "error",
        title: "Error",
        description: FIREBASE_ERRORS[e.message as keyof typeof FIREBASE_ERRORS],
        isClosable: true,
        duration: 3000,
        position: "top",
      });
    }
    setIsLoading(false);
  });

  const onSignInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signUserWithGoogle();
      toast({
        status: "success",
        title: "Signed In Successful",
        description:
          "You have successfully signed in, you will be redirected soon",
        isClosable: true,
        position: "top",
        duration: 3000,
      });
      router.push("/");
    } catch (e: any) {
      console.log("signin error", e);
      toast({
        status: "error",
        title: "Error",
        description: FIREBASE_ERRORS[e.message as keyof typeof FIREBASE_ERRORS],
        isClosable: true,
        duration: 3000,
        position: "top",
      });
    }
    setIsLoading(false);
  };

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
        <Button
          mr={4}
          mb={4}
          maxWidth="220px"
          onClick={onSubmit}
          isLoading={isLoading}
        >
          Sign In
        </Button>
        <Button
          variant="white"
          leftIcon={<Icon as={FcGoogle} h={6} w={6} />}
          maxWidth="220px"
          onClick={onSignInWithGoogle}
          isLoading={isLoading}
        >
          Signin With Google
        </Button>
      </Flex>
    </>
  );
};
