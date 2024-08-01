import {useQuery} from "@tanstack/react-query";
import client from "../service/AxiosConfig.ts";
import {Employee} from "./EmployeeTable.tsx";

interface Project {
    id: number;
    name: string;
    description: string;
    employee: Employee;
}

const Home = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['fetchProjects'],
        queryFn: async () => client.get("/api/projects/allProjects").then(res => res.data),
        select: data => data.filter((d: Project) => d.employee.id === d.employee.id)
    })
    if (isLoading) return <p className={'text-3xl'}>Loading...</p>
    console.log(data)
    return (
        <div className={'p-4'}>
            <p className={'text-4xl'}>Student Management System</p>
            <pre>
                {JSON.stringify(data)}
            </pre>
        </div>
    );
};

export default Home;