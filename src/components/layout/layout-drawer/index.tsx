import { ReactNode, useRef } from 'react'
import {
  useColorMode,
  useDisclosure,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Center,
  Divider,
  Link,
  VStack,
} from "@chakra-ui/react"
import { DarkModeSwitch } from '@/components/common/DarkModeSwitch'
import LinkChakra from '@/components/common/link-chakra'
import { CONST_REPO_URL } from '@/lib/constants'

interface Props {
  children: ReactNode
}

export default function LayoutDrawer({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  return (
    <>
      <Button ref={btnRef} colorScheme="green" onClick={onOpen} position="fixed" top={5} right={5}>
        MENU
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        aria-label="ドロワーメニュー(右)"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader mt={12} justifyContent="center">
              <VStack spacing={6} mb={6}>
                <LinkChakra isExternal href="https://jikan.moe/" flexGrow={1} mx={2}>
                  <Button width="100%" colorScheme="green">
                    Jikan API
      </Button>
                </LinkChakra>

                <LinkChakra
                  isExternal
                  href={CONST_REPO_URL}
                >
                  <Button width="100%" variant="solid" colorScheme="blue">
                    View Repo
      </Button>
                </LinkChakra>
              </VStack>

            </DrawerHeader>

            <DrawerBody overflow-y="scroll">
              <Divider mb={8} />
              {children}
            </DrawerBody>
            <DrawerFooter>
              <Box mb={8}>
                <DarkModeSwitch />
              </Box>

            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}