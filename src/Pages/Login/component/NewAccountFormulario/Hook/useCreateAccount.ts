import { useState } from 'react'
import { INITIAL_STATE_USER, INITIAL_STATE_USER_ERROR } from '../../../model/loginDTO'
import { validateFrmNewUser } from '../../../model/loginDTO'
import { APiMethod, RequestModel, ResponseDTO, requestAPI } from '../../../../../Provider';


export type propsNewAccount = {
  handleNewUser: (data: ResponseDTO, correo: string) => void,
  homeBack: () => void

}


export const useCreateAccount = (props: propsNewAccount) => {
  const [formState, setFormState] = useState(INITIAL_STATE_USER);
  const [errorState, seterrorState] = useState(INITIAL_STATE_USER_ERROR);
  const [loading, setLoading] = useState(false);

  const onChangeFrm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name == 'documento' && formState.TipoPersona == 'J') {
      let _digito = generateDigitVerification(value);
      setFormState({
        ...formState,
        codigoVerificacion: _digito != '' ? parseInt(_digito.toString()) : 0
      });
    }
    setFormState(prevState => {
      return { ...prevState, [name]: value }
    });
  }
  const handleCheckedTP = (value: string) => {

    let _tipo = 'NIT'
    if (value == 'N') {
      _tipo = 'CC'
    }
    setFormState({
      ...formState,
      TipoPersona: value,
      tipoDocumento: _tipo
    });
  }
  const handleChangeTipoDoc = (name: string, value: string | number) => {
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const hadleSubmit = () => {
    const _datosValidados = validarCampos();
    seterrorState(_datosValidados);
    if (_datosValidados.Apellidos.hasError || _datosValidados.Nombres.hasError || _datosValidados.documento.hasError
      || _datosValidados.correo.hasError || _datosValidados.ConfirmaCorreo.hasError) {
      return;
    }
    console.log(formState)
    seterrorState(INITIAL_STATE_USER_ERROR)
    crearUsuario();
  }
  const crearUsuario = async () => {
    setLoading(true);
    let objCrearUsuario = {
      documento: formState.documento,
      correo: formState.correo,
      Nombres: formState.Nombres,
      Apellidos: formState.Apellidos,
      TipoPersona: formState.TipoPersona,
      IsVinculoConstructora: formState.IsVinculoConstructora,
      tipoDocumento: formState.tipoDocumento,
      codigoVerificacion: formState.codigoVerificacion
    }
    const request: RequestModel = {
      metodo: `login/register`,
      type: APiMethod.POST,
      data: objCrearUsuario
    }
    const data = await requestAPI<ResponseDTO>(request) ?? { codigo: 1, mensaje: '', success: false };
    if (data.success) {
      setFormState(INITIAL_STATE_USER);
    }
    props.handleNewUser(data, objCrearUsuario.correo);

    setLoading(false);
  }

  const validarCampos = (): validateFrmNewUser => {
    const emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
    const hasError = !emailRegexp.test(formState.correo);
    let dataValidate = INITIAL_STATE_USER_ERROR;
    const status = { ...dataValidate };


    if (formState.documento == "")
      status.documento = { hasError: true, msn: 'Este campo es obligatorio' };

    if (formState.Nombres == "")
      status.Nombres = { hasError: true, msn: 'Este campo es obligatorio' };

    if (formState.Apellidos == "" && formState.TipoPersona == 'N')
      status.Apellidos = { hasError: true, msn: 'Este campo es obligatorio' };

    if (formState.correo == "") {
      status.correo = { hasError: true, msn: 'Este campo es obligatorio' };
      status.ConfirmaCorreo = { hasError: true, msn: 'Este campo es obligatorio' };
    }
    if (hasError)
      status.correo = { hasError: true, msn: 'Este campo es obligatorio' };

    if (formState.confirmaCorreo != formState.correo)
      status.ConfirmaCorreo = { hasError: true, msn: 'Este campo es obligatorio' };


    return status;
  }

  const generateDigitVerification = (_nit: string) => {
    var vpri,
      x,
      y,
      z;

    // Se limpia el Nit
    _nit = _nit.replace(/\s/g, ""); // Espacios
    _nit = _nit.replace(/,/g, ""); // Comas
    _nit = _nit.replace(/\./g, ""); // Puntos
    _nit = _nit.replace(/-/g, ""); // Guiones

    // Se valida el nit
    if (isNaN(parseInt(_nit))) {
      console.log("El nit/cédula '" + _nit + "' no es válido(a).");
      return "";
    };

    // Procedimiento
    vpri = new Array(16);
    z = _nit.length;

    vpri[1] = 3;
    vpri[2] = 7;
    vpri[3] = 13;
    vpri[4] = 17;
    vpri[5] = 19;
    vpri[6] = 23;
    vpri[7] = 29;
    vpri[8] = 37;
    vpri[9] = 41;
    vpri[10] = 43;
    vpri[11] = 47;
    vpri[12] = 53;
    vpri[13] = 59;
    vpri[14] = 67;
    vpri[15] = 71;

    x = 0;
    y = 0;
    for (var i = 0; i < z; i++) {
      y = parseInt((_nit.substr(i, 1)));
      // console.log ( y + "x" + vpri[z-i] + ":" ) ;

      x += (y * (vpri[z - i]));
      // console.log ( x ) ;    
    }
    y = x % 11;
    // console.log ( y ) ;

    return (y > 1) ? 11 - y : y;
  }
  return { errorState, formState, hadleSubmit, loading, onChangeFrm, handleCheckedTP, handleChangeTipoDoc }
}


