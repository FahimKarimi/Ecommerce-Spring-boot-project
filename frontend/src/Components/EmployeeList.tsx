import EmployeeTable from "./EmployeeTable.tsx";
import {useQuery} from "@tanstack/react-query";
import client from "../service/AxiosConfig.ts";


const fetchEmployees = async () => {
    return client.get("/api/employees/getAllEmployees").then(res => res.data);
}

const EmployeeList = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['fetchStudents'],
        queryFn: fetchEmployees,
        refetchInterval: 2000
    });

    if (isLoading) return <p className={'text-3xl'}>Loading...</p>
    return (
        <div className={'p-4'}>
            <EmployeeTable data={data}/>
        </div>
    );
};

export default EmployeeList;