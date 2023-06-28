import { UserSessionModel } from "../../../Auth/model/AuthModel";

export interface LoginDTO {
    usuario: string;
    clave: string;
}

export interface RegistrationResponse {
    message: string;
    success: boolean;
    token: string;
    usuario: UserSessionModel;
}

export interface UserRegistrationDto {
    documento: string;
    correo: string;
    Nombres: string;
    Apellidos: string;
    TipoPersona: string;
    IsVinculoConstructora: boolean;
    tipoDocumento: string;
    codigoVerificacion: number | null;
    confirmaCorreo :string;

}

export interface CambioClaveDTO {
    PassOld: string;
    PassNew: string;
    PassNewR: string;
}
export type inputFormulario = {
    hasError: boolean, msn: string
  }
  
export type validateFrmNewUser = {
    Apellidos: inputFormulario
    codigoVerificacion: inputFormulario,
    correo: inputFormulario,
    documento: inputFormulario,
    IsVinculoConstructora: inputFormulario,
    Nombres: inputFormulario,
    tipoDocumento: inputFormulario,
    TipoPersona: inputFormulario,    
    ConfirmaCorreo:inputFormulario
  }
export const INITIAL_STATE_USER :UserRegistrationDto = { 
    Apellidos:'',
    codigoVerificacion:null,
    correo:'',
    documento:'',
    IsVinculoConstructora:false,
    Nombres:'',
    tipoDocumento:'CC',
    TipoPersona:'N',
    confirmaCorreo :'',
}

export const INITIAL_STATE_USER_ERROR :validateFrmNewUser = { 
    tipoDocumento: { hasError: false, msn: '' },
    correo: { hasError: false, msn: '' },
    documento: { hasError: false, msn: '' },
    codigoVerificacion: { hasError: false, msn: '' },
    Nombres: { hasError: false, msn: '' },
    Apellidos: { hasError: false, msn: '' },
    TipoPersona: { hasError: false, msn: '' },
    IsVinculoConstructora:{ hasError: false, msn: '' },
    ConfirmaCorreo:{ hasError: false, msn: '' }

}