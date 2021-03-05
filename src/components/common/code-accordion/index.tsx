import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Code } from "@chakra-ui/react"

interface Props {
  data: any
}
const CodeAccordion = (props: Props) => {
  return (
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              JSONを確認する
        </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>

        <AccordionPanel pb={4}>
          <Code>
            {JSON.stringify(props.data)}
          </Code>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default CodeAccordion