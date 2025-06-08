import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorMode,
    useColorModeValue,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, SearchIcon } from "@chakra-ui/icons";
import type { FC } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar: FC = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { user, logout } = useAuth();

    return (
        <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} shadow="sm">
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <HStack spacing={8} alignItems="center">
                    <Box fontWeight="bold">🏠 Home</Box>
                    <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
                        <Button variant="ghost">For You</Button>
                        <Button variant="ghost">Projects</Button>
                        <Button variant="ghost">Goals</Button>
                        <Button variant="ghost">Teams</Button>
                        <Button variant="ghost">Give Feedback</Button>
                    </HStack>
                </HStack>

                <InputGroup w={{ base: "0", md: "250px" }} display={{ base: "none", md: "block" }}>
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon color="gray.400" />
                    </InputLeftElement>
                    <Input type="search" placeholder="Search" borderRadius="md" />
                </InputGroup>

                <Flex alignItems="center">
                    <IconButton
                        size="md"
                        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                        aria-label="Toggle theme"
                        onClick={toggleColorMode}
                        variant="ghost"
                        mr={2}
                    />
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded="full"
                            variant="solid"
                            colorScheme="orange"
                            p={0}
                            minW={0}
                        >
                            <Avatar
                                name={user?.name || "User"}
                                size="sm"
                                bg="orange.400"
                            />
                        </MenuButton>
                        <MenuList>
                            <Box px={4} py={2}>
                                <Text fontWeight="bold">{user?.name || "User"}</Text>
                                <Text fontSize="sm" color="gray.500">
                                    {user?.email || "user@gmail.com"}
                                </Text>
                            </Box>
                            <MenuDivider />
                            <MenuItem>Account Settings</MenuItem>
                            <MenuItem>Theme</MenuItem>
                            <MenuItem>Switch Account</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={logout}>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;
