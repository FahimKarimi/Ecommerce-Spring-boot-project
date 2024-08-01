import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import {BsImageAlt, BsPlus} from "react-icons/bs";
import {BiSolidUser} from "react-icons/bi";
import {FcAddImage} from "react-icons/fc";
import {FieldValues, useForm} from 'react-hook-form'
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {LiaCriticalRole} from "react-icons/lia";
import {AiOutlineTeam} from "react-icons/ai";
import {GrStatusCriticalSmall} from "react-icons/gr";
import {MdEmail} from "react-icons/md";
import axios from "axios";
import toast from 'react-hot-toast';

const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.string().min(3),
    team: z.string(),
    age: z.number().min(2),
    avatar: z.string().url(),
    status: z.string()
})

export type FormValuesType = z.infer<typeof schema>

const AddNewEmployee = () => {
    const {register, reset, handleSubmit} = useForm<FormValuesType>({resolver: zodResolver(schema)});
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const onSubmit = async (values: FieldValues) => {
        axios.post("http://localhost:8080/api/employees/add", values).then(r => {
            toast.success(r.data);
        });
        console.log(values)
        reset();
    }
    return (
        <>
            <Button onPress={onOpen} className={'bg-default-100'}
                    endContent={<BsPlus/>}
                    size="sm"
            >
                Add New
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add New Employee</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit(onSubmit)} className={'space-y-3'}>
                                    <Input {...register('email')} startContent={<MdEmail/>} type="email"
                                           placeholder="Email"/>
                                    <Input {...register('name')} startContent={<BiSolidUser/>} placeholder="Name"
                                           type="text"/>
                                    <Input {...register('role')} startContent={<LiaCriticalRole/>} placeholder="Role"
                                           type="text"/>
                                    <Input {...register('team')} startContent={<AiOutlineTeam/>} placeholder="Team"
                                           type="text"/>

                                    <Input {...register('age', {valueAsNumber: true})} startContent={<BsImageAlt/>}
                                           placeholder="Age"
                                           type="number"/>

                                    <Input {...register('avatar')} startContent={<FcAddImage/>} placeholder="Avatar"
                                           type="url"/>

                                    <Input {...register('status')} startContent={<GrStatusCriticalSmall/>}
                                           placeholder="Status"
                                           type="text"/>
                                    <ModalFooter>
                                        <Button type={'button'} color="danger" variant="flat" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button type={'submit'} color="primary" onPress={onClose}>
                                            Add
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddNewEmployee;