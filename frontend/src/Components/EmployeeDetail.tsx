import {useParams} from 'react-router-dom'
import {useQuery} from "@tanstack/react-query";
import client from "../service/AxiosConfig.ts";
import {Card, CardBody, CardFooter, CardHeader, Divider, Image, Link} from "@nextui-org/react";

const fetchEmployee = async (id: number) => {
    return await client.get(`/api/employees/${id}`).then(res => res.data)
}

// const fetchProjects = async (emp_id: number) => {
//     return await client.get(`/api/projects/employee/${emp_id}`).then(res => res.data)
// }

const EmployeeDetail = () => {
    const params = useParams();
    const {id} = params;
    const ID = parseInt(typeof id === 'string' ? id : '');
    const {data: employee, isLoading} = useQuery({queryKey: ['fetchEmployee', id], queryFn: () => fetchEmployee(ID)})

    if (isLoading) return <p className={'text-3xl'}>Loading...</p>
    return (
        <Card className="max-w-[36rem] mx-auto mt-12">
            <CardHeader className="flex gap-3">
                <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src={employee.avatar}
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md">{employee.name}</p>
                    <p className="text-small text-default-500">{employee.email}</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p>Description: Frontend developer and UI/UX enthusiast. Join me on this coding adventure!</p>
                <p>Role: {employee.role}</p>
                <p>Team: {employee.team}</p>
                <p>Status: {employee.status}</p>
            </CardBody>
            <Divider/>
            <CardFooter>
                <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/nextui-org/nextui"
                >
                    Visit my projects on GitHub.
                </Link>
            </CardFooter>
        </Card>
    );
};

export default EmployeeDetail;