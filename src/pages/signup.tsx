import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { FiUsers } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import AuthPageLayout from "../components/Layout/AuthPageLayout";
import { UserContext } from "../context/userContext";
import { FIREBASE_ERRORS } from "../firebase/error";
import {
  createUserWithEmail,
  createUserWithGoogle,
  isUserNameExists,
} from "../firebase/helpers/authFunctions";

const Signup: React.FC = () => {
  const router = useRouter();
  const userData = useContext(UserContext);

  useEffect(() => {
    if (userData.user) {
      router.push("/");
    }
  }, [userData.user]);
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
export default Signup;

const schema = Joi.object({
  username: Joi.string().required().alphanum().min(3).max(15).label("Username"),
  name: Joi.string().required().alphanum().min(5).max(20).label("Name"),
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net", "fr", "org"] } })
    .required()
    .label("Email"),
  password: Joi.string().min(6).max(64).required().label("Password"),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
});

function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [userNameExist, setUserNameExist] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onCreateWithEmail = handleSubmit(async (data) => {
    if (userNameExist) return;
    setIsLoading(true);
    try {
      await createUserWithEmail(
        data.username,
        data.email,
        data.password,
        data.name
      );
      toast({
        status: "success",
        title: "Account Created",
        description:
          "account creation was successful you will be redirected soon to home page",
        isClosable: true,
        position: "top",
        duration: 3000,
      });
      router.push("/");
    } catch (e: any) {
      console.log("signup form error", e.message);
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

  const onCreateWithGoogle = async () => {
    setIsLoading(true);
    try {
      await createUserWithGoogle();
      toast({
        status: "success",
        title: "Account Created",
        description:
          "account creation was successful you will be redirected soon to home page",
        isClosable: true,
        position: "top",
        duration: 3000,
      });
      router.push("/");
    } catch (e: any) {
      console.log("create with google error", e.message);
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

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (errors.username || username.length < 3) return;
      setIsLoading(true);
      try {
        const isExist = await isUserNameExists(username);
        setUserNameExist(isExist);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }, 500),
    []
  );

  useEffect(() => {
    checkUsername(username);
  }, [username]);

  return (
    <>
      <form>
        <Flex
          mt={{ base: 0, md: 8 }}
          width={{
            base: "100%",
            md: "100%",
            lg: "80%",
          }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <FormControl isInvalid={errors.username} mr={4}>
            <FormLabel>Username : </FormLabel>
            <InputGroup>
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
                border={
                  errors.username || userNameExist ? "1px solid red" : "default"
                }
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
            {!errors.username && username.length < 3 && (
              <FormHelperText>username must be unique</FormHelperText>
            )}
            {!errors.username && username.length >= 3 && (
              <FormHelperText>
                {userNameExist ? "username already taken" : "Username is valid"}
              </FormHelperText>
            )}
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.name} mt={{ base: 8, md: 0 }}>
            <FormLabel>Name : </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FiUsers} w={6} h={6} />}
              />
              <Input
                id="name"
                type="text"
                placeholder="name"
                variant="input"
                {...register("name")}
                border={errors.name ? "1px solid red" : "default"}
              />
            </InputGroup>
            {!errors.name && (
              <FormHelperText>public display name</FormHelperText>
            )}
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
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
        <FormControl isInvalid={errors.confirmPassword}>
          <FormLabel mt={8}>Confirm Password : </FormLabel>
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
          onClick={onCreateWithEmail}
          isLoading={isLoading}
        >
          Create Account
        </Button>
        <Button
          variant="white"
          leftIcon={<Icon as={FcGoogle} h={6} w={6} />}
          maxWidth="220px"
          onClick={onCreateWithGoogle}
          isLoading={isLoading}
        >
          Signup With Google
        </Button>
      </Flex>
    </>
  );
}
