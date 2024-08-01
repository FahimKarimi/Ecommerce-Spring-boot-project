import client from "../service/AxiosConfig.ts";

export const DeleteEmployee = (id: number) => {
    return client.delete(`/api/employees/${id}`).then(res => res.data)
}