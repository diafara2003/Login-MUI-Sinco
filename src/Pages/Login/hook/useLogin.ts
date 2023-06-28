import { useEffect, useState } from 'react';
import { ResponseDTO } from '../../../Provider';



type tipoForm = "newUser" | "forgetPassword" | "signin" | "verificarAccount" | "verificarPassword";

export const useLogin = () => {

    const [progress, setProgress] = useState(1000);
    const [correo, setCorreo] = useState('');
    const [open, setOpen] = useState(false);
    const [msnError, setmsnError] = useState({ msn: "", title: "" });
    const [form, setForm] = useState<tipoForm>("signin");

    const handleClose = () => {

        setOpen(false);
    };


    const handleNewUser = (data: ResponseDTO, correo: string) => {
        if (data.success) {
            setCorreo(correo);
            setForm("verificarAccount");
        }
        else monstrarMsnError(data.mensaje, "¡Creacion cuenta!");

    }


    const monstrarMsnError = (msn: string, title: string) => {
        setmsnError({ msn, title });
        setOpen(true);
    }

    return { handleClose, msnError, open, setmsnError, progress, form, setForm, handleNewUser, monstrarMsnError, correo ,setCorreo}
}
