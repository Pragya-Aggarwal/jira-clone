import { Flex, Heading, Link, Stack, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { loginWithCredentials, loginWithJiraToken } from '../../services/Auth';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleCredentialsSubmit = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const { token: authToken } = await loginWithCredentials(email, password) as { token: string };
            await login(authToken);
            toast({
                title: 'Login Successful',
                description: 'Welcome back!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Login failed:', error);
            toast({
                title: 'Login Failed',
                description: 'Please check your email and password and try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleJiraSubmit = async (email: string, token: string) => {
        setIsLoading(true);
        try {
            const { token: authToken } = await loginWithJiraToken(email, token) as { token: string };
            await login(authToken);
            toast({
                title: 'Login Successful',
                description: 'Successfully authenticated with Jira!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Jira authentication failed:', error);
            toast({
                title: 'Authentication Failed',
                description: 'Please check your email and Jira Personal Access Token.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack gap={8} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Sign in to your account</Heading>
                    <AuthForm
                        onCredentialsSubmit={handleCredentialsSubmit}
                        onJiraSubmit={handleJiraSubmit}
                        isLoading={isLoading}
                    />
                    <Text textAlign={'center'}>
                        Don't have an account?{' '}
                        <Link as={RouterLink} to="/signup" color={'blue.400'}>
                            Sign up
                        </Link>
                    </Text>
                </Stack>
            </Flex>
        </Stack>
    );
};

export default Login;