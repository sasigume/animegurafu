import { useColorMode, Switch, Box, Stack } from '@chakra-ui/react'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Stack
      position="fixed"
      direction="row"
      top="1rem"
      right="1rem"
      alignItems="center"
      spacing={3}
      >
      <Box>{isDark ? "Light" : "Dark"}</Box>
      <Switch
        color="green"
        isChecked={isDark}
        onChange={toggleColorMode}
      />
    </Stack>
  )
}
