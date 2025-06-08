import { Stack, Flex, Heading, Text } from "@chakra-ui/react"


const NotFound = () => {
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack gap={8} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>404 - Page Not Found</Heading>
                    <Text>The page you are looking for does not exist.</Text>
                </Stack>
            </Flex>
        </Stack>
    )
}

export default NotFound