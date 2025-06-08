import { Select, Text } from '@chakra-ui/react';

interface TaskFilterProps {
    value: string;
    onChange: (value: string) => void;
}

export const TaskFilter = ({ value, onChange }: TaskFilterProps) => {
    return (
        <>
            <Text fontSize="sm" mb={2}>Filter by status:</Text>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="all">All Statuses</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Done">Done</option>
            </Select>
        </>
    );
};