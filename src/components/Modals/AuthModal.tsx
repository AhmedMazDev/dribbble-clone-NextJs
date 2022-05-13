import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext/appContext";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const { showLoginModal, setShowLoginModal } = useContext(AppContext);
  const router = useRouter();
  return (
    <>
      <Modal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
        }}
        size={"sm"}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mb={8}>Restricted Content</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <Text>Login or Sign Up to access this features</Text>
          </ModalBody>

          <ModalFooter alignItems="center" justifyContent="center">
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setShowLoginModal(false);
                router.push("/signin");
              }}
            >
              Login
            </Button>
            <Button
              variant="cancel"
              onClick={() => {
                setShowLoginModal(false);
                router.push("/signup");
              }}
            >
              Signup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
