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
import { DarkModeSwitch } from '@/components/common/DarkModeSwitch'
import LinkChakra from '@/components/common/link-chakra'

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
              <Stack direction="column" spacing={6} mb={6}>
              <Button colorScheme="green"><LinkChakra href="/">TOP</LinkChakra></Button>
                <Button colorScheme="purple"><LinkChakra href="/animes">アニメ一覧</LinkChakra></Button>
                <Button colorScheme="twitter"><LinkChakra isExternal href="https://sasigu.me">@sasigume</LinkChakra></Button>
              </Stack>

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