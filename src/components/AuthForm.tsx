import { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    FormErrorMessage
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const AuthForm = ({ onCredentialsSubmit, onJiraSubmit, isLoading }: {
    onCredentialsSubmit: (email: string, password: string) => void,
    onJiraSubmit: (email: string, token: string) => void,
    isLoading: boolean
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [jiraToken, setJiraToken] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        jiraToken: ''
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return 'Email is required';
        }
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    const validatePassword = (password: string) => {
        if (!password) {
            return 'Password is required';
        }
        if (password.length < 6) {
            return 'Password must be at least 6 characters';
        }
        return '';
    };

    const validateJiraToken = (token: string) => {
        if (!token) {
            return 'Jira token is required';
        }
        if (token.length < 8) {
            return 'Jira token seems too short';
        }
        return '';
    };

    const handleCredentialsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        setErrors({
            ...errors,
            email: emailError,
            password: passwordError
        });

        if (emailError || passwordError) {
            return;
        }

        onCredentialsSubmit(email, password);
    };

    const handleJiraSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailError = validateEmail(email);
        const tokenError = validateJiraToken(jiraToken);

        setErrors({
            ...errors,
            email: emailError,
            jiraToken: tokenError
        });

        if (emailError || tokenError) {
            return;
        }

        onJiraSubmit(email, jiraToken);
    };

    return (
        <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8} maxW="md" w="full">
            <Tabs isFitted variant="enclosed" index={activeTab} onChange={(index) => {
                setActiveTab(index);
                setErrors({ email: '', password: '', jiraToken: '' });
            }}>
                <TabList mb="1em">
                    <Tab>Email Login</Tab>
                    <Tab>Jira PAT</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <form onSubmit={handleCredentialsSubmit}>
                            <Stack spacing={4}>
                                <FormControl isInvalid={!!errors.email}>
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setErrors({ ...errors, email: '' });
                                        }}
                                        placeholder="Enter your email"
                                    />
                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.password}>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                setErrors({ ...errors, password: '' });
                                            }}
                                            placeholder="Enter your password"
                                        />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                </FormControl>
                                <Stack spacing={10}>
                                    <Button
                                        type="submit"
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                        isLoading={isLoading}
                                    >
                                        Sign in
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                    </TabPanel>
                    <TabPanel>
                        <form onSubmit={handleJiraSubmit}>
                            <Stack spacing={4}>
                                <FormControl isInvalid={!!errors.email}>
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setErrors({ ...errors, email: '' });
                                        }}
                                        placeholder="Enter your email"
                                    />
                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.jiraToken}>
                                    <FormLabel>Jira Personal Access Token</FormLabel>
                                    <Input
                                        type="password"
                                        value={jiraToken}
                                        onChange={(e) => {
                                            setJiraToken(e.target.value);
                                            setErrors({ ...errors, jiraToken: '' });
                                        }}
                                        placeholder="Enter your Jira PAT"
                                    />
                                    <FormErrorMessage>{errors.jiraToken}</FormErrorMessage>
                                </FormControl>
                                <Stack spacing={10}>
                                    <Button
                                        type="submit"
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                        isLoading={isLoading}
                                    >
                                        Authenticate with Jira
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default AuthForm;