import { useState, useEffect, useContext } from 'react';
import { useFetch, APiMethod } from '../../../../../Provider';
import { RegistrationResponse } from '../../../model/loginDTO';

type loginForm = {
    email: string;
    password: string
}

type inputFormulario = {
    hasError: boolean, msn: string
}

type validacionFormulario = {
    email: inputFormulario
    password: inputFormulario
}

export const useForm = (initialForm: loginForm = { email: '', password: '' },
    handleError: (msn: string) => void
) => {

    const [formState, setFormState] = useState(initialForm);
    const [errorMessage, setError] = useState("");
    const { hasError, data, isLoading, doFetch } = useFetch<RegistrationResponse | null>();
    const [errorState, errorStateState] = useState(
        {
            email: { hasError: false, msn: '' },
            password: { hasError: false, msn: '' }
        }
    );
    useEffect(() => {

        if (data != undefined && !data.success) { handleError("Por favor, verifica tu correo electrónico y contraseña e intenta nuevamente."); }

        if (hasError == '' && data != null && data.hasOwnProperty("token")) {

            if (data.token == '' || data.token == null) {

                setError(data.message);
                return;
            }

            if (data.usuario.nombreUsuario == null || data.usuario.nombreUsuario == "")
                data.usuario.nombreUsuario = data.usuario.nombreEmpresa;

       
        }

    }, [data])


    useEffect(() => {

        if (hasError == "not found") {
            handleError("Por favor, verifica tu correo electrónico y contraseña e intenta nuevamente.");
            return;
        }

    }, [hasError])


    const signIn = async () => {

        doFetch({
            metodo: 'Login',
            AllowAnonymous: true,
            type: APiMethod.POST,
            data: { usuario: formState.email, clave: formState.password }

        });

    }

    const onInputChange = (e: React.SyntheticEvent) => {
        const { name, value } = (e.target as HTMLInputElement);
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const _validacion = validarCampos();


        if (_validacion.email.hasError || _validacion.password.hasError) {
            errorStateState(_validacion);
            return;
        }

        signIn();

    };

    const validarCampos = (): validacionFormulario => {
        const emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

        const hasError = !emailRegexp.test(formState.email);


        if (formState.email == "")
            return {
                email: { hasError: true, msn: 'Correo obligatorio' },
                password: { hasError: false, msn: '' }
            }

        if (hasError)
            return {
                email: { hasError: true, msn: 'Correo invalido' },
                password: { hasError: false, msn: '' }
            }
        if (formState.password == "")
            return {
                email: { hasError: false, msn: '' },
                password: { hasError: true, msn: 'Contraseña obligatoria' }
            }

        return {
            email: { hasError: false, msn: '' },
            password: { hasError: false, msn: '' }
        }
    }

    return {
        ...formState,
        errorState,
        onInputChange,
        onResetForm,
        handleSubmit,
        isLoading,
        errorMessage


    }
}
