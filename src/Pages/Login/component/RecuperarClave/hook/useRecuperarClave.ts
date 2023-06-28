
import { useState, useEffect } from 'react';
import { APiMethod, ResponseDTO, useFetch } from '../../../../../Provider';


type validacionFormulario = {
    email: inputFormulario

}


type inputFormulario = {
    hasError: boolean, msn: string
}
export const useRecuperarClave = (  handleRecuperar: (correo:string) => void) => {


    const [showAlert, stateAlert] = useState(false);
    const { hasError, data, isLoading, doFetch } = useFetch<ResponseDTO | null>();
    const [stateCorreo, setStateCorreo] = useState("");
    const [errorState, errorStateState] = useState<validacionFormulario>(
        {
            email: { hasError: false, msn: '' },

        }

    );

    const validarcorreo = (): validacionFormulario => {
        let result: validacionFormulario = {
            email: { hasError: false, msn: '' }

        };

        if (stateCorreo == "")
            return {
                email: { hasError: true, msn: 'Correo obligatorio' },
            }

        const emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
        const hasError = !emailRegexp.test(stateCorreo);


        if (hasError)
            return {
                email: { hasError: true, msn: 'Correo ingresado invalido' },
            }


        return result;
    }

    const handleRecordarClave = (e: React.SyntheticEvent) => {

        e.preventDefault();

        const _validacion = validarcorreo();

        if (_validacion.email.hasError) {
            errorStateState(_validacion);
            return;
        }


        doFetch({
            metodo: 'Account/recordarclave',
            type: APiMethod.POST,
            data: {
                usuario: stateCorreo
            }
        });
    }

    useEffect(() => {

        if (data != null) {

            handleRecuperar(stateCorreo);
        }
    }, [data])


    const onInputChange = (e: React.SyntheticEvent) => {
        const { value } = (e.target as HTMLInputElement);
        setStateCorreo(value);
    }

    return { isLoading, handleRecordarClave, stateCorreo, onInputChange, ...errorState, showAlert, stateAlert }
}