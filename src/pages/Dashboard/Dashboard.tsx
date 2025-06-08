import {
    Box,
    Flex,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
    Spinner,
    Select,
    Container,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    Divider,
    useColorModeValue
} from "@chakra-ui/react";
import { CalendarIcon, SearchIcon, AtSignIcon } from "@chakra-ui/icons";
import { FaRocket, FaTasks, FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAssignedTasks, updateTask } from "../../services/jiraApi";
import { TaskCard } from "../../components/TaskCard";

interface Task {
    id: string;
    key: string;
    fields: {
        summary: string;
        project: {
            name: string;
            priority: number;
        };
        status: {
            name: string;
        };
        priority: {
            name: string;
            id: string;
        };
        sprint: {
            name: string;
        };
        assignee: {
            name: string;
        };
        date: {
            start: string;
            end: string;
        };
    };
}

type GroupedTasks = Record<string, Task[]>;

type SortType = "default" | "projects" | "task";



const getPriorityValue = (priority: string): number => {
    switch (priority.toLowerCase()) {
        case "critical":
            return 4;
        case "high":
            return 3;
        case "medium":
            return 2;
        case "low":
            return 1;
        default:
            return 0;
    }
};

const Dashboard = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [fromDate, setFromDate] = useState<string>("");
    const [toDate, setToDate] = useState<string>("");
    const [assigneeSearch, setAssigneeSearch] = useState<string>("");
    const [prioritySort, setPrioritySort] = useState<SortType>("default");

    const bgColor = useColorModeValue("gray.50", "gray.800");
    const cardBg = useColorModeValue("white", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const inputBg = useColorModeValue("white", "gray.700");
    const inputHoverBorder = useColorModeValue("blue.400", "blue.300");
    const inputPlaceholderColor = useColorModeValue("gray.400", "gray.400");

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await getAssignedTasks();
            setTasks(res.issues);
            setLoading(false);
        };
        fetchTasks();
    }, []);

    const handleTaskUpdate = async (taskId: string, updates: {
        summary?: string;
        status?: string;
        priority?: { name: string; id: string };
        assignee?: { name: string };
        date?: { start: string; end: string };
    }) => {
        try {
            const updatedTask = await updateTask(taskId, updates);
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? updatedTask : task
                )
            );
            return updatedTask;
        } catch (error) {
            console.error('Failed to update task:', error);
            throw error;
        }
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        switch (prioritySort) {
            case "projects":
                return a.fields.project.name.localeCompare(b.fields.project.name);
            case "task":
                return getPriorityValue(b.fields.priority.name) - getPriorityValue(a.fields.priority.name);
            default:
                return 0;
        }
    });

    const grouped: GroupedTasks = sortedTasks.reduce((acc, task) => {
        const projectName = task.fields.project.name;
        if (!acc[projectName]) acc[projectName] = [];
        acc[projectName].push(task);
        return acc;
    }, {} as GroupedTasks);

    const filteredTasks = (projectTasks: Task[]) => {
        return projectTasks.filter((task) => {
            if (statusFilter !== "All" && task.fields.status.name !== statusFilter) {
                return false;
            }

            if (fromDate && task.fields.date?.start < fromDate) {
                return false;
            }
            if (toDate && task.fields.date?.end > toDate) {
                return false;
            }

            if (assigneeSearch && !task.fields.assignee?.name.toLowerCase().includes(assigneeSearch.toLowerCase())) {
                return false;
            }

            return true;
        });
    };

    return (
        <Box bg={bgColor} minH="100vh">
            <Container maxW="container.2xl" py={4}>
                <Card mb={4} bg={cardBg} boxShadow="sm" size="sm">
                    <CardHeader py={3}>
                        <Flex justify="space-between" align="center">
                            <Flex align="center" gap={2}>
                                <Icon as={FaRocket} color="blue.500" w={5} h={5} />
                                <Box>
                                    <Heading size="md">Project Dashboard</Heading>
                                    <Text color="gray.500" fontSize="xs">
                                        Manage and track your project tasks
                                    </Text>
                                </Box>
                            </Flex>

                        </Flex>
                    </CardHeader>
                </Card>

                <Card mb={4} bg={cardBg} boxShadow="sm" size="sm">
                    <CardBody py={3}>
                        <Flex align="center" mb={3}>
                            <Icon as={FaFilter} color="blue.500" mr={2} w={3} h={3} />
                            <Heading size="xs">Filters & Sort</Heading>
                        </Flex>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={3}>
                            <InputGroup size="sm">
                                <InputLeftElement pointerEvents="none">
                                    <SearchIcon color={inputPlaceholderColor} />
                                </InputLeftElement>
                                <Input
                                    placeholder="Search projects"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    bg={inputBg}
                                    _hover={{ borderColor: inputHoverBorder }}
                                    _placeholder={{ color: inputPlaceholderColor }}
                                />
                            </InputGroup>

                            <Select
                                size="sm"
                                value={prioritySort}
                                onChange={(e) => setPrioritySort(e.target.value as SortType)}
                                bg={inputBg}
                                _hover={{ borderColor: inputHoverBorder }}
                            >
                                <option value="default">Default Order</option>
                                <option value="projects">Sort by Projects</option>
                                <option value="task">Sort by Task Priority</option>
                            </Select>

                            <Select
                                size="sm"
                                placeholder="Filter by status"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                bg={inputBg}
                                _hover={{ borderColor: inputHoverBorder }}
                            >
                                <option value="All">All Statuses</option>
                                <option value="To Do">To Do</option>
                                <option value="In Review">In Review</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </Select>

                            <InputGroup size="sm">
                                <InputLeftElement pointerEvents="none">
                                    <CalendarIcon color={inputPlaceholderColor} />
                                </InputLeftElement>
                                <Input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    placeholder="From Date"
                                    bg={inputBg}
                                    _hover={{ borderColor: inputHoverBorder }}
                                    color="inherit"
                                />
                            </InputGroup>

                            <InputGroup size="sm">
                                <InputLeftElement pointerEvents="none">
                                    <CalendarIcon color={inputPlaceholderColor} />
                                </InputLeftElement>
                                <Input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    placeholder="To Date"
                                    bg={inputBg}
                                    _hover={{ borderColor: inputHoverBorder }}
                                    color="inherit"
                                />
                            </InputGroup>

                            <InputGroup size="sm">
                                <InputLeftElement pointerEvents="none">
                                    <AtSignIcon color={inputPlaceholderColor} />
                                </InputLeftElement>
                                <Input
                                    placeholder="Search assignee"
                                    value={assigneeSearch}
                                    onChange={(e) => setAssigneeSearch(e.target.value)}
                                    bg={inputBg}
                                    _hover={{ borderColor: inputHoverBorder }}
                                    _placeholder={{ color: inputPlaceholderColor }}
                                />
                            </InputGroup>
                        </SimpleGrid>
                    </CardBody>
                </Card>

                {loading ? (
                    <Flex justify="center" py={6}>
                        <Spinner size="md" color="blue.500" thickness="3px" />
                    </Flex>
                ) : (
                    <Stack spacing={4}>
                        {Object.entries(grouped)
                            .filter(([projectName]) =>
                                projectName.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map(([projectName, projectTasks]) => {
                                const tasksAfterFilters = filteredTasks(projectTasks);

                                if (tasksAfterFilters.length === 0) return null;

                                return (
                                    <Card key={projectName} bg={cardBg} boxShadow="sm" size="sm">
                                        <CardHeader py={2} px={4}>
                                            <Flex align="center" justify="space-between">
                                                <Flex align="center" gap={2}>
                                                    <Icon as={FaTasks} color="blue.500" w={3} h={3} />
                                                    <Heading size="sm">{projectName}</Heading>
                                                </Flex>
                                                <Text color="gray.500" fontSize="xs">
                                                    {tasksAfterFilters.length} tasks
                                                </Text>
                                            </Flex>
                                        </CardHeader>
                                        <Divider borderColor={borderColor} />
                                        <CardBody py={2} px={4}>
                                            <Stack spacing={2}>
                                                {tasksAfterFilters.map((task) => (
                                                    <TaskCard
                                                        key={task.id}
                                                        task={task}
                                                        onUpdate={handleTaskUpdate}
                                                    />
                                                ))}
                                            </Stack>
                                        </CardBody>
                                    </Card>
                                );
                            })}
                    </Stack>
                )}
            </Container>
        </Box>
    );
};

export default Dashboard;
