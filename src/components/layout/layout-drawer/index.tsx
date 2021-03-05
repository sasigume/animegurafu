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
} from "@chakra-ui/react"

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
              <Box mb={8}>
              </Box>

              <Divider mb={8} />

              <Stack direction="column" spacing={6} mb={6}>
                <Link isExternal href="https://sasigu.me">Creator</Link>
              </Stack>


            </DrawerHeader>
            <DrawerBody overflow-y="scroll">
              {children}
            </DrawerBody>
            <DrawerFooter>

            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}