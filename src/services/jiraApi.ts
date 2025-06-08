const API_DELAY = 800;

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

const DummyApiCall = <T,>(data: T): Promise<T> =>
    new Promise((resolve) => setTimeout(() => resolve(data), API_DELAY));

const mockTaskDeatils: Task[] = [
    {
        "id": "10001",
        "key": "PROJ-101",
        "fields": {
            "summary": "Implement login screen",
            "project": {
                "name": "Website Redesign",
                "priority": 1
            },
            "status": {
                "name": "In Progress"
            },
            "priority": {
                "name": "High",
                "id": "1"
            },
            "sprint": {
                "name": "Sprint 5"
            },
            "assignee": {
                "name": "John Doe"
            },
            "date": {
                "start": "2023-06-01",
                "end": "2023-06-15"
            }
        }
    }
];

export const getAssignedTasks = async (domain: string, token: string): Promise<{ issues: Task[] }> => {
    return DummyApiCall({
        issues: [

            {
                "id": "10001",
                "key": "PROJ-101",
                "fields": {
                    "summary": "Implement login screen",
                    "project": {
                        "name": "Website Redesign",
                        "priority": 1
                    },
                    "status": {
                        "name": "In Progress"
                    },
                    "priority": {
                        "name": "High",
                        "id": "1"
                    },
                    "sprint": {
                        "name": "Sprint 5"
                    },
                    "assignee": {
                        "name": "John Doe"
                    },
                    "date": {
                        "start": "2023-06-01",
                        "end": "2023-06-15"
                    }
                }
            },
            {
                "id": "10002",
                "key": "MOB-42",
                "fields": {
                    "summary": "Fix mobile navigation bug",
                    "project": {
                        "name": "Mobile App",
                        "priority": 2
                    },
                    "status": {
                        "name": "To Do"
                    },
                    "priority": {
                        "name": "Critical",
                        "id": "0"
                    },
                    "sprint": {
                        "name": "Sprint 5"
                    },
                    "assignee": {
                        "name": "Sarah Smith"
                    },
                    "date": {
                        "start": "2023-06-05",
                        "end": "2023-06-10"
                    }
                }
            },
            {
                "id": "10003",
                "key": "API-15",
                "fields": {
                    "summary": "Optimize database queries",
                    "project": {
                        "name": "Backend Services",
                        "priority": 3
                    },
                    "status": {
                        "name": "In Review"
                    },
                    "priority": {
                        "name": "Medium",
                        "id": "2"
                    },
                    "sprint": {
                        "name": "Sprint 4"
                    },
                    "assignee": {
                        "name": "Michael Chen"
                    },
                    "date": {
                        "start": "2023-05-20",
                        "end": "2023-05-30"
                    }
                }
            },
            {
                "id": "10004",
                "key": "DOC-27",
                "fields": {
                    "summary": "Update API documentation",
                    "project": {
                        "name": "Developer Portal",
                        "priority": 4
                    },
                    "status": {
                        "name": "Done"
                    },
                    "priority": {
                        "name": "Low",
                        "id": "3"
                    },
                    "sprint": {
                        "name": "Sprint 3"
                    },
                    "assignee": {
                        "name": "Emily Johnson"
                    },
                    "date": {
                        "start": "2023-05-10",
                        "end": "2023-05-15"
                    }
                }
            },
            {
                "id": "10005",
                "key": "UI-89",
                "fields": {
                    "summary": "Redesign dashboard layout",
                    "project": {
                        "name": "Admin Console",
                        "priority": 2
                    },
                    "status": {
                        "name": "In Progress"
                    },
                    "priority": {
                        "name": "High",
                        "id": "1"
                    },
                    "sprint": {
                        "name": "Sprint 5"
                    },
                    "assignee": {
                        "name": "David Wilson"
                    },
                    "date": {
                        "start": "2023-06-01",
                        "end": "2023-06-20"
                    }
                }
            },
            {
                "id": "10006",
                "key": "SEC-33",
                "fields": {
                    "summary": "Implement 2FA for admin users",
                    "project": {
                        "name": "Security",
                        "priority": 1
                    },
                    "status": {
                        "name": "To Do"
                    },
                    "priority": {
                        "name": "Critical",
                        "id": "0"
                    },
                    "sprint": {
                        "name": "Sprint 6"
                    },
                    "assignee": {
                        "name": "Alex Rodriguez"
                    },
                    "date": {
                        "start": "2023-06-20",
                        "end": "2023-06-30"
                    }
                }
            },
            {
                "id": "10007",
                "key": "PERF-12",
                "fields": {
                    "summary": "Improve page load times",
                    "project": {
                        "name": "Performance",
                        "priority": 3
                    },
                    "status": {
                        "name": "In Progress"
                    },
                    "priority": {
                        "name": "High",
                        "id": "1"
                    },
                    "sprint": {
                        "name": "Sprint 5"
                    },
                    "assignee": {
                        "name": "Jessica Lee"
                    },
                    "date": {
                        "start": "2023-06-05",
                        "end": "2023-06-25"
                    }
                }
            },
            {
                "id": "10008",
                "key": "INT-56",
                "fields": {
                    "summary": "Setup CI/CD pipeline",
                    "project": {
                        "name": "DevOps",
                        "priority": 2
                    },
                    "status": {
                        "name": "Done"
                    },
                    "priority": {
                        "name": "Medium",
                        "id": "2"
                    },
                    "sprint": {
                        "name": "Sprint 4"
                    },
                    "assignee": {
                        "name": "Robert Taylor"
                    },
                    "date": {
                        "start": "2023-05-15",
                        "end": "2023-05-30"
                    }
                }
            },
            {
                "id": "10009",
                "key": "TEST-78",
                "fields": {
                    "summary": "Write unit tests for auth module",
                    "project": {
                        "name": "Testing",
                        "priority": 4
                    },
                    "status": {
                        "name": "In Review"
                    },
                    "priority": {
                        "name": "Low",
                        "id": "3"
                    },
                    "sprint": {
                        "name": "Sprint 5"
                    },
                    "assignee": {
                        "name": "Jennifer Brown"
                    },
                    "date": {
                        "start": "2023-06-10",
                        "end": "2023-06-15"
                    }
                }
            },
            {
                "id": "10010",
                "key": "FEAT-91",
                "fields": {
                    "summary": "Add dark mode toggle",
                    "project": {
                        "name": "Frontend",
                        "priority": 3
                    },
                    "status": {
                        "name": "To Do"
                    },
                    "priority": {
                        "name": "Medium",
                        "id": "2"
                    },
                    "sprint": {
                        "name": "Sprint 6"
                    },
                    "assignee": {
                        "name": "Daniel Kim"
                    },
                    "date": {
                        "start": "2023-06-25",
                        "end": "2023-07-05"
                    }
                }
            }
        ]
    });
};

export const updateTask = async (
    domain: string,
    token: string,
    taskId: string,
    updates: {
        summary?: string;
        status?: string;
        priority?: { name: string; id: string };
        assignee?: { name: string };
        date?: { start: string; end: string };
    }
): Promise<Task> => {
    const existingTask = mockTaskDeatils.find((t: Task) => t.id === taskId) || mockTaskDeatils[0];
    return DummyApiCall({
        id: taskId,
        key: taskId,
        fields: {
            ...existingTask.fields,
            ...updates,
            summary: updates.summary || existingTask.fields.summary,
            status: typeof updates.status === 'string'
                ? { name: updates.status }
                : existingTask.fields.status,
            project: existingTask.fields.project,
            priority: updates.priority || existingTask.fields.priority,
            assignee: updates.assignee || existingTask.fields.assignee,
            date: updates.date || existingTask.fields.date
        }
    });
};