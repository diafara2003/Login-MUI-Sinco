import { Typography, TextField, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRecuperarClave } from '../hook/useRecuperarClave';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

type props = {
    homeBack: () => void,
    handleRecuperar: (correo:string) => void
}

export const RecuperarClavepages = ({ homeBack, handleRecuperar }: props) => {

    const { isLoading, handleRecordarClave, onInputChange, stateCorreo, email, showAlert, stateAlert } = useRecuperarClave(handleRecuperar);
    return (

        <>

            <div id='DivTitulo' style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '1.5rem', alignSelf: 'stretch'
            }}>
                <Typography variant='h4'>Recupera el acceso a tu cuenta</Typography>
                <Typography variant='h6'>¿Olvidaste tu contraseña? Ingresa tu correo electrónico
                    y te enviaremos las instrucciones para restablecerla</Typography>
            </div>
            <div id='DivCampos' style={{ display: 'flex', width: '25rem', flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem' }}>
                <TextField
                    error={email.hasError}
                    helperText={email.msn}
                    required
                    fullWidth
                    id="email"
                    onChange={onInputChange}
                    value={stateCorreo}
                    label="Correo electrónico"
                    name="email"
                    autoComplete="email"
                />
            </div>
            <div id='DivAcciones' style={{ display: 'flex', width: '25rem', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <LoadingButton
                    size="medium"
                    type="submit"
                    fullWidth
                    loading={isLoading}
                    onClick={handleRecordarClave}
                    loadingPosition="start"
                    variant="contained"
                    startIcon={<EmailOutlinedIcon />}
                >
                    Restablecer contraseña
                </LoadingButton>

                <div style={{ display: "flex", alignItems: 'center', }}>
                    <Typography color={'rgba(16, 24, 64, 0.87);'}
                        fontSize={'1rem'}
                        sx={{ cursor: 'pointer' }}>¿Deseas regresar?
                    </Typography>

                    <Typography variant="h6"
                        ml={1}
                        color={'#008BB0'}
                        fontSize={'1rem'}
                        sx={{ cursor: 'pointer' }}
                        onClick={() => homeBack()}>
                        Ir al login
                    </Typography>
                </div>

            </div>

            {showAlert ?
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={true}
                    autoHideDuration={4000}
                    onClose={() => { stateAlert(false) }}
                    message="Se envió un correo con las instrucciones para recordar la contraseña"
                    key={"bottom" + "right"}
                /> : null
            }
        </>

    )
}


export default RecuperarClavepages;