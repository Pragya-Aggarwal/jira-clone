import { useState } from 'react';
import {
    Badge,
    Box,
    Card,
    CardBody, Flex, Input,
    Select,
    Stack,
    Text,
    useToast, Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    VStack,
    HStack,
    Avatar
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';

const priorityColors: Record<string, string> = {
    'Critical': 'red',
    'High': 'orange',
    'Medium': 'yellow',
    'Low': 'green'
};

const priorityOptions = [
    { name: 'Critical', id: '0' },
    { name: 'High', id: '1' },
    { name: 'Medium', id: '2' },
    { name: 'Low', id: '3' }
];

const statusOptions = ['To Do', 'In Progress', 'In Review', 'Done'];

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
        sprint?: {
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

interface TaskCardProps {
    task: Task;
    onUpdate: (taskId: string, updates: {
        summary?: string;
        status?: string;
        priority?: { name: string; id: string };
        assignee?: { name: string };
        date?: { start: string; end: string };
    }) => Promise<Task>;
}

type EditingField = 'summary' | 'status' | 'priority' | 'dates' | null;

export const TaskCard = ({ task, onUpdate }: TaskCardProps) => {
    const [editing, setEditing] = useState<EditingField>(null);
    const [summary, setSummary] = useState(task.fields.summary);
    const [status, setStatus] = useState(task.fields.status.name);
    const [priority, setPriority] = useState(task.fields.priority);
    const [startDate, setStartDate] = useState(task.fields.date?.start || '');
    const [endDate, setEndDate] = useState(task.fields.date?.end || '');
    const [isUpdating, setIsUpdating] = useState(false);
    const toast = useToast();

    const handleUpdate = async () => {
        try {
            setIsUpdating(true);
            const updates: Parameters<typeof onUpdate>[1] = {};

            switch (editing) {
                case 'summary':
                    if (summary !== task.fields.summary) {
                        updates.summary = summary;
                    }
                    break;
                case 'status':
                    if (status !== task.fields.status.name) {
                        updates.status = status;
                    }
                    break;
                case 'priority':
                    if (priority.name !== task.fields.priority.name) {
                        updates.priority = priority;
                    }
                    break;
                case 'dates':
                    if (startDate !== task.fields.date?.start || endDate !== task.fields.date?.end) {
                        updates.date = { start: startDate, end: endDate };
                    }
                    break;
            }

            if (Object.keys(updates).length > 0) {
                const updatedTask = await onUpdate(task.id, updates);
                toast({
                    title: 'Task updated',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: 'Update failed',
                description: 'Failed to update task',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        } finally {
            setIsUpdating(false);
            setEditing(null);
        }
    };

    return (
        <Card variant="outline" size="sm" py={0}>
            <CardBody p={2}>
                <Stack spacing={2}>
                    <Flex justify="space-between" align="center" gap={2}>
                        <Flex align="center" gap={2} flex={1}>
                            <Text fontSize="xs" color="gray.500" fontWeight="medium">
                                {task.key}
                            </Text>
                            {editing === 'summary' ? (
                                <Input
                                    size="xs"
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    onBlur={handleUpdate}
                                    onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
                                    autoFocus
                                    disabled={isUpdating}
                                />
                            ) : (
                                <Text
                                    fontSize="sm"
                                    onClick={() => setEditing('summary')}
                                    cursor="pointer"
                                    flex={1}
                                    noOfLines={2}
                                >
                                    {task.fields.summary}
                                </Text>
                            )}
                        </Flex>
                        <Popover>
                            <PopoverTrigger>
                                <Badge
                                    size="sm"
                                    colorScheme={priorityColors[task.fields.priority.name] || 'gray'}
                                    cursor="pointer"
                                    fontSize="xs"
                                >
                                    {task.fields.priority.name}
                                </Badge>
                            </PopoverTrigger>
                            <PopoverContent width="120px">
                                <PopoverBody p={1}>
                                    <VStack align="stretch" spacing={1}>
                                        {priorityOptions.map(option => (
                                            <Box
                                                key={option.id}
                                                p={1}
                                                cursor="pointer"
                                                _hover={{ bg: 'gray.100' }}
                                                onClick={() => {
                                                    setPriority(option);
                                                    setEditing('priority');
                                                    handleUpdate();
                                                }}
                                            >
                                                <Badge
                                                    size="sm"
                                                    colorScheme={priorityColors[option.name]}
                                                    fontSize="xs"
                                                >
                                                    {option.name}
                                                </Badge>
                                            </Box>
                                        ))}
                                    </VStack>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={2}>
                        <HStack spacing={2}>
                            {editing === 'status' ? (
                                <Select
                                    size="xs"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    onBlur={handleUpdate}
                                    autoFocus
                                    disabled={isUpdating}
                                    width="110px"
                                >
                                    {statusOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </Select>
                            ) : (
                                <Badge
                                    colorScheme={status === 'Done' ? 'green' : 'blue'}
                                    onClick={() => setEditing('status')}
                                    cursor="pointer"
                                    fontSize="xs"
                                >
                                    {status}
                                </Badge>
                            )}
                            <Avatar
                                size="xs"
                                name={task.fields.assignee?.name}
                            />
                            <Text fontSize="xs" color="gray.500">
                                {task.fields.assignee?.name}
                            </Text>
                        </HStack>
                        {editing === 'dates' ? (
                            <HStack spacing={1}>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    onBlur={handleUpdate}
                                    size="xs"
                                    width="110px"
                                />
                                <Text fontSize="xs">-</Text>
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    onBlur={handleUpdate}
                                    size="xs"
                                    width="110px"
                                />
                            </HStack>
                        ) : (
                            <Text
                                fontSize="xs"
                                color="gray.500"
                                onClick={() => setEditing('dates')}
                                cursor="pointer"
                                display="flex"
                                alignItems="center"
                                gap={1}
                            >
                                <CalendarIcon boxSize={3} />
                                {task.fields.date?.start} - {task.fields.date?.end}
                            </Text>
                        )}
                    </Flex>
                </Stack>
            </CardBody>
        </Card>
    );
};