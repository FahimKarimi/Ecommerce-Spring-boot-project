import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@nextui-org/react";
import toast from "react-hot-toast";
import client from "../service/AxiosConfig.ts";
import {BsImageAlt} from "react-icons/bs";
import {MdEmail} from "react-icons/md";
import {BiSolidEditAlt, BiSolidUser} from "react-icons/bi";
import {LiaCriticalRole} from "react-icons/lia";
import {AiOutlineTeam} from "react-icons/ai";
import {FcAddImage} from "react-icons/fc";
import {GrStatusCriticalSmall} from "react-icons/gr";
import {z} from "zod";
import {useQuery} from "@tanstack/react-query";

const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    role: z.string().min(3),
    team: z.string().min(3),
    age: z.number().min(2),
    avatar: z.string().url(),
    status: z.string().min(3)
})

type FormValuesType = z.infer<typeof schema>

const fetchStudent = async (id: number) => {
    return await client.get(`/api/employees/${id}`).then(res => res.data)
}

const EditEmployee = ({id}: { id: number }) => {
    const {data, isLoading} = useQuery({queryKey: ['fetchStudent', id], queryFn: () => fetchStudent(id)})

    const {register, reset, handleSubmit, formState: {errors}} = useForm<FormValuesType>({
        resolver: zodResolver(schema)
    });
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const onSubmit = async (values: FieldValues) => {
        client.put(`/api/employees/${id}`, values).then(r => {
            toast.success("Employee updated");
            console.log(r)
        });
        reset();
    }

    if (isLoading) return <p className={'mx-auto p-36'}>Loading...</p>
    return (
        <div>
            <Button onPress={onOpen} className={'bg-transparent text-primary'}><BiSolidEditAlt/></Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col">Update Employee</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit(onSubmit)} className={'space-y-3'}>
                                    <Input errorMessage={errors?.email?.message}
                                           defaultValue={data?.email} {...register('email')} startContent={<MdEmail/>}
                                           type="email"
                                           placeholder="Email"/>
                                    <Input defaultValue={data?.name} {...register('name')} startContent={<BiSolidUser/>}
                                           placeholder="Name"
                                           type="text"/>
                                    <Input defaultValue={data?.role} {...register('role')}
                                           startContent={<LiaCriticalRole/>} placeholder="Role"
                                           type="text"/>
                                    <Input defaultValue={data?.team} {...register('team')}
                                           startContent={<AiOutlineTeam/>} placeholder="Team"
                                           type="text"/>

                                    <Input defaultValue={data?.age} {...register('age', {valueAsNumber: true})}
                                           startContent={<BsImageAlt/>}
                                           placeholder="Age"
                                           type="number"/>

                                    <Input defaultValue={data?.avatar} {...register('avatar')}
                                           startContent={<FcAddImage/>} placeholder="Avatar"
                                           type="url"/>

                                    <Input defaultValue={data?.status} {...register('status')}
                                           startContent={<GrStatusCriticalSmall/>}
                                           placeholder="Status"
                                           type="text"/>
                                    <Divider />

                                    <Button type={'button'} color="danger" className={'space-x-1'} variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button type={'submit'} color="primary" onPress={onClose}>
                                        Update
                                    </Button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default EditEmployee;