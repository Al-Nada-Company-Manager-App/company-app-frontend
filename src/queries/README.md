# React Query Setup Documentation

## Overview

This folder contains all React Query related code for the company app. React Query is used for server state management, providing caching, synchronization, and error handling for API calls.

## Structure

```
src/queries/
├── queryClient.ts          # Query client configuration
├── index.ts               # Main exports
└── Employees/             # Employee-related queries
    ├── index.ts          # Employee exports
    ├── employeeApi.ts    # API functions
    └── employeeQueries.ts # React Query hooks
```

## Configuration

The QueryClient is configured in `queryClient.ts` with the following defaults:

- Stale time: 5 minutes
- Retry: 1 attempt
- No refetch on window focus

## Employee Operations

### Available Hooks

- `useGetAllEmployees()` - Fetch all employees
- `useGetEmployeeById(id)` - Fetch single employee
- `useCreateEmployee()` - Create new employee
- `useUpdateEmployee()` - Update existing employee
- `useDeleteEmployee()` - Delete employee
- `useActivateEmployee()` - Activate employee
- `useDeactivateEmployee()` - Deactivate employee

### Usage Examples

#### Fetching Employees

```tsx
import { useGetAllEmployees } from "../queries/Employees";

const { data: employees, isLoading, isError, error } = useGetAllEmployees();
```

#### Creating an Employee

```tsx
import { useCreateEmployee } from "../queries/Employees";

const createMutation = useCreateEmployee();

const handleCreate = async (employeeData) => {
  try {
    await createMutation.mutateAsync(employeeData);
    // Success handling
  } catch (error) {
    // Error handling
  }
};
```

#### Updating an Employee

```tsx
import { useUpdateEmployee } from "../queries/Employees";

const updateMutation = useUpdateEmployee();

const handleUpdate = async (employeeId, data) => {
  try {
    await updateMutation.mutateAsync({ id: employeeId, data });
    // Success handling
  } catch (error) {
    // Error handling
  }
};
```

## API Configuration

The API base URL is currently set to `http://localhost:3000/api` in `employeeApi.ts`.
You should move this to an environment variable:

```typescript
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3000/api";
```

## Dev Tools

React Query DevTools are enabled in development mode. You can access them by clicking the React Query icon in the bottom corner of your app.

## Error Handling

All mutations include basic error handling with console logging. You can extend this with:

- Toast notifications (using Ant Design message component)
- Custom error boundaries
- Retry logic
- Optimistic updates

## Query Keys

Query keys are organized hierarchically:

```typescript
employees: ['employees']
├── lists: ['employees', 'list']
├── details: ['employees', 'detail']
└── detail(id): ['employees', 'detail', id]
```

This allows for precise cache invalidation and updates.
